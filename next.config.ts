
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  basePath: '/saree--Maa-inti-Kattu-',
  assetPrefix: '/saree--Maa-inti-Kattu-/',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kalamandir.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.zilikaa.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vjvnow.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'orgenza.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'indiansilkhouseagencies.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
