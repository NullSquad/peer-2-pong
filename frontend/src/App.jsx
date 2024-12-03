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
  return <Dashboard user={{login: "bautrodr", image: "https://media.discordapp.net/attachments/1308031526679744599/1311673014538080286/bautrodr.png?ex=67504db0&is=674efc30&hm=d12fe933ef7a9831eeb11d08c799048cdbcc9fe52934bf93776f1ce95cc58f29&=&format=webp&quality=lossless&width=1080&height=1080"}} />;
};

export default App;
