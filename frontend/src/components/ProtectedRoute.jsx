import { useEffect } from "preact/hooks";
import { Route, route } from "preact-router";
import useAuth from "../hooks/useAuth";
import { getSession } from "../services/authService";

const ProtectedRoute = (props) => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    getSession()
      .then((data) => {
        if (data.user) setUser(data.user);
        else route("/login", true);
      })
      .catch((error) => {
        console.error(error);
        route("/login", true);
      });
  }, [user]);

  return user ? <Route {...props} /> : null;
};

export default ProtectedRoute;
