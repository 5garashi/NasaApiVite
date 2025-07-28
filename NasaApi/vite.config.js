
import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // .envファイルを読み込む
  const env = loadEnv(mode, process.cwd())

  // baseパスを環境変数から取得（デフォルトは '/'）
  const basePath = env.VITE_BASE_PATH || '/'

  return {
    base: basePath,
    // base: '/N/' || '/',
    plugins: [react()],
    server: {
      host: '0.0.0.0', // すべてのIPアドレスからのアクセスを許可
      port: 5173, // Viteのデフォルトポート
      proxy: {
        '/api': {
          target: 'https://cloud.appwrite.io/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})

