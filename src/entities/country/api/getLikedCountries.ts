import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'
import { handleFirebaseError } from '@/shared/utils/handleFirebaseError'

export async function getLikedCountries() {
	try {
		const snapshot = await getDocs(collection(db, 'likedCountries'))
		if (snapshot.empty) return null
		return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	} catch (error) {
		throw new Error(handleFirebaseError(error))
	}
}
