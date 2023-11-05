import { mergeConfig, defineConfig } from 'vite'
import viteCommConfig from './vite.comm.config'

export default mergeConfig(
  viteCommConfig,
  defineConfig({
    mode: 'development',
    server: {
      port: 5000,
      open: true
    }
  })
)
