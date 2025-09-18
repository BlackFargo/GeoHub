import { db } from '@/firebase/firebaseConfig'
import {
	updateDoc,
	doc,
	arrayUnion,
	addDoc,
	collection,
} from 'firebase/firestore'

import { handleFirebaseError } from '@/shared/utils/handleFirebaseError'

export async function likeCountry(country: string) {
	try {
		const docRef = doc(db, 'likedCountries', 'DDi2AbyqIsEDKpTCu2wT')
		if (docRef) {
			await updateDoc(docRef, {
				countries: arrayUnion(country),
			})
		} else {
			await addDoc(collection(db, 'likedCountries'), {
				countries: [{ country }],
			})
		}
	} catch (error: unknown) {
		throw new Error(handleFirebaseError(error))
	}
}
