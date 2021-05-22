module.exports = {
	mount: {
		src: '/',
	},

	plugins: [
		['@snowpack/plugin-sass'],
		[
			'@snowpack/plugin-babel',
			{
				input: ['.js', '.jsm'],
			},
		],
	],

	buildOptions: {
		baseUrl: '/hello-3d',
		out: './docs',
	},

	optimize: {
		bundle: true,
		minify: true,
		treeshake: true,
		target: 'es2018',
	},
};
