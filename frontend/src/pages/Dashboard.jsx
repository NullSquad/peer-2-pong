import { Router } from "preact-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const Dashboard = ({ user }) => {
  return (
    <Router>
      <Home path="/" user={user} />
      <NotFound default />
    </Router>
  );
};

export default Dashboard;