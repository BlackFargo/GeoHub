import {
	addDoc,
	setDoc,
	getDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db, auth } from '@/firebase/firebaseConfig'
import type { UserParams } from '../types'

export const registerUserWithEmailAndPassword = async ({
	email,
	password,
	username = 'user',
}: UserParams) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const user = userCredential.user

		await updateProfile(user, {
			displayName: username,
		})

		await setDoc(doc(db, 'users', user.uid), {
			displayName: username,
			email: user.email,
			role: 'user',
			emailVerified: user.emailVerified,
			createdAt: serverTimestamp(),
		})

		return user
	} catch (e) {
		console.error(e)
	}
}
