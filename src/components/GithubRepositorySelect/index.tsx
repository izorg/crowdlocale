import { Select } from "antd";
import type { SelectProps } from "antd/es/select";
import { useMemo } from "react";

import { Repository } from "../../../github.generated";

import { useRepositoriesQuery } from "./Repositories.github.generated";

type GithubRepositorySelectProps = SelectProps<string>;

const GithubRepositorySelect = (
  props: GithubRepositorySelectProps
): JSX.Element => {
  const [queryState] = useRepositoriesQuery();

  const options = useMemo(
    () =>
      queryState.data?.viewer.repositories.nodes
        ?.filter(
          (node): node is Pick<Repository, "id" | "name"> => node !== null
        )
        .map((node) => ({
          label: node.name,
          value: node.id,
        })),
    [queryState.data?.viewer.repositories.nodes]
  );

  return <Select {...props} loading={queryState.fetching} options={options} />;
};

export default GithubRepositorySelect;
