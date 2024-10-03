

import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updatePhoneNumber } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore(app);

// Hacer registro de usuario con Firebase
export async function registerUser(email: string, password: string, name: string, lastname: string, telephone: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store the phone number in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            lastname: lastname,
            email: email,
            telephone: telephone
        });

        console.log('Usuario registrado con éxito', user);
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
    } catch (error: any) {
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


export async function getCurrentUser() {
    const user = auth.currentUser;
    // Obtener usuario de base de datos
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log("No such document!");
        }
    } else {
        console.log("No user logged in");
    }
}