import path from 'path'

export default {
  plugins: [],
  resolve: {
    alias: {
      '@file-manager': path.resolve(__dirname, 'resources/js'),
    },
  },
}
