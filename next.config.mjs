/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/:locale/api/:path*',
				destination: `${process.env.API_BASE_URL}/api/:path*`,
				locale: false,
			},
			{
				source: '/api/:path*',
				destination: `${process.env.API_BASE_URL}/api/:path*`,
				locale: false,
			},
		]
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/templates',
				permanent: true,
			},
		]
	},
}

export default nextConfig
