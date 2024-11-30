import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return user ? <Home user={user} /> : <Login />;
}

export default App;

