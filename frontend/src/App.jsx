import { createContext } from 'preact'
import Router from 'preact-router';
import Home from "./pages/Home";
import Login from "./pages/Login";

export const AuthContext = createContext()

const getCookie = (name) => {
 const cookies = document.cookie
   .split("; ")
   .find((row) => row.startsWith(`${name}=`));

 return cookies ? cookies.split("=")[1] : null;
};

export const App = () => {
	  const {user} = getCookie("user");

	  return (
			<AuthContext.Provider value={user}>
				<Router>
      		<Home path="/"/>
      		<Login path="/login" />
    		</Router>
		 	</AuthContext.Provider>
  );
};
