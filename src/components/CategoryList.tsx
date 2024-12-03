import { Box, HStack, Icon, Text, VStack } from "native-base";
import { Button } from "./Button";
import { Trash } from "lucide-react-native";

type Props = {
  categories: {
    id?: number | undefined;
    name?: string | undefined;
    color?: string | undefined;
  }[];
  handleRemovePressed?: (index: number) => void;
};

export default function CategoryList({
  categories,
  handleRemovePressed,
}: Props) {
  return (
    <VStack>
      {categories?.map((category, index) => (
        <HStack key={category.id} alignItems="center" space={2} ml={4} mt={2}>
          <Box bg={category.color} borderRadius="full" width={4} height={4} />
          <Box>
            <Text color="gray.100" fontSize="sm">
              {category.name}
            </Text>
          </Box>
          {handleRemovePressed && (
            <Button
              variant="outline"
              borderWidth={0}
              h={10}
              width={10}
              content={<Icon as={Trash} name="trash" color="red.400" />}
              onPress={() => handleRemovePressed(index)}
            />
          )}
        </HStack>
      ))}
    </VStack>
  );
}
