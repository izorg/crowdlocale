import {
  mdiCogOutline,
  mdiHomeVariantOutline,
  mdiLogoutVariant,
} from "@mdi/js";
import { Avatar, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "reactfire";

import MaterialIcon from "../MaterialIcon";
import { useUser } from "../UserProvider";

const Header = (): JSX.Element => {
  const auth = useAuth();
  const navigate = useNavigate();

  const user = useUser();

  const onHomeClick = () => navigate("/");

  const onSettingsClick = () => navigate("/settings");

  const onLogout = () => auth.signOut();

  return (
    <Space>
      <Button
        icon={<MaterialIcon mdi={mdiHomeVariantOutline} />}
        onClick={onHomeClick}
        shape="circle"
      />
      <Avatar src={user.photoURL} />
      {user.displayName}
      <Button
        icon={<MaterialIcon mdi={mdiCogOutline} />}
        onClick={onSettingsClick}
        shape="circle"
      />
      <Button
        icon={<MaterialIcon mdi={mdiLogoutVariant} />}
        onClick={onLogout}
        shape="circle"
      />
    </Space>
  );
};

Header.displayName = "Header";

export default Header;
