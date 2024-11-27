import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";

/*export function App() = () => {
  return (
    <Router>
      <Routes>
		<Route path="/LogIn" element={<LogIn />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
*/
import { useState, useEffect } from 'preact/hooks';

export function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMessage() {
      const response = await fetch('/api/');
      const data = await response.json();
      setMessage(data.message);
    }
    fetchMessage();
  }, []);

  return (
    <>
      <h1 class="text-white text-5xl">Peer 2 Pong</h1>
      <div class="text-3xl font-bold underline text-primary">
        <p>{message}</p>
      </div>
    </>
  );
}
