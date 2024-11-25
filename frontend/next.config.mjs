import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.watchOptions = {
        poll: 1000,   // Revisa cambios cada segundo
        aggregateTimeout: 300,   // Espera 300ms después del último cambio
      }
      return config
    },
    output: 'standalone',
    // Otras configuraciones que puedas tener...
  }

export default withNextIntl(nextConfig);