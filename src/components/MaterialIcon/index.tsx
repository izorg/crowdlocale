import Icon from "@ant-design/icons";
import { FC } from "react";

type MaterialIconProps = {
  mdi: string;
  viewBox?: string;
};

const MaterialIcon: FC<MaterialIconProps> = ({
  mdi,
  viewBox = "2 2 20 20",
  ...rest
}) => (
  <Icon viewBox={viewBox} {...rest}>
    <path d={mdi} />
  </Icon>
);

export default MaterialIcon;
