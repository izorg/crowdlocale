import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import styles from "./styles.module.less";

const Loading = (): JSX.Element => (
  <Spin
    className={styles.loading}
    indicator={<LoadingOutlined />}
    size="large"
  />
);

Loading.displayName = "Loading";

export default Loading;
