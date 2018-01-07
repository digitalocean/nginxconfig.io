(function() {

	angular
	.module('NginxConfigIoApp', [])
	.controller('NginxConfigIoController', function NginxConfigIoController($scope, $timeout) {
		/////////////////////
		// SCOPE VARIABLES //
		/////////////////////
		$scope.data = {
			domain:				'example.com',
			path:				'/var/www/example.com',
			document_root:		'/public',
			https:				false,
			http2:				true,
			email:				'hello@example.com',
			cdn:				false,
			non_www:			true,
			php:				'7.2',
			index_html:			false,
			wordpress:			false,

			file_structure:		'unified',

			worker_processes:	'auto',
			user:				'www-data',
			pid:				'/run/nginx.pid',
			access_log:			'/var/log/nginx/access.log',
			error_log:			'/var/log/nginx/error.log',
			gzip:				true,
			server_tokens:		false,
			log_not_found:		false,
			limit_req:			false,

			expires: {
				assets:	'7d',
				fonts:	'7d',
				svg:	'7d',
				media:	'7d',
				docs:	'7d',
			},
		};

		$scope.extensions = {
			assets:	'css(\\.map)?|js(\\.map)?',
			fonts:	'ttf|ttc|otf|eot|woff|woff2',
			svg:	'svgz?',
			images:	'jpe?g|png|gif|ico|cur|heic|webp|tiff?',
			audio:	'mp3|m4a|aac|ogg|midi?|wav',
			video:	'mp4|mov|webm|mpe?g|avi|ogv|flv|wmv',
			docs:	'pdf|docx?|xlsx?|pptx?'
		};

		$scope.gzipTypes = 'text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml';



		/////////////////////
		// SCOPE FUNCTIONS //
		/////////////////////
		$scope.refreshHighlighting = function() {
			document.querySelectorAll('main .file .code.source').forEach(function(code) {
				$timeout(function(code) {
					code.nextSibling.innerHTML = code.innerHTML;
					if (code.nextSibling.children.length && code.nextSibling.children[0].children.length) {
						hljs.highlightBlock(code.nextSibling.children[0].children[0]);
					}
				}, 0, true, code);
			});
		};



		//////////////////
		// SCOPE EVENTS //
		//////////////////
		$scope.$watch('data', $scope.refreshHighlighting, true);
	});

})();
