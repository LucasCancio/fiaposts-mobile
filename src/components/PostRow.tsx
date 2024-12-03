import { PostDTO } from "@dtos/PostDTO";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Heading, HStack, Text, useToast, VStack } from "native-base";
import { useState } from "react";
import { IconButton } from "./IconButton";
import DeleteWarningModal from "./Modals/DeleteWarningModal";
import { Pencil, Trash } from "lucide-react-native";

type Props = {
  post: PostDTO;
};

export function PostRow({ post }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();
  const [showDeleteWarningModal, setShowDeleteWarningModal] = useState(false);

  async function handleDeletePost(postId: number) {
    try {
      await api.delete(`/posts/${postId}`);
      setShowDeleteWarningModal(false);
      navigation.navigate("home");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar o post";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  function handleUpdatePost(post: PostDTO) {
    navigation.navigate("savePost", { postId: post.id });
  }

  return (
    <HStack
      bg="gray.400"
      py={6}
      px={4}
      key={post.id}
      justifyContent="space-between"
    >
      <VStack flexGrow={1} maxWidth={40}>
        <Heading color="gray.100" fontSize="xl" numberOfLines={1}>
          {post.title}
        </Heading>
        <Text color="gray.200" fontSize="sm">
          {formatDistanceToNow(post.updatedAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </Text>
      </VStack>
      <HStack space={4}>
        <IconButton
          icon={Pencil}
          iconName="pencil"
          color="blue.500"
          onPress={() => handleUpdatePost(post)}
        />
        <IconButton
          icon={Trash}
          iconName="trash"
          color="danger.500"
          onPress={() => setShowDeleteWarningModal(true)}
        />
        <DeleteWarningModal
          setShowModal={setShowDeleteWarningModal}
          showModal={showDeleteWarningModal}
          onYesPressed={() => handleDeletePost(post.id)}
          onNoPressed={() => setShowDeleteWarningModal(false)}
        />
      </HStack>
    </HStack>
  );
}
