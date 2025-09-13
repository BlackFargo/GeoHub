import {
	auth,
	db,
	googleProvider,
	gitHubProvider,
} from '@/firebase/firebaseConfig'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import {
	arrayUnion,
	doc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import type { UserParams } from '../types'
import { handleFirebaseError } from '@/shared/utils/handleFirebaseError'

const logAuthEvent = async (
	uid: string,
	event: 'created' | 'login' | 'logout'
) => {
	try {
		const now = new Date()
		await updateDoc(doc(db, 'users', uid), {
			authLogs: arrayUnion({
				timestamp: Date.now(),
				year: now.getFullYear(),
				month: String(now.getMonth() + 1).padStart(2, '0'),
				day: String(now.getDate()).padStart(2, '0'),
				weekday: now.toLocaleDateString('uk-UA', { weekday: 'long' }),
				time: now.toLocaleTimeString('uk-UA', {
					hour: '2-digit',
					minute: '2-digit',
					hour12: false,
				}),
				event,
			}),
		})
	} catch (error: unknown) {
		throw new Error(handleFirebaseError(error))
	}
}

// --- Auth functions ---
export const registerUserWithEmailAndPassword = async ({
	email,
	password,
}: UserParams) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const user = userCredential.user

		await setDoc(doc(db, 'users', user.uid), {
			email: user.email,
			role: 'user',
			emailVerified: user.emailVerified,
			createdAt: serverTimestamp(),
		})
		await logAuthEvent(user.uid, 'created')

		return user
	} catch (error) {
		throw new Error(handleFirebaseError(error))
	}
}

export const registerUserWithGoogle = async () => {
	try {
		const userCredential = await signInWithPopup(auth, googleProvider)
		const user = userCredential.user

		await setDoc(doc(db, 'users', user.uid), {
			email: user.email,
			role: 'user',
			emailVerified: user.emailVerified,
			createdAt: serverTimestamp(),
		})
		await logAuthEvent(user.uid, 'created')

		return user
	} catch (error) {
		throw new Error(handleFirebaseError(error))
	}
}

export const registerUserWithGithub = async () => {
	try {
		const userCredential = await signInWithPopup(auth, gitHubProvider)
		const user = userCredential.user

		await setDoc(doc(db, 'users', user.uid), {
			email: user.email,
			role: 'user',
			emailVerified: user.emailVerified,
			createdAt: serverTimestamp(),
		})
		await logAuthEvent(user.uid, 'created')

		return user
	} catch (error) {
		throw new Error(handleFirebaseError(error))
	}
}

export const loginUserWithEmailAndPassword = async ({
	email,
	password,
}: UserParams) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)
		const user = userCredential.user

		await logAuthEvent(user.uid, 'login')
		return user
	} catch (error) {
		throw new Error(handleFirebaseError(error))
	}
}

export const signOutUser = async () => {
	try {
		const user = auth.currentUser
		if (!user) throw new Error('Користувач не авторизований.')

		await logAuthEvent(user.uid, 'logout')
		await signOut(auth)
	} catch (error) {
		throw new Error(handleFirebaseError(error))
	}
}
