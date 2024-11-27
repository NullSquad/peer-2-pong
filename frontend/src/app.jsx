import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router/match";

const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/");
      const data = await response.json();
      setMessage(data.message);
    })();
  }, []);

  return (
    <>
      <h1 class="text-primary">{message}</h1>
      <Link activeClassName="active" href="/api/auth">
        <Button class="btn btn-primary">Click me</Button>
      </Link>
    </>
  );
};
