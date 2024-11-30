import { useState, useEffect } from "preact/hooks";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return user ? <Dashboard user={user} /> : <Login />;
};

export default App;
