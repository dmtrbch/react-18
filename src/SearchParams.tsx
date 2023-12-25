import {
  useState,
  useDeferredValue,
  useMemo,
  useTransition,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { all } from "./searchParamsSlice";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { useSearchQuery } from "./petApiService"
import Results from "./Results";
import useBreedList from "./useBreedList";
import { Animal } from "./APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];
// uncontrolled form, we are no longer tracking breed and location
const SearchParams = () => {
  const [animal, setAnimal] = useState("" as Animal);

  const [breeds] = useBreedList(animal);

  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  const adoptedPet = useSelector((state:any) => state.adoptedPet.value);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  const searchParams = useSelector((state: any) => state.searchParams.value);

  const [isPending, startTranstition] = useTransition();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let { data: pets } = useSearchQuery(searchParams);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  pets = pets ?? [];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          // prevents the form from literly submitting
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: formData.get("animal")?.toString() as Animal ?? "" as Animal,
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          startTranstition(() => {
            // whatever comes here low priority, can be interrupted
            dispatch(all(obj));
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal)
            }}
            id="animal"
            value={animal}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breeds.length === 0}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">🍮</h2>
          </div>
        ) : (
          <button>Submit</button>
        )}
      </form>
      {renderedPets}
    </div>
  );
};

export default SearchParams;
