/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '/', pathname: '**' },
      { protocol: 'https', hostname: '/', pathname: '**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '**' },
      { protocol: 'https', hostname: 'utfs.io', pathname: '**' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '**' },
    ],
  },
}

export default nextConfig
