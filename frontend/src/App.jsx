import { AuthProvider } from "./hooks/useAuth";
import Router, { Route } from "preact-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Competition from "./pages/Competition";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ProtectedRoute path="/" component={Home} />
        <ProtectedRoute path="/competition" component={Competition} />
		<Route path="/login" component={Login} />
      </Router>
    </AuthProvider>
  );
};

export default App;
