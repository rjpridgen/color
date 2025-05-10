import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
	'apps/*/vitest.config.ts',
	'apps/*/vitest.config.node.ts',
	'packages/*/vitest.config.ts',
	'packages/*/vitest.config.node.ts',
])
