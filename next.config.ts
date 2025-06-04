import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow data URIs for next/image
    // This is for the saved poems feature where images are stored as data URIs in localStorage
    dangerouslyAllowSVG: true, 
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Add 'data' to domains or use unoptimized={true} for data URLs.
    // Since 'domains' is deprecated, we rely on unoptimized={true} per-image or configure loaders.
    // For simplicity, the PoemCollectionItem will use unoptimized={true} for data URLs.
  },
};

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
