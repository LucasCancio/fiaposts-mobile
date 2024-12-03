import { PostDTO } from "@dtos/PostDTO";
import { AdministrationMenuProps } from "@screens/Administration";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { PostRow } from "@components/PostRow";

type Props = AdministrationMenuProps;

const PER_PAGE = 5;

export default function MyPostsMenu({ onFetching }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([] as PostDTO[]);
  const [totalPosts, setTotalPosts] = useState(0);

  const toast = useToast();

  const [page, setPage] = useState(1);

  async function fetchPosts() {
    try {
      onFetching?.(true);
      setIsLoading(true);
      const response = await api.get("/posts/my-posts", {
        params: {
          page,
          perPage: PER_PAGE,
        },
      });
      setPosts([...posts, ...response.data.posts]);
      setTotalPosts(response.data.meta.totalCount);
      setPage((page) => page + 1);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os dados";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      onFetching?.(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <VStack space={2} px={2}>
      <HStack justifyContent="space-between" mb={5}>
        <Heading color="gray.200" fontSize="md" fontFamily="heading">
          Posts
        </Heading>
        <Text color="gray.200" fontSize="sm">
          {posts?.length} de {totalPosts}
        </Text>
      </HStack>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => <PostRow key={item.id} post={item} />}
        contentContainerStyle={{ gap: 6 }}
        onEndReached={fetchPosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </VStack>
  );
}
