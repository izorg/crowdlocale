import { Select } from "antd";
import type { SelectProps } from "antd/es/select";
import { useMemo } from "react";

import { Ref } from "../../../github.generated";

import { useBranchesQuery } from "./Branches.github.generated";

type GithubBranchSelectProps = SelectProps<string> & {
  repositoryId: string;
};

const GithubBranchSelect = ({
  repositoryId,
  ...props
}: GithubBranchSelectProps): JSX.Element => {
  const [queryState] = useBranchesQuery({
    variables: {
      repositoryId,
    },
  });

  const repository = queryState.data?.node;

  const options = useMemo(() => {
    if (!repository || repository.__typename !== "Repository") {
      return;
    }

    return repository?.refs?.nodes
      ?.filter((node): node is Pick<Ref, "id" | "name"> => node !== null)
      .map((node) => ({
        label: node.name,
        value: node.id,
      }));
  }, [repository]);

  return <Select {...props} loading={queryState.fetching} options={options} />;
};

export default GithubBranchSelect;
