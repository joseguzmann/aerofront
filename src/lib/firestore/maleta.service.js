import {db} from "../../config/firebase";
import {doc, getDoc, query, collection, getDocs} from "@firebase/firestore"

export const fetchAllMaletas = async() => {
    try {
        const q = query(collection(db, "maleta"));
        const querySnapshot = await getDocs(q);

        const maletas = [];

        querySnapshot.forEach((doc) => {
            maletas.push({ id: doc.id, ...doc.data() });
        });

        return maletas;
    } catch (error) {
        console.error("Error al obtener la maleta: ", error);
        return null;
    }
}

export const fetchMaletaById = async (id) => {
    try {
        const docRef = doc(db, `maleta/${id}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log(`La maleta con el ID ${id} no fue encontrada.`);
            return null;
        }
    } catch (error) {
        console.error("Error al obtener la maleta: ", error);
        return null;
    }
};
