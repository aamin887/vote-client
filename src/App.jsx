import "./App.css";
import {
  Home,
  Login,
  Register,
  PasswordReset,
  ResultVote,
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
  HelpPage,
  AddCandidate,
} from "./pages";

// import AddCandidate from "./pages/addcandidate/AddCandidate";

import { PrivateRoute } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import NavigationProvider from "./context/NavigationProvider";
import {
  PersistLogin,
  Layout,
  ResultHome,
  ResultElection,
  Result,
} from "./components";

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
                <Route element={<Vote />} path="/votes" />
                <Route element={<Layout />}>
                  <Route element={<Dashboard />} path="/dashboard" />
                  {/* elections */}
                  <Route path="elections">
                    {/* index */}
                    <Route element={<Elections />} index />
                    {/* create new election */}
                    <Route
                      element={<CreateElection />}
                      path="/elections/create"
                    />
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
                  {/* candidates details */}
                  <Route
                    element={<CandidateDetails />}
                    path="/candidates/:candidateId"
                  />
                  {/* all candidates */}
                  <Route element={<Candidates />} path="/candidates" />

                  {/* result page */}
                  <Route element={<ResultVote />} path="results">
                    <Route element={<ResultHome />} index />
                    <Route element={<ResultElection />} path="elections/:id" />
                    <Route
                      element={<Result />}
                      path="elections/:position/:id"
                    />
                  </Route>

                  {/* others */}
                  <Route element={<Vote />} path="reset-passwords" />
                  <Route element={<Vote />} path="reset-passwords/:id" />
                  <Route element={<HelpPage />} path="help" />
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
