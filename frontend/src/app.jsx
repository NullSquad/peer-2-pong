import { useState, useEffect } from 'preact/hooks';

export function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMessage() {
      const response = await fetch(`http://backend:${import.meta.env.VITE_BACKEND_PORT}/`);
      const data = await response.json();
      setMessage(data.message);
    }
    fetchMessage();
  }, []);

  return (
    <>
      <h1>Vite + Preact</h1>
      <div class="card">
        <p>{message}</p>
      </div>
    </>
  );
}