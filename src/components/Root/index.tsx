import { ConfigProvider } from "antd";
import defaultLocale from "antd/es/locale/default";
import firebase from "firebase/app";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthCheck, FirebaseAppProvider } from "reactfire";

import "firebase/auth";

import Loading from "../Loading";
import LoginPage from "../LoginPage";

const App = lazy(() => import("../App"));

const firebaseConfig = {
  apiKey: "AIzaSyD5G-Bnrk0gqaP9mKlMWJx-EC09uMczzQ0",
  appId: "1:919002464353:web:db1c3f4c12e6df7582ea20",
  authDomain: "crowdlocale.firebaseapp.com",
  databaseURL: "https://crowdlocale.firebaseio.com",
  measurementId: "G-B92687WSPC",
  messagingSenderId: "919002464353",
  projectId: "crowdlocale",
  storageBucket: "crowdlocale.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "development") {
  firebaseApp.auth().useEmulator("http://localhost:3003");
}

const Root = (): JSX.Element => {
  return (
    <BrowserRouter>
      <FirebaseAppProvider firebaseApp={firebaseApp} suspense>
        <ConfigProvider locale={defaultLocale}>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<LoginPage />} path="signin" />
              <Route
                element={
                  <AuthCheck fallback={<LoginPage />}>
                    <App />
                  </AuthCheck>
                }
                path="*"
              />
            </Routes>
          </Suspense>
        </ConfigProvider>
      </FirebaseAppProvider>
    </BrowserRouter>
  );
};

Root.displayName = "Root";

export default Root;
