import { stylesMarkdown } from "@components/PostCard";
import {
  Button,
  ButtonText,
  CloseIcon,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@gluestack-ui/themed";
import { Heading, Icon, Text } from "native-base";
import Markdown from "react-native-markdown-display";

type Props = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  postContent: string;
};

export default function PostContentModal({
  showModal,
  setShowModal,
  postContent,
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
          <Heading size="md" color="gray.100">
            Prévia do Conteúdo
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} size="lg" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          {postContent && (
            <Markdown style={stylesMarkdown}>{postContent}</Markdown>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
