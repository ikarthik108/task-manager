import { useState, createContext, useContext, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Login from "./components/Login";
import { User } from "firebase/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext({
  currentUser: {} as User | null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div></div>;
  }
  if (!currentUser) {
    return <Login />;
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useAuth = () => useContext(AuthContext);
