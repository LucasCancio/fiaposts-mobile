import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, Heading, HStack, Text, useToast, VStack } from "native-base";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { PostDTO } from "@dtos/PostDTO";

import { HomeHeader } from "@components/HomeHeader";
import { PostCard } from "@components/PostCard";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Loading } from "@components/Loading";
import { ActivityIndicator } from "react-native";

const PER_PAGE = 6;

export function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenPostDetails(postId: number) {
    navigation.navigate("post", { postId });
  }

  const [page, setPage] = useState(1);

  async function fetchPosts() {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await api.get(`/posts/search`, {
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
        : "Não foi possível carregar os exercícios";

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
    fetchPosts();
  }, []);

  return (
    <VStack flex={1}>
      <HomeHeader />

      <VStack bg="red" flex={1} px={4} pt={6}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Posts
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {posts.length} de {totalPosts}
          </Text>
        </HStack>

        <FlatList
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
          data={posts}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <PostCard
              onPress={() => handleOpenPostDetails(item.id)}
              post={item}
            />
          )}
          onEndReached={fetchPosts}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : null
          }
        />
      </VStack>
    </VStack>
  );
}
