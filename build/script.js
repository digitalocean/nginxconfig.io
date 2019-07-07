/* eslint-env es6 */
/* eslint-disable no-console */
/* global require */
/* global console */

const fs = require('fs');
const path = require('path');
const process = require('process');
const concat = require('concat');
const uglifyJs = require('uglify-js');

const key = process.argv[2];
const output = process.argv[3];
const production = process.argv.indexOf('--production') !== -1;

const allFiles = JSON.parse(fs.readFileSync('scripts.json', 'utf8'));
const files = allFiles[key];

console.log('concatenating', files);

concat(files, output).then((concatenated) => {
	if (production) {
		console.log('minifying', output);

		const minifyOutput = uglifyJs.minify(
			concatenated,
			{
				compress: {
					drop_console: true,
				},
				output: {
					beautify: false,
					wrap_iife: true,
				},
				sourceMap: {
					filename: path.basename(output),
					url: path.basename(output) + '.map',
				},
			}
		);

		fs.writeFileSync(output, minifyOutput.code);
		fs.writeFileSync(output + '.map', minifyOutput.map);
	}
});

