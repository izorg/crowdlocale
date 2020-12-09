import { Form } from "antd";
import { useMemo } from "react";
import { createClient, Provider } from "urql";

import GithubBranchSelect from "../../GithubBranchSelect";
import GithubFileCascader from "../../GithubFileCascader";
import GithubRepositorySelect from "../../GithubRepositorySelect";

type GithubSectionProps = {
  githubToken: string;
};

const GithubSection = ({ githubToken }: GithubSectionProps): JSX.Element => {
  const client = useMemo(
    () =>
      createClient({
        fetchOptions: {
          headers: {
            authorization: `Bearer ${githubToken}`,
          },
        },
        url: "https://api.github.com/graphql",
      }),
    [githubToken]
  );

  return (
    <Provider value={client}>
      <Form.Item
        label="Repository"
        name={["github", "repositoryId"]}
        rules={[{ required: true }]}
      >
        <GithubRepositorySelect />
      </Form.Item>
      <Form.Item dependencies={[["github", "repositoryId"]]} noStyle>
        {(form) => {
          const repositoryId = form.getFieldValue([
            "github",
            "repositoryId",
          ]) as string | undefined;

          console.log("repositoryId", repositoryId);

          if (!repositoryId) {
            return null;
          }

          return (
            <>
              <Form.Item
                label="Branch"
                name={["github", "branch"]}
                rules={[{ required: true }]}
              >
                <GithubBranchSelect repositoryId={repositoryId} />
              </Form.Item>
              <Form.Item dependencies={[["github", "branchId"]]} noStyle>
                {(form) => {
                  const branchId = form.getFieldValue([
                    "github",
                    "branchId",
                  ]) as string | undefined;

                  console.log("branchId", branchId);

                  if (!branchId) {
                    return null;
                  }

                  return (
                    <Form.Item
                      label="File"
                      name={["github", "file"]}
                      rules={[{ required: true }]}
                    >
                      <GithubFileCascader repositoryId={repositoryId} />
                    </Form.Item>
                  );
                }}
              </Form.Item>
            </>
          );
        }}
      </Form.Item>
    </Provider>
  );
};

GithubSection.displayName = "GithubSection";

export default GithubSection;
