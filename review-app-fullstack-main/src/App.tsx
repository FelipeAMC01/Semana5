import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoutes";

import { Login } from "./pages/Login/Login";
import { Layout } from "./components/Layout";
import { Reviews } from "./pages/Reviews/Reviews";
import { ReviewsGlobales } from "./pages/ReviewsGlobales/ReviewsGlobales";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/reviews" />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews-globales" element={<ReviewsGlobales />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


