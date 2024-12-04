import { AuthProvider } from "./hooks/useAuth";
import Router, { Route } from "preact-router";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ProtectedRoute path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Router>
    </AuthProvider>
  );
};

export default App;
