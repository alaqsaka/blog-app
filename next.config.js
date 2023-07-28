/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.NEXT_BASE_URL,
    ACCESS_TOKEN: process.env.NEXT_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
