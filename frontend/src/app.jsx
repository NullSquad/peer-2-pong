import { useState, useEffect } from 'preact/hooks';
import { Event } from './events.jsx';
import { Header } from './components/Header/Header.jsx';
import { Usercard } from './components/Usercard.jsx';

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

  return ( < Usercard name="Deordone" picture="../src/assets/avatar.png"/>);
};
