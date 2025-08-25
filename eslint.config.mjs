import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
	// import.meta.dirname доступен после Node.js v20.11.0
	baseDirectory: import.meta.dirname,
})

const eslintConfig = [
	...compat.config({
		extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
	}),
	{
		// игнорируем папки
		ignores: ['dist', 'node_modules', '.next'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off', // 🚫 отключаем
			'react-hooks/exhaustive-deps': 'off',
		},
	},
]

export default eslintConfig
