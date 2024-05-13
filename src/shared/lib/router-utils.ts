export const getPath = (path: string) =>
	path
		.split('/')
		.filter((_, i) => i > 1)
		.join('/')
