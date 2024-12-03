import { useEffect, useState } from "react";
import {
  Center,
  Heading,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { ScreenHeader } from "@components/ScreenHeader";
import { GraduationCap, Library, Presentation } from "lucide-react-native";
import MenuItem from "@components/MenuItem";
import { Loading } from "@components/Loading";
import MyPostsMenu from "@components/AdministrationMenu/MyPostsMenu";
import TeachersMenu from "@components/AdministrationMenu/TeachersMenu";
import StudentsMenu from "@components/AdministrationMenu/StudentsMenu";

export type AdministrationMenuProps = {
  onFetching?: (finished: boolean) => void;
};

export function Administration() {
  const [isLoading, setIsLoading] = useState(false);
  const [typeLoaded, setTypeLoaded] = useState<
    "my-posts" | "teachers" | "students"
  >("my-posts");

  useEffect(() => {});

  return (
    <VStack flex={1}>
      <ScreenHeader title="Administração" />
      <Center p={6}>
        <Heading color="gray.100" textAlign="center" fontSize={16}>
          Escolha entre as visualizações abaixo:
        </Heading>
      </Center>
      <View>
        <ScrollView horizontal px={4} py={2} mb={2}>
          <HStack space={4}>
            <MenuItem
              active={typeLoaded === "my-posts"}
              onPress={() => setTypeLoaded("my-posts")}
              icon={Library}
              title="Meus Posts"
            />
            <MenuItem
              active={typeLoaded === "teachers"}
              onPress={() => setTypeLoaded("teachers")}
              icon={Presentation}
              title="Professores"
            />
            <MenuItem
              active={typeLoaded === "students"}
              onPress={() => setTypeLoaded("students")}
              icon={GraduationCap}
              title="Alunos"
            />
            <View w={10} />
          </HStack>
        </ScrollView>
      </View>
      <View mt={10} flexGrow={1}>
        {isLoading && <Loading />}
        {!isLoading && typeLoaded === "my-posts" && <MyPostsMenu />}
        {!isLoading && typeLoaded === "students" && <StudentsMenu />}
        {!isLoading && typeLoaded === "teachers" && <TeachersMenu />}
      </View>
    </VStack>
  );
}
