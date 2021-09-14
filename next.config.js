const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: false,
  reactStrictMode: true,
  cache: false,
  cache: {
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/.temp_cache'),
    type: 'filesystem',
  }
}
