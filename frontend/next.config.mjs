import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
            ignored: ['**/node_modules', '**/.git', '**/.next'],
        }
        return config
    },
    output: 'standalone',
}

export default withNextIntl(nextConfig);