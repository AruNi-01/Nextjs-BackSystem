/** @type {import('next').NextConfig} */
// 接口转发，解决 CORS 问题
const rewrites = () => {
  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:8000/api/:path*",
    },
  ];
};

const nextConfig = {
  rewrites,
};

module.exports = nextConfig;
