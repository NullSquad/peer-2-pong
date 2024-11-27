import { Router, Link } from "preact-router";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";

export function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="p-4 bg-gray-800">
	  	<Link href="/logIn" className="mr-4 hover:underline text-white">Log In</Link>
        <Link href="/" className="hover:underline text-white">Home</Link>
      </nav>
      <Router>
        <Home path="/" />
        <LogIn path="/logIn" />
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;

// import { useState, useEffect } from "preact/hooks"; // Hooks de Preact

// export function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     async function fetchMessage() {
//       const response = await fetch("/api/");
//       const data = await response.json();
//       setMessage(data.message);
//     }
//     fetchMessage();
//   }, []);
// }

