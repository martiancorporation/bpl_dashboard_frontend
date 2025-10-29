import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./layouts/sign-in";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./layouts/dashboard";
import PrivateRoute from "./routes/private-routes";
import PublicRoute from "./routes/public-routes";
import useSessionStore from "./store/session";
import { useEffect } from "react";
import NotFound from "./layouts/not-found";
import DashboardLayout from "./components/dashboard-layouts";
import Survey from "./layouts/survey";
import SurveyDetails from "./layouts/survey-details";

function App() {
  const loadSessionFromLocal = useSessionStore(
    (state) => state.loadSessionFromLocal
  );

  useEffect(() => {
    loadSessionFromLocal(); // ✅ Load session on start
  }, []);
  return (
    <Router>
      {/* Toast container must be inside the app */}
      <ToastContainer position="bottom-center" autoClose={2000} />

      <Routes>
        {/* Public route (login) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Private route (dashboard) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="survey-data" element={<Survey />} />
          <Route path="survey-data/:survey_id" element={<SurveyDetails />} />
        </Route>

        {/* 404 - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
