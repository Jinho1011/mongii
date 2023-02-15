/** @type {import('next').NextConfig} */

const path = require("node:path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/shared/styles")],
    prependData: `@import "@/shared/styles/theme.scss";`,
  },
};

module.exports = nextConfig;
