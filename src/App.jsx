import "./App.css";
import {
  Home,
  Login,
  Register,
  AddCandidate,
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
  CandidateDetails,
  CreateElection,
  Position,
} from "./pages";

import { PrivateRoute } from "./components";
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

            <Route element={<PasswordRequest />} path="/password-success" />

            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route element={<Dashboard />} path="/dashboard" />

                  {/* elections */}
                  <Route path="elections">
                    {/* create new election */}
                    <Route
                      element={<CreateElection />}
                      path="/elections/create"
                    />
                    {/* index */}
                    <Route element={<Elections />} index />
                    {/* election by id */}
                    <Route element={<Election />} path="/elections/:id" />
                    {/* adding a candidate */}
                    <Route
                      element={<AddCandidate />}
                      path="/elections/:electionId/positions/candidates/add"
                    />
                    {/* view a position */}
                    <Route
                      element={<Position />}
                      path="/elections/positions/:id"
                    />
                  </Route>

                  <Route
                    element={<CandidateDetails />}
                    path="/candidates/:candidateId"
                  />

                  {/* positions */}
                  <Route element={<Candidates />} path="/candidates" />

                  {/*  */}

                  <Route element={<Candidates />} path="candidates/test" />
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
