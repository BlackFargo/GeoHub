import { FirebaseError } from 'firebase/app'

const firebaseErrorMessages: Record<string, string> = {
	'auth/email-already-in-use': 'This email address is already in use.',
	'auth/invalid-email': 'Invalid email format.',
	'auth/weak-password': 'Password is too weak.',
	'auth/user-not-found': 'No user found with this email.',
	'auth/wrong-password': 'Incorrect password.',
	'auth/popup-closed-by-user': 'The sign-in window was closed by the user.',
	'auth/cancelled-popup-request': 'The sign-in request was cancelled.',
	'auth/invalid-credential': 'Invalid sign-in credentials.',
}

export const handleFirebaseError = (error: unknown): string => {
	if (error instanceof FirebaseError) {
		return firebaseErrorMessages[error.code] || error.message
	} else if (error instanceof Error) {
		return error.message
	} else {
		return 'An unknown error occurred.'
	}
}
