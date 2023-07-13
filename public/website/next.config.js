//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  transpilePackages: ['@clipcap'],
  trailingSlash: true,
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  reactStrictMode: false,
  async rewrites() {
    if (process.env.MODE === 'development') {
      // When running Next.js via Node.js (e.g. `dev` mode), proxy API requests
      // to the Go server.
      return [
        {
          source: "/api/v1/:path*",
          destination: "http://localhost:8080/api/v1/:path*",
        },
      ];
    }

    return [];
  },
};

module.exports = withNx(nextConfig);

