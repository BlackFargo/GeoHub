import { create } from 'zustand'
import type { User } from 'firebase/auth'
import type { UserParams } from '../types'
import {
	loginUserWithEmailAndPassword,
	registerUserWithEmailAndPassword,
} from '../api/authApi'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface IInitialState {
	user: User | null
	status: Status | null
	error?: string | null
}

interface AuthActions {
	registerUserWithEmail: (params: UserParams) => Promise<void>
	loginUserWithEmailAndPassword: (params: UserParams) => Promise<void>
	setUser: (user: User | null) => void
}

const initialState: IInitialState = {
	user: null,
	status: null,
	error: null,
}

const useAuthStore = create<IInitialState & AuthActions>(set => ({
	...initialState,
	setUser: user => set({ user, status: 'success' }),
	registerUserWithEmail: async ({ email, password, username }: UserParams) => {
		set({ status: 'loading', error: null })
		try {
			const user = await registerUserWithEmailAndPassword({
				email,
				password,
				username,
			})
			set({ user, status: 'success' })
		} catch (error: unknown) {
			set({
				status: 'error',
				error: error instanceof Error ? error.message : String(error),
			})
		}
	},
	loginUserWithEmailAndPassword: async ({
		email,
		password,
		username,
	}: UserParams) => {
		set({ status: 'loading', error: null })
		try {
			const user = await loginUserWithEmailAndPassword({
				email,
				password,
				username,
			})
			set({ user, status: 'success' })
		} catch (error: unknown) {
			set({
				status: 'error',
				error: error instanceof Error ? error.message : String(error),
			})
		}
	},
}))

export default useAuthStore
