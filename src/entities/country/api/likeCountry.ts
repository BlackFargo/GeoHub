import { db } from '@/firebase/firebaseConfig'
import {
	updateDoc,
	doc,
	arrayUnion,
	setDoc,
	addDoc,
	collection,
} from 'firebase/firestore'

import { handleFirebaseError } from '@/shared/utils/handleFirebaseError'

export async function likeCountry(name: string) {
	try {
		const docRef = doc(db, 'likedCountries', 'DDi2AbyqIsEDKpTCu2wT')
		if (docRef) {
			await updateDoc(docRef, {
				countries: arrayUnion(name),
			})
		} else {
			await addDoc(collection(db, 'likedCountries'), {
				countries: [name],
			})
		}
	} catch (error: unknown) {
		throw new Error(handleFirebaseError(error))
	}
}
