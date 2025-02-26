import { createContext, useContext, useState, useEffect } from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Crear el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                });

                try {
                    const userRef = doc(firestore, `usuarios/${currentUser.uid}`);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        console.log("No se encontró el documento");
                    }
                } catch (error) {
                    console.error("Error al obtener el documento:", error);
                }
            } else {
                setUser(null);
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userData, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useAuth() {
    return useContext(AuthContext);
}
