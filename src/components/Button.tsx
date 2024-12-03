import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";
import { ReactNode } from "react";

type Props = Omit<IButtonProps, "variant"> & {
  content: string | ReactNode;
  variant?: "solid" | "outline";
};

const styles = {
  solid: {
    disabled: "gray.500",
    enabled: "green.700",
  },
  outline: {
    disabled: "gray.500",
    enabled: "transparent",
  },
};

export function Button({
  content,
  variant = "solid",
  isDisabled,
  ...rest
}: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      bg={isDisabled ? styles[variant].disabled : styles[variant].enabled}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      isDisabled={isDisabled}
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "green.500",
      }}
      {...rest}
    >
      {typeof content === "string" ? (
        <Text
          color={variant === "outline" ? "green.500" : "gray.100"}
          fontFamily="heading"
          fontSize="sm"
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </ButtonNativeBase>
  );
}
