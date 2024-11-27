import { useState, useEffect } from 'preact/hooks';
import { Event } from './events.jsx';

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

  return ( <Event></Event>)
};
