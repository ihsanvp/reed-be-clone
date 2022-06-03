/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mp4$/,
      use: "file-loader?name=static/chunks/videos/[hash][ext]",
    });

    return config;
  },
};

module.exports = nextConfig;
