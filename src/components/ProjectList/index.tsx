import { mdiDeleteOutline, mdiPencilOutline, mdiPlus } from "@mdi/js";
import { useBoolean } from "ahooks";
import { Button, List } from "antd";
import { useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { Project } from "../../types/firestore";
import Link from "../Link";
import MaterialIcon from "../MaterialIcon";
import ProjectModal from "../ProjectModal";

const ProjectList = (): JSX.Element => {
  const projectsRef = useFirestore().collection("projects");

  const { data: projects } = useFirestoreCollectionData<Project>(
    projectsRef.orderBy("name"),
    {
      idField: "id",
    }
  );

  const [
    modalVisible,
    { setTrue: showModal, setFalse: hideModal },
  ] = useBoolean(false);

  const [editProject, setEditProject] = useState<Project | undefined>();

  return (
    <>
      <List
        dataSource={projects}
        header={
          <Button
            icon={<MaterialIcon mdi={mdiPlus} />}
            onClick={() => {
              setEditProject(undefined);
              showModal();
            }}
            shape="circle"
            type="primary"
          />
        }
        renderItem={(project) => (
          <List.Item
            actions={[
              <Button
                key="edit"
                icon={<MaterialIcon mdi={mdiPencilOutline} />}
                onClick={() => {
                  setEditProject(project);
                  showModal();
                }}
                shape="circle"
              />,
              <Button
                key="delete"
                icon={<MaterialIcon mdi={mdiDeleteOutline} />}
                onClick={() => projectsRef.doc(project.id).delete()}
                shape="circle"
              />,
            ]}
          >
            <Link style={{ flex: 1 }} to={project.id}>
              {project.name}
            </Link>
          </List.Item>
        )}
        rowKey="id"
      />
      <ProjectModal
        onCancel={hideModal}
        onOk={hideModal}
        project={editProject}
        visible={modalVisible}
      />
    </>
  );
};

export default ProjectList;
