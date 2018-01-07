(function() {

	angular
	.module('NginxConfigIoApp', [])
	.controller('NginxConfigIoController', function NginxConfigIoController($scope, $timeout) {
		$scope.data = {
			domain:				'example.com',
			path:				'/var/www/example.com',
			document_root:		'/public',
			https:				false,
			http2:				true,
			email:				'hello@example.com',
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
				css_js:	'7d',
				media:	'7d',
				svg:	'7d',
				font:	'7d',
			},
		};

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

		$scope.$watch('data', function(data) {
			$scope.refreshHighlighting();
		}, true);
	});

})();
