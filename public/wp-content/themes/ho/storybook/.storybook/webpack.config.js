const path = require('path');

module.exports = async ({config}) => {
	// styles
	config.module.rules.push({
		test: /\.(sass|scss)$/,
		loaders: ['style-loader', 'css-loader', 'sass-loader'],
		include: path.resolve(__dirname, '../stories/')
	  });
	// fonts
	config.module.rules.push({
		test: /\.(png|woff|woff2|eot|ttf|svg)$/,
		use: [{
			loader: 'file-loader',
			query: {
				name: '[name].[ext]'
			}
		}],
		include: path.resolve(__dirname, '../assets/')
	});

	return config;
};
/*
const path = require('path');


module.exports = {
	module: {
		rules: [{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader'],
				include: path.resolve(__dirname, '../stories/')
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
				include: __dirname
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: [{
					loader: 'file-loader',
					query: {
						name: '[name].[ext]'
					}
				}],
				include: path.resolve(__dirname, '../')
			}
		]
	}
}*/