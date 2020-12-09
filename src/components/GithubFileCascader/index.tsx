import { Cascader } from "antd";
import { CascaderProps } from "antd/es/cascader";

type GithubFileCascaderProps = Omit<CascaderProps, "options"> & {
  repositoryId: string;
};

const GithubFileCascader = ({
  repositoryId,
  ...props
}: GithubFileCascaderProps): JSX.Element => {
  return <Cascader {...props} />;
};

GithubFileCascader.displayName = "GithubFileCascader";

export default GithubFileCascader;
