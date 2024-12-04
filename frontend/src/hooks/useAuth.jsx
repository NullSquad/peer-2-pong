import { useContext } from "preact/hooks";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const auth = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
