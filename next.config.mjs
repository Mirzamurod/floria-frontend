/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      // { protocol: 'http', hostname: '/', pathname: '**' },
      // { protocol: 'https', hostname: '/', pathname: '**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '**' },
      { protocol: 'https', hostname: 'utfs.io', pathname: '**' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/images/**' },
      { protocol: 'https', hostname: 'floria.uz', pathname: '/images/**' },
      { protocol: 'https', hostname: 'api.telegram.org', pathname: '**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '**' },
    ],
  },
}

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig)
