import { mdiGithub } from "@mdi/js";
import { useBoolean } from "ahooks";
import { Button } from "antd";

import GithubConnectModal from "../GithubConnectModal";
import MaterialIcon from "../MaterialIcon";

const SettingsPage = (): JSX.Element => {
  const [
    githubModalVisible,
    { setTrue: showGithubModal, setFalse: hideGithubModal },
  ] = useBoolean(false);

  return (
    <>
      <Button
        icon={<MaterialIcon mdi={mdiGithub} />}
        onClick={showGithubModal}
        shape="circle"
      />
      <GithubConnectModal
        onCancel={hideGithubModal}
        onOk={hideGithubModal}
        visible={githubModalVisible}
      />
    </>
  );
};

SettingsPage.displayName = "SettingsPage";

export default SettingsPage;
