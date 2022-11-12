const withTM = require('next-transpile-modules')(['@deck.gl/core']);
module.exports = withTM({
  reactStrictMode: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
