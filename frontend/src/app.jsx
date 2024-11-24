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
