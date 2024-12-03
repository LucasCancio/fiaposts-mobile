import { Heading, HStack, Icon, VStack } from "native-base";

type Props = {
  id: number;
  title: string;
  children?: React.ReactNode;
};

export function Row({ id, title, children }: Props) {
  return (
    <HStack bg="gray.400" py={6} px={4} key={id} justifyContent="space-between">
      <VStack flexGrow={1}>
        <Heading
          color="gray.100"
          numberOfLines={1}
          fontSize="lg"
          textTransform="capitalize"
        >
          {title}
        </Heading>
        {children}
      </VStack>
    </HStack>
  );
}
