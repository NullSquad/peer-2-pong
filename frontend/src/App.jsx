import { useState, useEffect } from "preact/hooks";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Loading } from "./pages/Loading.jsx"

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
    return <Loading/>;
  }

  // Background aplicado a toda la renderizacion
  return (
    <div className="relative inset-0 w-full h-full bg-pattern bg-cover pt-6 sm:pt-10">
      {user ? <Dashboard user={user} /> : <Login />}
    </div>
  );
  // return user ? <Dashboard user={user} /> : <Login />;
};

export default App;
