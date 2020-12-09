import { mdiFolderMultipleOutline } from "@mdi/js";
import { Menu } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

import MaterialIcon from "../MaterialIcon";

const menu = [
  {
    icon: <MaterialIcon mdi={mdiFolderMultipleOutline} viewBox="0 0 24 24" />,
    path: "/projects",
    title: "Projects",
  },
];

const SideMenu: FC = () => {
  return (
    <Menu mode="inline" theme="dark">
      {menu.map((item) => (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>Projects</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default SideMenu;
