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

const logAuthEvent = async (
	uid: string,
	event: 'created' | 'login' | 'logout'
) => {
	const now = new Date()

	await updateDoc(doc(db, 'users', uid), {
		authLogs: arrayUnion({
			timestamp: Date.now(), // в миллисекундах
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
}

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
	} catch (e) {
		throw e
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
	} catch (e) {
		throw e
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
	} catch (e) {
		throw e
	}
}

export const signOutUser = async () => {
	try {
		const user = auth?.currentUser
		if (!user) {
			throw new Error('No user is currently signed in')
		}

		await logAuthEvent(user.uid, 'logout')

		await signOut(auth)
	} catch (e) {
		throw e
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
	} catch (e) {
		throw e
	}
}
