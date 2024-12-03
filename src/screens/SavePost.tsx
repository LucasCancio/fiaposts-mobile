import { useEffect, useState } from "react";
import {
  Box,
  Center,
  FormControl,
  HStack,
  Icon,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { PostDTO } from "@dtos/PostDTO";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ScreenHeader } from "@components/ScreenHeader";
import { Plus, Trash } from "lucide-react-native";
import { CategoryDTO } from "@dtos/CategoryDTO";
import { IOptionSelect, Select } from "@components/Select";
import PostContentModal from "@components/Modals/PostContentModal";
import CategoryList from "@components/CategoryList";

const signUpSchema = yup.object({
  title: yup
    .string()
    .required("Informe o nome.")
    .min(5, "O titulo deve conter no mínimo 5 caracteres."),
  imageUrl: yup
    .string()
    .required("Informe a imagem.")
    .url("A url da imagem deve ser válida."),
  content: yup
    .string()
    .required("Informe o conteúdo.")
    .min(20, "O conteúdo deve conter no mínimo 20 caracteres."),
  categories: yup
    .array(
      yup.object({
        id: yup.number(),
        name: yup.string(),
        color: yup.string(),
      })
    )
    .required("É preciso informar pelo menos 1 categoria.")
    .min(1, "É preciso informar pelo menos 1 categoria.")
    .max(3, "Só é permitido até no máximo 3 categorias."),
});

type FormDataProps = yup.InferType<typeof signUpSchema>;

type RouteParamsProps = {
  postId?: string;
};

export function SavePost() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<PostDTO>({} as PostDTO);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | null>(
    null
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormDataProps>({
    values: {
      title: post.title,
      imageUrl: post.imageUrl,
      content: post.content,
      categories: post.categories,
    },
    resolver: yupResolver(signUpSchema),
  });

  const content = watch("content");

  const {
    fields: categoriesField,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "categories",
  });

  const categoryAlreadyAdded =
    categoriesField.find(
      (category) => category.name === selectedCategory?.name
    ) != null;

  const route = useRoute();
  const toast = useToast();

  const params = route.params as RouteParamsProps;
  const postId = params?.postId;

  const isEditting = !!postId;

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

  async function fetchCategories() {
    try {
      setIsLoading(true);
      const response = await api.get("/categories");
      const categories = response.data as CategoryDTO[];
      setCategories(categories);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar as categorias";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave({
    title,
    imageUrl,
    content,
    categories,
  }: FormDataProps) {
    try {
      setIsLoading(true);

      const body = {
        title,
        imageUrl,
        content,
        slug: title.replace(/\s+/g, "-").toLowerCase(),
        categoriesIds: categories?.map((category) => category.id),
      };

      console.log({ body, isEditting });

      if (isEditting) await api.patch(`/posts/${postId}`, body);
      else await api.post("/posts", body);

      toast.show({
        title: "Post salvo com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      navigation.navigate("home", { refresh: true });
      reset();
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível salvar o post";

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
    fetchCategories();
    if (postId != null) fetchDetails();
  }, [postId]);

  useEffect(() => {
    return () => {
      reset();
      navigation.setParams({ postId: undefined });
    };
  }, []);

  const [showPostContentModal, setShowPostContentModal] = useState(false);

  return (
    <VStack flex={1}>
      <PostContentModal
        postContent={content}
        showModal={showPostContentModal}
        setShowModal={setShowPostContentModal}
      />
      <ScreenHeader
        title={isEditting ? "Atualizando o Post" : "Criando um Post"}
      />

      <ScrollView>
        <VStack p={6} flexGrow={1}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Imagem (url)"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.imageUrl?.message}
              />
            )}
          />

          <FormControl isInvalid={!!errors?.categories?.message} mb={4}>
            <Center flexDirection="row" w="full">
              <Select
                options={categories?.map((x) => {
                  return {
                    label: x.name,
                    value: x.id.toString(),
                  } as IOptionSelect;
                })}
                onValueChange={(categoryId) => {
                  const category = categories?.find(
                    (category) => category.id === Number(categoryId)
                  );
                  if (category) setSelectedCategory(category);
                }}
              />
              <Button
                ml={4}
                w={20}
                variant="outline"
                content={<Icon as={Plus} name="plus" color="green.500" />}
                onPress={() => {
                  if (selectedCategory) appendCategory(selectedCategory);
                }}
                disabled={categoryAlreadyAdded}
              />
            </Center>

            <CategoryList
              categories={categoriesField}
              handleRemovePressed={removeCategory}
            />

            <FormControl.ErrorMessage _text={{ color: "red.500" }}>
              {errors?.categories?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value } }) => (
              <Input
                variant="filled"
                h={40}
                textAlignVertical="top"
                multiline
                numberOfLines={10}
                placeholder="Conteúdo"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.content?.message}
              />
            )}
          />
          <Button
            mt="auto"
            disabled={!content}
            content="Prévia do conteúdo"
            variant="outline"
            onPress={() => setShowPostContentModal(true)}
          />

          <Button
            mt={4}
            content="Salvar"
            onPress={handleSubmit(handleSave)}
            isLoading={isLoading}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
