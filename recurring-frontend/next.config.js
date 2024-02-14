/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  headers: () => [
    {
      source: "/",
      headers: [
        {
          key:"Cache-Control", 
          value: "no-store"
        }
      ]
    }
  ]
};

module.exports = nextConfig;
