import { createContext } from "preact";
import { useState, useEffect, useContext, useMemo } from "preact/hooks";
import Router, { Route, route } from "preact-router";
import Home from "./pages/Home";
import Login from "./pages/Login";

export const AuthContext = createContext();

const ProtectedRoute = (props) => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else route("/login", true);
      });
  }, [user]);

  return user ? <Route {...props} /> : null;
};

export const App = () => {
  const [user, setUser] = useState(null);

  const auth = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <ProtectedRoute path="/" component={Home} />
        <Route path="/login" component={Login} />
      </Router>
    </AuthContext.Provider>
  );
};
