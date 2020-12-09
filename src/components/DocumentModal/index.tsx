import { Form, Modal } from "antd";
import { useFirestore, useFirestoreDocData } from "reactfire";

import { Settings } from "../../types/firestore";
import { useUser } from "../UserProvider";

import GithubSection from "./GithubSection";

type DocumentModalProps = {
  onCancel: () => void;
  onOk: () => void;
  visible: boolean;
};

const DocumentModal = (props: DocumentModalProps): JSX.Element => {
  const user = useUser();

  const settingsRef = useFirestore().collection("settings").doc(user.uid);

  const {
    data: { githubToken },
  } = useFirestoreDocData<Settings>(settingsRef, {
    idField: undefined,
  });

  return (
    <Modal {...props} destroyOnClose title="Document">
      <Form layout="vertical">
        {githubToken && <GithubSection githubToken={githubToken} />}
      </Form>
    </Modal>
  );
};

export default DocumentModal;
