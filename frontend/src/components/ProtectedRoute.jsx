import { useEffect } from "preact/hooks";
import { Route, route } from "preact-router";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = (props) => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else route("/login", true);
      });
  }, [user]);

  return user ? <Route {...props} /> : null;
};

export default ProtectedRoute;
