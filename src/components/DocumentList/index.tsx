import { mdiPlus } from "@mdi/js";
import { useBoolean } from "ahooks";
import { Button, List } from "antd";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { Document } from "../../types/firestore";
import DocumentModal from "../DocumentModal";
import MaterialIcon from "../MaterialIcon";

const DocumentList = (): JSX.Element => {
  const documentsRef = useFirestore().collection("documents");

  const { data: documents } = useFirestoreCollectionData<Document>(
    documentsRef.orderBy("name"),
    {
      idField: "id",
    }
  );

  const [
    modalVisible,
    { setTrue: showModal, setFalse: hideModal },
  ] = useBoolean(false);

  return (
    <>
      <List
        dataSource={documents}
        header={
          <Button
            icon={<MaterialIcon mdi={mdiPlus} />}
            onClick={() => {
              showModal();
            }}
            shape="circle"
            type="primary"
          />
        }
        renderItem={(document) => <List.Item>{document.name}</List.Item>}
        rowKey="id"
      />
      <DocumentModal
        onCancel={hideModal}
        onOk={hideModal}
        visible={modalVisible}
      />
    </>
  );
};

DocumentList.displayName = "DocumentList";

export default DocumentList;
