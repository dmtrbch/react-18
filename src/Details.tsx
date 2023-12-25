import { useState, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { useGetPetQuery } from "./petApiService";
import { adopt } from "./adoptedPetSlice";
import ErrorBoundary from "./ErrorBoundary";
import Carousel from "./Carousel";
// import Modal from "./Modal";

// We don't need to load modal when Details page is loaded, instead load it when it is requested
// this is not needed, Modal is very lightweight, it is good practice to code split 10s of killobytes
const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const { id } = useParams();

  if(!id) {
    throw new Error('why did you not give me an id?!!! I wanted an id. I have no id.');
  }
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); 
  // id you don't have details/id in you cache, run fetchPet
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { isLoading, data: pet } = useGetPetQuery(id);

  const dispatch = useDispatch()

  // isLoading is for the first load. isFetching is for refetching
  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐚 </h2>
      </div>
    );
  }
  if (!pet) {
    throw new Error("no pet lol");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      dispatch(adopt(pet));
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
