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
import { FirebaseError } from 'firebase/app'

const firebaseErrorMessages: Record<string, string> = {
	'auth/email-already-in-use': 'Ця електронна пошта вже використовується.',
	'auth/invalid-email': 'Невірний формат електронної пошти.',
	'auth/weak-password': 'Пароль занадто слабкий.',
	'auth/user-not-found': 'Користувача з таким email не існує.',
	'auth/wrong-password': 'Невірний пароль.',
	'auth/popup-closed-by-user': 'Вікно авторизації було закрито користувачем.',
	'auth/cancelled-popup-request': 'Авторизацію скасовано.',
	'auth/invalid-credential': 'Невірні дані для авторизації.',
	// додавай інші по мірі потреби
}

const handleFirebaseError = (error: unknown) => {
	if (error instanceof FirebaseError) {
		return firebaseErrorMessages[error.code] || error.message
	} else if (error instanceof Error) {
		return error.message
	} else {
		return 'Сталася невідома помилка.'
	}
}

const logAuthEvent = async (
	uid: string,
	event: 'created' | 'login' | 'logout'
) => {
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
