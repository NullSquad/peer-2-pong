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
      <LoginPage />
    </>
  );
}

function LoginPage() {
  return (
    <div class="flex justify-center items-center bg-gray-100">
      <h1>Login Page</h1>
      <LoginPageButton />
    </div>
  );
}

function LoginPageButton() {
    return (
        <button
        class="block border-gray-500 rounded">
          Login
        </button>
    );
}

