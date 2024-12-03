import { AdministrationMenuProps } from "@screens/Administration";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import {
  Heading,
  HStack,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { UserDTO } from "@dtos/UserDTO";
import { Row } from "@components/Row";

type Props = AdministrationMenuProps;

export default function StudentsMenu({ onFetching }: Props) {
  const [students, setStudents] = useState([] as UserDTO[]);
  const toast = useToast();

  async function fetchStudents() {
    try {
      onFetching?.(true);
      const response = await api.get("/students");
      setStudents(response.data);
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
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <VStack space={2} px={2}>
      <HStack justifyContent="space-between" mb={5}>
        <Heading color="gray.200" fontSize="md" fontFamily="heading">
          Alunos
        </Heading>
        <Text color="gray.200" fontSize="sm">
          {students?.length}
        </Text>
      </HStack>

      <ScrollView>
        <VStack space={2}>
          {students.map((teacher, index) => (
            <Row id={index} key={index} title={teacher.name} />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
