import { mergeConfig, defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import viteCommConfig from './vite.comm.config'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default mergeConfig(
  viteCommConfig,
  defineConfig({
    mode: 'production',
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, '../src/index.js'),
        name: 'axios',
        fileName: 'axios.min',
        formats: ['umd']
      }
    }
  })
)
