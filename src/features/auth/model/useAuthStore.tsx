import { create } from 'zustand'
import { registerUserWithEmailAndPassword } from '../api/authApi'
import type { UserParams } from '../types'

interface IInitialState {
	user: any
	status: 'loading' | 'success' | { error: string } | null
}

interface AuthActions {
	register: (params: UserParams) => Promise<void>
}

const initialState: IInitialState = {
	user: null,
	status: null,
}

const useAuthStore = create<IInitialState & AuthActions>(set => ({
	...initialState,
	register: async ({ email, password, username }: UserParams) => {
		set({ status: 'loading' })
		try {
			const user = await registerUserWithEmailAndPassword({
				email,
				password,
				username,
			})
			set({ user, status: 'success' })
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : String(error)
			set({ status: { error: errorMessage } })
		}
	},
}))

export default useAuthStore
