import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ChevronLeft } from "lucide-react-native";
import { ChevronLeftIcon, Heading, HStack, Icon } from "native-base";
import { TouchableOpacity } from "react-native";

type Props = {
  title: string;
};

export function ScreenHeader({ title }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack px={2} alignItems="center" bg="gray.600" pb={6} pt={16}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon as={ChevronLeft} name="arrow-left" color="gray.100" size={12} />
      </TouchableOpacity>
      <Heading
        flexGrow="1"
        textAlign="center"
        color="gray.100"
        fontSize="xl"
        fontFamily="heading"
      >
        {title}
      </Heading>
    </HStack>
  );
}
