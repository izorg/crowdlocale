import { Button, PageHeader, Result } from "antd";
import { ComponentType, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";

import { Project } from "../../types/firestore";
import DocumentList from "../DocumentList";

const ProjectPage: FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const projectRef = useFirestore().collection("projects").doc(projectId);

  const { data: project } = useFirestoreDocData<Project>(projectRef, {
    idField: "id",
  });

  return (
    <>
      <PageHeader onBack={() => navigate("/projects")} title={project.name} />
      <DocumentList />
    </>
  );
};

ProjectPage.displayName = "ProjectPage";

const with404 = (Component: ComponentType): ComponentType => {
  const With404 = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const projectRef = useFirestore().collection("projects").doc(projectId);

    const { data: projectDoc } = useFirestoreDoc(projectRef);

    if (!projectDoc.exists) {
      return (
        <Result
          extra={
            <Button onClick={() => navigate("/projects")} type="primary">
              Back to Projects
            </Button>
          }
          status={404}
          title="404"
        />
      );
    }

    return <Component />;
  };

  With404.displayName = `with404(${Component.displayName})`;

  return With404;
};

export default with404(ProjectPage);
