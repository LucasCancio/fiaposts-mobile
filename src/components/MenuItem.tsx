import { HStack, Icon, Text } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  icon: any;
  active: boolean;
};

export default function MenuItem({ title, onPress, icon, active }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        w={40}
        borderRadius={4}
        borderWidth={2}
        borderColor={active ? "green.500" : "gray.400"}
        bg="gray.400"
        p={4}
        alignItems="center"
      >
        <Icon
          as={icon}
          name="library"
          color={active ? "green.500" : "gray.100"}
          size={10}
          mr={4}
        />
        <Text
          fontWeight={active ? 700 : 400}
          color={active ? "green.500" : "gray.100"}
        >
          {title}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
}
