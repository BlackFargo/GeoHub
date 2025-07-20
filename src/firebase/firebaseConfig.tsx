import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCze-oosBUVaEBEFvlj_zCddMs9OWfD7sk',
	authDomain: 'geohub-3075b.firebaseapp.com',
	projectId: 'geohub-3075b',
	storageBucket: 'geohub-3075b.firebasestorage.app',
	messagingSenderId: '371936664498',
	appId: '1:371936664498:web:c9381b33e779a830cc62ab',
	measurementId: 'G-DPN58BCY9R',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

const analytics = getAnalytics(app)
