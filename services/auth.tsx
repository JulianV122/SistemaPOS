

import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updatePhoneNumber } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore(app);

// Hacer registro de usuario con Firebase
export async function registerUser(email: string, password: string, name: string, lastname: string, telephone: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Obtener la referencia del rol predeterminado "usuario"
        const roleRef = doc(db, "roles", "usuario");

        // Store the phone number in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            lastname: lastname,
            email: email,
            telephone: telephone,
            rol: roleRef
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

/**
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
 */


export async function getCurrentUser() {
    const user = auth.currentUser;

    if (!user) {
        return null;
    }

    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            console.log('No se encontró el usuario');
            return null;
        }

        const userData = userDoc.data();
        const roleDoc = await getDoc(userData.rol);

        if (!roleDoc.exists()) {
            console.log('No se encontró el rol del usuario');
            return null;
        }

        const roleData = roleDoc.data() as { name: string; description: string };
        const rolesPermissionsQuery = query(collection(db, "roles_permissions"), where("rol", "==", userData.rol));
        const rolesPermissionsSnapshot = await getDocs(rolesPermissionsQuery);

        const permissions = [];
        for (const doc of rolesPermissionsSnapshot.docs) {
            const permissionDoc = await getDoc(doc.data().permission);
            if (permissionDoc.exists()) {
                permissions.push((permissionDoc.data() as { name: string }).name);
            }
        }

        return {
            uid: user.uid,
            email: user.email,
            name: userData.name,
            lastname: userData.lastname,
            telephone: userData.telephone,
            role: {
                name: roleData.name,
                description: roleData.description,
                permissions: permissions
            }
        };
    } catch (error) {
        console.log('Error al obtener el usuario', error);
        return null;
    }
}