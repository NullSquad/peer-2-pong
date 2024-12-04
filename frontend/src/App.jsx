import { useState, useEffect } from "preact/hooks";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Loading } from "./pages/Loading.jsx"

const App = () => {
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("/api/auth/session")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.user) {
  //         setUser(data.user);
  //       }
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);

  // if (loading) {
  //   return <Loading/>;
  // }

  // return user ? <Dashboard user={user} /> : <Login />;
  return <Dashboard user={{login: "bautrodr", image: "https://media.discordapp.net/attachments/1308031526679744599/1311673014538080286/bautrodr.png?ex=67519f30&is=67504db0&hm=0dd1a1d2f496cdb7b93535d3df07fb72281aa27807d43a5fc167f936f224c10e&=&format=webp&quality=lossless&width=1080&height=1080"}} />;
};

export default App;
