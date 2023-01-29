import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export const Input = ({ errorMessage = null, isInvalid, ...rest }: Props) => {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        minH={14}
        px={4}
        borderWidth={0}
        borderRadius={8}
        fontSize="md"
        color="gray.200"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          bgColor: "gray.700",
          borderWidth: 1,
          borderColor: "blue.default",
        }}
        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
