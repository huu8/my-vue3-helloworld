import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
import { createProxy } from './vite.util'
import basicSsl from '@vitejs/plugin-basic-ssl'

function pathResolve(dir: string) {
	return resolve(process.cwd(), '.', dir)
}
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
	const OUTPUT_DIR = 'dist'
	const isBuild = command === 'build'
	const root = process.cwd()

	const env = loadEnv(mode, root)
	const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = env
	return {
		base: VITE_PUBLIC_PATH,
		root,
		resolve: {
			alias: [
				// /@/xxxx => src/xxxx
				{
					find: /\/~\//,
					replacement: pathResolve('./') + './',
				},
				// /@/xxxx => src/xxxx
				{
					find: /\/@\//,
					replacement: pathResolve('src') + '/',
				},
			],
		},
		server: {
			https: true,
			// Listening on all local IPs
			host: true,
			port: Number(VITE_PORT),
			// Load proxy configuration from .env
			proxy: createProxy(JSON.parse(VITE_PROXY)),

		},
		esbuild: {
			pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
		},
		build: {
			target: 'es2015',
			cssTarget: 'chrome80',
			outDir: OUTPUT_DIR,
			// minify: 'terser',
			/**
			 * 当 minify=“minify:'terser'” 解开注释
			 * Uncomment when minify="minify:'terser'"
			 */
			// terserOptions: {
			//   compress: {
			//     keep_infinity: true,
			//     drop_console: VITE_DROP_CONSOLE,
			//   },
			// },
			// Turning off brotliSize display can slightly reduce packaging time
			chunkSizeWarningLimit: 2000,
		},
		plugins: [
			vue(),
			basicSsl(),
			viteMockServe({
				ignore: /^\_/,
				mockPath: 'mock',
				localEnabled: !isBuild,
				prodEnabled: isBuild,
				injectCode: `
				  import { setupProdMockServer } from '../mock/_createProductionServer';
			
				  setupProdMockServer();
				  `,
			}),
		],
	}
}
