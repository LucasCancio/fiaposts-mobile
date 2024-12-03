import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useRoute } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { PostDTO } from "@dtos/PostDTO";

import Markdown from "react-native-markdown-display";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "@components/ScreenHeader";
import { stylesMarkdown } from "@components/PostCard";
import CategoryList from "@components/CategoryList";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type RouteParamsProps = {
  postId: string;
};

export function Post() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<PostDTO>({} as PostDTO);

  const route = useRoute();
  const toast = useToast();

  const params = route.params as RouteParamsProps;
  const postId = Number(params.postId);

  async function fetchDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/posts/${postId}`);
      const post = response.data as PostDTO;
      setPost(post);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do post";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, [postId]);

  return (
    <VStack flex={1}>
      <ScreenHeader title={post.title} />
      <Box rounded="lg" overflow="hidden">
        <Image
          w="full"
          h={80}
          source={{
            uri: post.imageUrl,
          }}
          alt="Imagem do post"
          resizeMode="cover"
        />
      </Box>

      <VStack px={8} bg="gray.600" flex={1}>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{ height: "100%" }}
          >
            <VStack mb={2}>
              <Text color="gray.200">Categorias:</Text>
              <CategoryList categories={post.categories} />
            </VStack>
            <Markdown style={stylesMarkdown}>{post.content ?? ""}</Markdown>
            {post.updatedAt && (
              <Text color="gray.200" mt={10} mb={3}>
                Ultima atualização{" "}
                {formatDistanceToNow(post.updatedAt, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </Text>
            )}
          </ScrollView>
        </SafeAreaView>
      </VStack>
    </VStack>
  );
}
