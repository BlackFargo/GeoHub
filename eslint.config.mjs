import { FlatCompat } from '@eslint/eslintrc'
import { globalIgnores } from 'eslint/config'

const compat = new FlatCompat({
	baseDirectory: import.meta.dir, // Node 20+
})

export default [
	// Игнорируем глобально папки сборки и node_modules
	globalIgnores(['./dist/**', './build/**', './.next/**', './node_modules/**']),

	// Подключаем старые конфиги через FlatCompat
	...compat.config({
		extends: [
			'plugin:@typescript-eslint/recommended',
			'plugin:react/recommended',
			'prettier',
		],
	}),

	// Добавляем свои правила сверху
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/exhaustive-deps': 'off',
		},
		settings: {
			react: { version: 'detect' },
		},
	},
]
