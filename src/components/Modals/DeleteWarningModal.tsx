import { Button } from "@components/Button";
import {
  CloseIcon,
  HStack,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@gluestack-ui/themed";
import { TriangleAlertIcon } from "lucide-react-native";
import { Heading, Icon, Text } from "native-base";

type Props = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;

  onYesPressed: () => void | Promise<void>;
  onNoPressed: () => void | Promise<void>;
};

export default function DeleteWarningModal({
  showModal,
  setShowModal,
  onYesPressed,
  onNoPressed,
}: Props) {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      size="md"
    >
      <ModalBackdrop />
      <ModalContent bgColor="$gray400">
        <ModalHeader>
          <Heading textAlign="center" size="md" color="gray.100">
            <TriangleAlertIcon size="24" />
            Deseja realmente excluir esse Post?
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} size="lg" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text color="gray.100" mt={4} mb={6}>
            Essa ação é irreversível e excluirá permanentemente o post.
          </Text>
          <HStack gap={4}>
            <Button
              flex={1}
              bgColor="danger.500"
              content="Sim, excluir"
              onPress={onYesPressed}
            />
            <Button
              flex={1}
              bgColor="blue.500"
              content="Não"
              onPress={onNoPressed}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
