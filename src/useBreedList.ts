// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { useGetBreedsQuery } from "./petApiService";
import { Animal } from "./APIResponsesTypes";

// const localCache = {};

export default function useBreedList(animal: Animal) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    skip: !animal // don't call the api if you don't have animal
  });

  if(!animal) {
    return [[], 'loaded'];
  }
  return [breeds ?? [], isLoading ? "loading": "loaded"] as [
    string[],
    string
  ];
}
