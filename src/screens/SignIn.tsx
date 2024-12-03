import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
  Link,
} from "native-base";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useAuth } from "@hooks/useAuth";
import * as yup from "yup";
import BackgroundImg from "@assets/background.jpg";

import { AppError } from "@utils/AppError";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from "react";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
} from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableOpacity } from "react-native";

type FormData = {
  email: string;
  password: string;
  isTeacher?: boolean;
};

const loginSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  isTeacher: yup.boolean(),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toas = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({
    email,
    password,
    isTeacher = false,
  }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password, isTeacher);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

      toas.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        position="absolute"
        w="full"
      />
      <VStack justifyContent="space-between" flex={1} px={10} pb={16}>
        <Center my={24}>
          <Text color="gray.100" fontSize="sm">
            Conhecimento ao alcance de todos
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acessar painel
          </Heading>

          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe o e-mail" }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Informe a senha" }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="isTeacher"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                value="isTeacher"
                onChange={(value) => onChange(value)}
                isChecked={value}
                mt={20}
                mb={40}
              >
                <CheckboxIndicator>
                  <CheckboxIcon color="white" as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel color="$gray100" marginLeft={10}>
                  Entrar como professor(a)
                </CheckboxLabel>
              </Checkbox>
            )}
          />

          <Button
            content="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <TouchableOpacity onPress={handleNewAccount}>
            <Text
              shadow={"3"}
              color="gray.100"
              fontSize="sm"
              mb={3}
              fontFamily="body"
            >
              Ainda não tem acesso? Criar uma conta
            </Text>
          </TouchableOpacity>
        </Center>
      </VStack>
    </ScrollView>
  );
}
