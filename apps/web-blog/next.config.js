module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
