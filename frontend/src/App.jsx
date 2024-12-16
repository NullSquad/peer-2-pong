import { useState, useMemo } from "preact/hooks";
import Router, { Route } from "preact-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Competition } from "./pages/Competition";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./context/AuthContext";

const App = () => {
  const [user, setUser] = useState(null);

  const auth = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <ProtectedRoute path="/" component={Home} />
        <ProtectedRoute path="/competition/:id" component={Competition} />
        <Route path="/login" component={Login} />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
