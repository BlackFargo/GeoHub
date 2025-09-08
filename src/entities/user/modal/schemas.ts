import { z } from 'zod'

export const FirebaseUserSchema = z.object({
	uid: z.string(),
	email: z.string().email(),
	emailVerified: z.boolean(),
	displayName: z.string().nullable(),
	phoneNumber: z.string().nullable(),
	photoURL: z.string().nullable(),
	isAnonymous: z.boolean(),
	metadata: z.object({
		createdAt: z.string(),
		lastLoginAt: z.string(),
		lastSignInTime: z.string(),
		creationTime: z.string(),
	}),
	providerData: z.array(
		z.object({
			providerId: z.string(),
			uid: z.string(),
			displayName: z.string().nullable(),
			email: z.string().nullable(),
			phoneNumber: z.string().nullable(),
			photoURL: z.string().nullable(),
		})
	),
	stsTokenManager: z.object({
		accessToken: z.string(),
		refreshToken: z.string(),
		expirationTime: z.number(),
	}),
})
