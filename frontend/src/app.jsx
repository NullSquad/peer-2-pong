import Router from "preact-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MatchCard from "./components/MatchCard";

function App() {
  const player1 = {
    image: "https://via.placeholder.com/150",
    name: "renerene"
  }
  const player2 = {
    image: "https://via.placeholder.com/150",
    name: "bautizador"
  }
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <MatchCard player1={player1} player2={player2} targetDate="2" />
      <MatchCard player1={player1} player2={player2} targetDate="21.3.2" />
    </main>
    /*
      <Router>
        <Login path="/" />
        <Home path="/home" />
      </Router>
    */
  );
}

export default App;
