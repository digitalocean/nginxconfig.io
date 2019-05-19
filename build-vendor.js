/* global require */
/*eslint-env es6*/

const spawn = require('child_process');
const concat = require('concat');

const jsOutput = 'public/assets/js/vendor.min.js';
const jsFiles = [
	// angular
	'node_modules/angular/angular.min.js',

	// independent
	'node_modules/highlight.js/build/highlight.pack.js',
	'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
	'node_modules/clipboard/dist/clipboard.min.js',
	'node_modules/jszip/dist/jszip.min.js',
	'node_modules/file-saver/dist/FileSaver.min.js',
	'node_modules/js-base64/base64.min.js',
	'node_modules/notie/dist/notie.min.js',

	// angular plugins
	'node_modules/ngclipboard/dist/ngclipboard.min.js',
	'node_modules/angular-tooltips/dist/angular-tooltips.min.js',
];



function buildHighlightJs() {
	spawn.execSync('node build.js bash nginx', {
		cwd: 'node_modules/highlight.js/tools',
	});
}

function concatJs() {
	concat(jsFiles, jsOutput);
}



buildHighlightJs();
concatJs();
