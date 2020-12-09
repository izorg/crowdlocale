import { Button, message } from "antd";
import type firebase from "firebase";
import { useEffect } from "react";
import { useAuth } from "reactfire";

const LoginPage = (): JSX.Element => {
  const auth = useAuth();

  const googleProvider = new useAuth.GoogleAuthProvider();
  const githubProvider = new useAuth.GithubAuthProvider();

  useEffect(() => {
    auth.getRedirectResult().catch((error: firebase.auth.AuthError) => {
      void message.error(error.message);
    });
  }, [auth]);

  return (
    <>
      Login page{" "}
      <Button onClick={() => auth.signInWithRedirect(googleProvider)}>
        Google
      </Button>
      <Button onClick={() => auth.signInWithRedirect(githubProvider)}>
        GitHub
      </Button>
    </>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
