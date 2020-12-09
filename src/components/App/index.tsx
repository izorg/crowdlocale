import { Layout } from "antd";
import firebase from "firebase/app";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "firebase/firestore";

import Header from "../Header";
import Loading from "../Loading";
import { withUser } from "../UserProvider";

if (process.env.NODE_ENV === "development") {
  firebase.firestore().useEmulator("localhost", 3004);
}

const ProjectsPage = lazy(() => import("../ProjectsPage"));
const ProjectPage = lazy(() => import("../ProjectPage"));
const SettingsPage = lazy(() => import("../SettingsPage"));

const App = (): JSX.Element => (
  <Layout style={{ height: "100%" }}>
    <Layout.Header style={{ backgroundColor: "transparent" }}>
      <Header />
    </Layout.Header>
    <Layout.Content>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<ProjectPage />} path="projects/:projectId" />
          <Route element={<ProjectsPage />} path="projects" />
          <Route element={<SettingsPage />} path="settings" />
          <Navigate replace to="projects" />
        </Routes>
      </Suspense>
    </Layout.Content>
  </Layout>
);

App.displayName = "App";

export default withUser(App);
