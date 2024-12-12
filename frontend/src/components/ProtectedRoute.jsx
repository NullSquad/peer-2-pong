import { useEffect } from "preact/hooks";
import { Route, route } from "preact-router";
import useAuth from "../hooks/useAuth";
import { getSession } from "../services/authService";

const ProtectedRoute = (props) => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    getSession()
      .then((user) => {
        if (user) setUser(user);
        else route("/login", true);
      })
      .catch((error) => {
        console.error(error);
        route("/login", true);
      });
  }, []);

  return user ? <Route {...props} /> : null;
};

export default ProtectedRoute;
