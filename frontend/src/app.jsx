import Router from "preact-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Router>
        <Login path="/" />
        <Home path="/home" />
        <NotFound default />
      </Router>
    </main>
  );
}

export default App;
