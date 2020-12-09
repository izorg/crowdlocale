import { Form, Input, Modal } from "antd";
import type { RuleObject } from "antd/es/form";
import type { ModalProps } from "antd/es/modal";
import { useFirestore, useFirestoreDocData } from "reactfire";

import { Settings } from "../../types/firestore";
import { useUser } from "../UserProvider";

const formId = "form";

const validator: RuleObject["validator"] = async (rule, value: string) => {
  const res = await fetch("https://api.github.com/graphql", {
    headers: {
      authorization: `Bearer ${value}`,
    },
    method: "HEAD",
  });

  if (res.status === 200) {
    return;
  }

  throw new Error(res.statusText);
};

type GithubConnectModalProps = Omit<ModalProps, "onOk"> & {
  onOk: () => void;
};

const GithubConnectModal = ({
  onOk,
  ...props
}: GithubConnectModalProps): JSX.Element => {
  const user = useUser();

  const settingsRef = useFirestore().collection("settings").doc(user.uid);

  const {
    data: { githubToken },
  } = useFirestoreDocData<Settings>(settingsRef, {
    idField: undefined,
  });

  const onFinish = async ({
    githubToken,
  }: Required<Pick<Settings, "githubToken">>) => {
    await settingsRef.set({ githubToken }, { merge: true });

    onOk();
  };

  return (
    <Modal
      {...props}
      okButtonProps={{ form: formId, htmlType: "submit" }}
      title="GitHub"
    >
      <Form
        id={formId}
        initialValues={{ githubToken }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          hasFeedback
          label="Token"
          name="githubToken"
          rules={[{ required: true, type: "string" }, { validator }]}
          validateFirst
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GithubConnectModal;
