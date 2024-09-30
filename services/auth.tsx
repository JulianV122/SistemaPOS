

import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore(app);

// Hacer registro de usuario con Firebase
export async function registerUser(email: string, password: string) {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario registrado', user);
        return user;
    } catch (error) {
        console.log('Error al registrar usuario', error);
        return error;
    }
}


export async function loginUser(email: string, password: string) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario logeado', user);
        return user;
    } catch (error) {
        console.log('Error al iniciar sesión', error);
        return error;
    }
}

export async function logoutUser() {
    try {
        const user = await signOut(auth);
        return user;
    } catch (error) {
        return error;
    }
}