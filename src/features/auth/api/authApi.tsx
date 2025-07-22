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
} from 'firebase/auth'
import {
	arrayUnion,
	doc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore'
import type { UserParams } from '../types'
import { signOut } from 'firebase/auth'
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
			authLogs: [
				{
					timestamp: serverTimestamp(),
					event: 'created',
				},
			],
		})

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
			authLogs: [
				{
					timestamp: serverTimestamp(),
					event: 'created',
				},
			],
		})
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

		await updateDoc(doc(db, 'users', user?.uid), {
			authLogs: arrayUnion({
				timestamp: serverTimestamp(),
				event: 'login',
			}),
		})
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
		const uid = user.uid
		await updateDoc(doc(db, 'users', uid), {
			authLogs: arrayUnion({
				timestamp: serverTimestamp(),
				event: 'logout',
			}),
		})
		const status = await signOut(auth)
		return status
	} catch (e) {
		throw e
	}
}

export const loginWithGithub = async () => {
	try {
		const userCredential = await signInWithPopup(auth, gitHubProvider)

		const user = userCredential.user

		return user
	} catch (e) {
		throw e
	}
}
