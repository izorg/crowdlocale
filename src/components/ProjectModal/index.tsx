import { Form, Input, Modal } from "antd";
import { useMemo, useState } from "react";
import { useFirestore } from "reactfire";

import { Project } from "../../types/firestore";
import { useUser } from "../UserProvider";

type ProjectModalProps = {
  onCancel: () => void;
  onOk: () => void;
  project?: Project;
  visible: boolean;
};

type FormValues = Pick<Project, "name">;

const ProjectModal = ({
  onOk,
  project,
  ...props
}: ProjectModalProps): JSX.Element => {
  const user = useUser();

  const projectsRef = useFirestore().collection("projects");

  const formId = "project-form";
  const title = project ? "Edit Project" : "Add Project";
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(() => project && { name: project.name }, [
    project,
  ]);

  const onFinish = async (values: FormValues) => {
    setLoading(true);

    if (project) {
      await projectsRef.doc(project.id).update(values);
    } else {
      await projectsRef.add({
        ...values,
        userId: user.uid,
      });
    }

    setLoading(false);

    onOk();
  };

  return (
    <Modal
      {...props}
      confirmLoading={loading}
      destroyOnClose
      okButtonProps={{
        form: formId,
        htmlType: "submit",
      }}
      title={title}
    >
      <Form
        id={formId}
        initialValues={initialValues}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, type: "string" }]}
        >
          <Input autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectModal;
