import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { 
  Home, 
  Auth, 
  Orders, 
  Tables, 
  Menu as POSMenu, 
  Dashboard,
  Mission,
  ContactUs,
  DigitalMenu
} from "./pages";
import Header from "./components/shared/Header";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/shared/FullScreenLoader"

function Layout() {
  const isLoading = useLoadData();
  const location = useLocation();
  const { isAuth } = useSelector(state => state.user);

  if(isLoading) return <FullScreenLoader />

  // Only show the POS Header if the user is in the /pos section
  const isPosRoute = location.pathname.startsWith('/pos');

  return (
    <>
      {isPosRoute && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Mission />} />
        <Route path="/menu" element={<DigitalMenu />} />
        <Route path="/contact" element={<ContactUs />} />
        
        {/* Auth Route */}
        <Route path="/auth" element={isAuth ? <Navigate to="/pos" /> : <Auth />} />

        {/* Protected POS Routes */}
        <Route
          path="/pos"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/pos/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/pos/tables"
          element={
            <ProtectedRoutes>
              <Tables />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/pos/menu"
          element={
            <ProtectedRoutes>
              <POSMenu />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/pos/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        
        {/* Redirect unknown /pos routes back to /pos, and unknown public routes to / */}
        <Route path="/pos/*" element={<Navigate to="/pos" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector((state) => state.user);
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
