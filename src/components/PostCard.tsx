import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";

import { Entypo } from "@expo/vector-icons";

import { PostDTO } from "@dtos/PostDTO";

type Props = TouchableOpacityProps & {
  post: PostDTO;
};

export const stylesMarkdown = StyleSheet.create({
  body: {
    color: "#FFFFFF",
  },
  heading1: {
    fontSize: 32,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
});

export function PostCard({ post, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: post.imageUrl,
          }}
          alt="Imagem do post"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading
            fontSize="lg"
            color="gray.100"
            fontFamily="heading"
            numberOfLines={1}
          >
            {post.title}
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {post.content}
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
