import { Box, Icon } from "native-base";
import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = {
  icon: any;
  iconName: string;
} & IButtonProps;

export function IconButton({ icon, iconName, color, ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg={color}
      borderWidth={2}
      borderRadius="lg"
      p={2}
      color="gray.100"
      borderColor={color}
      _pressed={{
        bg: "gray.300",
      }}
      {...rest}
    >
      <Icon as={icon} name={iconName} color="gray.100" />
    </ButtonNativeBase>
  );
}
