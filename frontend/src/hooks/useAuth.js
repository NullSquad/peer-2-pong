import AuthContext from "../context/AuthContext";
import { useContext } from "preact/hooks";

const useAuth = () => useContext(AuthContext);

export default useAuth;
