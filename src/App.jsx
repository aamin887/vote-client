import "./App.css";
import {
  Home,
  Login,
  Register,
  PasswordReset,
  Admin,
  Vote,
  Dashboard,
  Error,
  Elections,
  Candidates,
  Election,
  ChangePassword,
  PasswordRequest,
  PasswordResetSuccess,
  CreateElection,
} from "./pages";

import { PrivateRoute, AddCandidateForm } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import NavigationProvider from "./context/NavigationProvider";
import { PersistLogin, Layout } from "./components";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavigationProvider>
          <Routes>
            <Route element={<Home />} path="/" />
            {/* authentications */}
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<PasswordReset />} path="/password-reset" />
            <Route element={<ChangePassword />} path="/password-change" />
            <Route
              element={<PasswordResetSuccess />}
              path="/password-reset-change"
            />
            <Route element={<PasswordRequest />} path="/password-success" />

            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route element={<Dashboard />} path="dashboard" />
                  {/* elections */}
                  <Route path="elections">
                    <Route element={<Elections />} index />
                    <Route element={<Election />} path="/elections/:id" />
                    <Route
                      element={<CreateElection />}
                      path="/elections/create"
                    />
                  </Route>

                  {/* positions */}
                  <Route element={<Candidates />} path="candidates" />
                  <Route element={<AddCandidateForm />} path="add-candidates" />

                  {/*  */}

                  <Route element={<Candidates />} path="candidates/:id" />
                  <Route element={<Vote />} path="results" />
                  <Route element={<Vote />} path="reset-passwords" />
                  <Route element={<Vote />} path="reset-passwords/:id" />
                  <Route element={<Admin />} path="help" />
                </Route>
              </Route>
            </Route>

            {/* catch all routes */}
            <Route element={<Error />} path="*" />
          </Routes>
        </NavigationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
