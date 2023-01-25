import { Center, Spinner } from "native-base";

export const Loading = () => {
  return (
    <Center flex={1} bg="gray.600">
      <Spinner color="blue.default" />
    </Center>
  );
};
