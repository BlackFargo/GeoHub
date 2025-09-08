import { create } from 'zustand'
import {
	loginUserWithEmailAndPassword,
	registerUserWithEmailAndPassword,
} from '../api/authApi'
import type { UserParams } from '../types'
type Status = 'idle' | 'loading' | 'success' | 'error'

interface IInitialState {
	user: any
	status: Status | null
	error?: string | null
}

interface AuthActions {
	registerUserWithEmail: (params: UserParams) => Promise<any>
	setUser: (user: any) => void
	loginUserWithEmailAndPassword: (params: UserParams) => Promise<any>
}

const initialState: IInitialState = {
	user: null,
	status: null,
	error: null,
}

const useAuthStore = create<IInitialState & AuthActions>(set => ({
	...initialState,
	setUser: user => {
		set({ user, status: 'success' })
	},
	registerUserWithEmail: async ({ email, password, username }: UserParams) => {
		set({ status: 'loading' })
		set({ error: null })
		try {
			const user = await registerUserWithEmailAndPassword({
				email,
				password,
				username,
			})
			set({ user, status: 'success' })
			return user
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : String(error)
			set({ status: 'error', error: errorMessage })
		}
	},
	loginUserWithEmailAndPassword: async ({
		email,
		password,
		username,
	}: UserParams) => {
		set({ status: 'loading' })
		set({ error: null })
		try {
			const user = await loginUserWithEmailAndPassword({
				email,
				password,
				username,
			})
			set({ user, status: 'success' })
			return user
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : String(error)
			set({ status: 'error', error: errorMessage })
		}
	},
}))

export default useAuthStore
