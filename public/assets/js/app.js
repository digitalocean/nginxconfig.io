(function() {
	'use strict';



	angular
		.module('NginxConfigIoApp', ['ngclipboard', '720kb.tooltips'])
		.config(appConfig)
		.config(tooltipsConfig)
		.directive('ngIncludeTabs', ngIncludeTabs)
		.controller('NginxConfigIoController', NginxConfigIoController);



	var DEFAULTS = {
		sites: [{
			// SERVER
			domain:			'',
			path:			'',
			document_root:	'/public',
			non_www:		true,
			cdn:			false,
			redirect:		true,
			ipv4:			'*',
			ipv6:			'::',

			// HTTPS
			https:					true,
			http2:					true,
			force_https:			true,
			hsts:					true,
			hsts_subdomains:		true,
			hsts_preload:			true,
			cert_type:				'letsencrypt',
			email:					'',
			ssl_certificate:		'',
			ssl_certificate_key:	'',

			// PHP
			php:		true,
			wordpress:	false,
			drupal:		false,
			magento:	false,

			// PYTHON
			python:		false,
			django:		false,

			// PROXY
			proxy:			false,
			proxy_path:		'/',
			proxy_pass:		'http://127.0.0.1:3000',

			// ROUTING
			root:			true,
			index:			'index.php',
			fallback_html:		false,
			fallback_php:		true,
			fallback_php_path:	'/api/',
			php_legacy_routing:	false,

			// LOGGING
			access_log_domain:	false,
			error_log_domain:	false,
		}],


		// COMMON - HTTPS
		ssl_profile:			'modern',
		resolver_cloudflare:		true,
		resolver_google:		true,
		resolver_opendns:		true,
		resolver_quad9:			false,
		resolver_verisign:		false,


		// COMMON - SECURITY
		referrer_policy:		'no-referrer-when-downgrade',
		content_security_policy:	'default-src * data: \'unsafe-eval\' \'unsafe-inline\'',
		server_tokens:			false,
		limit_req:			false,


		// COMMON - PHP
		php_server:		'/var/run/php/php7.2-fpm.sock',
		php_server_backup:	'',


		// COMMON - PYTHON
		python_server:		'/tmp/uwsgi.sock',


		// COMMON - PERFORMANCE
		gzip:			true,
		brotli:			false,
		expires_assets:		'7d',
		expires_media:		'7d',
		expires_svg:		'7d',
		expires_fonts:		'7d',


		// COMMON - LOGGING
		access_log:		'/var/log/nginx/access.log',
		error_log:		'/var/log/nginx/error.log warn',
		log_not_found:		false,


		// COMMON - NGINX
		worker_processes:	'auto',
		user:			'www-data',
		pid:			'/run/nginx.pid',
		client_max_body_size:	16,


		// COMMON - TOOLS
		file_structure:		'modularized',
		symlink:		true,
	};



	function repeat(string, count) {
		var repeatedString = '';

		for (var i = 0; i < count; i++) {
			repeatedString += string;
		}

		return repeatedString;
	}



	function appConfig($locationProvider) {
		$locationProvider
			.html5Mode(true)
			.hashPrefix('!');
	}



	function tooltipsConfig(tooltipsConfProvider) {
		tooltipsConfProvider.configure({
			side: 'right',
			size: 'small',
		});
	}



	function ngIncludeTabs() {
		return {
			require: 'ngInclude',
			restrict: 'A',
			link: {
				pre: function preLink(scope, iElement, iAttrs, controller) {
					var tabs = parseInt(iAttrs.ngIncludeTabs || 0);

					var startRegex = new RegExp(repeat('\t', tabs - 1));

					controller.template = controller.template
						.replace(/^(.*)$/mg, repeat('\t', tabs) + '$1')
						.replace(startRegex, '')
						.replace(/\s*$/, '');
				},
			},
		};
	}



	function NginxConfigIoController($scope, $window, $location, $timeout) {
		///////////////////////
		// PRIVATE VARIABLES //
		///////////////////////
		var masonry;



		///////////////////////
		// PRIVATE FUNCTIONS //
		///////////////////////
		function getSiteValue(site, key) {
			if (site === undefined) {
				site = $scope.site;
			}

			return $scope.data.sites[site][key];
		}

		function calculateChanges() {
			var siteTabs = [
				'server',
				'https',
				'php',
				'python',
				'proxy',
				'routing',
				'logging',
			];

			var commonTabs = [
				'https',
				'security',
				'php',
				'python',
				'performance',
				'logging',
				'nginx',
				'tools',
			];

			if ($scope.siteChanges[$scope.site] === undefined) {
				$scope.siteChanges[$scope.site] = {};
			}

			for (var i in siteTabs) {
				$scope.siteChanges[$scope.site][siteTabs[i]] = $window.document.querySelectorAll('section.tabs .tab-content.site-tab-content .tab-' + siteTabs[i] + ' .form-group:not(.disabled) .input-changed').length;
			}

			for (var j in commonTabs) {
				$scope.commonChanges[commonTabs[j]] = $window.document.querySelectorAll('section.tabs .tab-content.common-content .tab-' + commonTabs[j] + ' .form-group:not(.disabled) .input-changed').length;
			}
		}

		function setDataFromHash() {
			var hashData = $location.search();

			for (var key in hashData) {
				var originalKey = key;

				// legacy
				if (typeof $scope.data.sites[0][key] !== 'undefined') {
					key = '0.' + key;
				}

				// handle false
				if (hashData[originalKey] === 'false') {
					hashData[originalKey] = false;
				}

				// handle true
				if ((hashData[originalKey] === 'true' || hashData[originalKey] === '') && ($scope.data[originalKey] === 'boolean' || $scope.data.sites[0][originalKey] === 'boolean')) {
					hashData[originalKey] = true;
				}

				// handle sites
				var sitesMatch = /^(\d+)\.(.+)$/.exec(key);
				if (sitesMatch) {
					var site = parseInt(sitesMatch[1]);
					var siteKey = sitesMatch[2];

					while (site >= $scope.data.sites.length) {
						$scope.addSite();
					}

					if (
						$scope.data.sites[site][siteKey] !== undefined &&
						typeof $scope.data.sites[site][siteKey] === typeof hashData[originalKey]
					) {
						$scope.isDirty = true;
						$scope.data.sites[site][siteKey] = hashData[originalKey];
						gtag('event', key, {
							event_category: 'data_from_hash',
							event_label: hashData[originalKey],
						});
					}
				} else if (
					$scope.data[key] !== undefined &&
					typeof $scope.data[key] === typeof hashData[key]
				) {
					$scope.isDirty = true;
					$scope.data[key] = hashData[key];
					gtag('event', key, {
						event_category: 'data_from_hash',
						event_label: hashData[key],
					});
				}
			}

			$scope.site = 0;
		}

		function updateHash() {
			if (!$scope.dataInit) {
				return;
			}

			var changedData = {};
			for (var key in $scope.data) {
				if (!angular.equals($scope.data[key], $scope.defaultData[key])) {
					if (key === 'sites') {
						for (var i in $scope.data[key]) {
							for (var j in $scope.data[key][i]) {
								if (
									j !== '$$hashKey' &&
									!angular.equals(
										$scope.data[key][i][j],
										$scope.defaultData[key][0][j]
									)
								) {
									changedData[i + '.' + j] = $scope.data[key][i][j];
								}
							}
						}
					} else {
						changedData[key] = $scope.data[key];
					}
				}
			}

			if (Object.keys(changedData).length) {
				$scope.isDirty = true;
				$location.search(changedData).replace();
			} else {
				$scope.isDirty = false;
				$location.search({});
			}
		}

		function initMasonry() {
			masonry = new Masonry('main .grid', {
				itemSelector: '.grid-item',
				columnWidth: '.grid-sizer',
				percentPosition: true,
				initLayout: false,
				stagger: 0,
				transitionDuration: '0.6s',
			});

			masonry.once('layoutComplete', function() {
				$scope.masonryInit = true;
			});
		}

		function doMasonry() {
			masonry.reloadItems();
			masonry.layout();

			$timeout(function() {
				masonry.layout();
			}, 600);
		}



		/////////////////////
		// SCOPE VARIABLES //
		/////////////////////
		$scope.defaultData = DEFAULTS;

		$scope.dataInit		= false;
		$scope.data			= angular.copy($scope.defaultData);
		$scope.isDirty		= false;
		$scope.masonryInit	= false;

		$scope.site			= 0;
		$scope.tab_site		= 'server';
		$scope.tab_common	= 'https';

		$scope.siteChanges		= {};
		$scope.commonChanges	= {};

		$scope.clipboardCopy = undefined;

		$scope.gzipTypes = 'text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml';

		$scope.extensions = {
			assets:	'css(\\.map)?|js(\\.map)?',
			fonts:	'ttf|ttc|otf|eot|woff2?',
			svg:	'svgz?',
			images:	'jpe?g|png|gif|ico|cur|heic|webp|tiff?',
			audio:	'mp3|m4a|aac|ogg|midi?|wav',
			video:	'mp4|mov|webm|mpe?g|avi|ogv|flv|wmv',
			docs:	'pdf|' +
					'docx?|dotx?|docm|dotm|' +
					'xlsx?|xltx?|xlsm|xltm|' +
					'pptx?|potx?|pptm|potm|ppsx?',
		};

		$scope.sslProfiles = {
			modern: {
				protocols: 'TLSv1.2',
				ciphers: 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256',
			},
			intermediate: {
				protocols: 'TLSv1 TLSv1.1 TLSv1.2',
				ciphers: 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS',
			},
			old: {
				protocols: 'SSLv3 TLSv1 TLSv1.1 TLSv1.2',
				ciphers: 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:ECDHE-RSA-DES-CBC3-SHA:ECDHE-ECDSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:DES-CBC3-SHA:HIGH:SEED:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!RSAPSK:!aDH:!aECDH:!EDH-DSS-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA:!SRP',
			},
		};



		/////////////////////
		// SCOPE FUNCTIONS //
		/////////////////////
		$scope.getDomains = function() {
			var domains = [];

			for (var i in $scope.data.sites) {
				domains.push( $scope.getDomain(i) );
			}

			return domains;
		};

		$scope.getUrl = function() {
			return $location.absUrl().replace(/#.*$/, '');
		};

		$scope.addSite = function() {
			$scope.data.sites.push( angular.copy(DEFAULTS.sites[0]) );
			$scope.site = $scope.data.sites.length - 1;
		};

		$scope.removeSite = function(site) {
			$scope.data.sites.splice(site, 1);

			if ($scope.data.sites[$scope.site] === undefined) {
				$scope.site--;
			}

			$timeout(calculateChanges);
		};

		$scope.setSite = function(site) {
			$scope.site = site;
			$timeout(calculateChanges);
		};

		$scope.setTabSite = function(tab) {
			$scope.tab_site = tab;
		};

		$scope.setTabCommon = function(tab) {
			$scope.tab_common = tab;
		};

		$scope.setPreset = function(preset) {
			$scope.data.sites[$scope.site].php				= $scope.defaultData.sites[0].php;
			$scope.data.sites[$scope.site].wordpress		= $scope.defaultData.sites[0].wordpress;
			$scope.data.sites[$scope.site].drupal			= $scope.defaultData.sites[0].drupal;
			$scope.data.sites[$scope.site].magento			= $scope.defaultData.sites[0].magento;
			$scope.data.sites[$scope.site].python			= $scope.defaultData.sites[0].python;
			$scope.data.sites[$scope.site].django			= $scope.defaultData.sites[0].django;
			$scope.data.sites[$scope.site].proxy			= $scope.defaultData.sites[0].proxy;
			$scope.data.sites[$scope.site].root				= $scope.defaultData.sites[0].root;
			$scope.data.sites[$scope.site].index			= $scope.defaultData.sites[0].index;
			$scope.data.sites[$scope.site].fallback_html	= $scope.defaultData.sites[0].fallback_html;

			switch (preset) {
			case 'frontend':
				$scope.data.sites[$scope.site].php = false;
				$scope.data.sites[$scope.site].index = 'index.html';
				$scope.data.sites[$scope.site].fallback_html = true;
				break;
			case 'backend':
				$scope.data.sites[$scope.site].index = 'index.php';
				break;
			case 'spa':
				$scope.data.sites[$scope.site].index = 'index.html';
				$scope.data.sites[$scope.site].fallback_html = true;
				break;
			case 'wordpress':
				$scope.data.sites[$scope.site].wordpress = true;
				break;
			case 'drupal':
				$scope.data.sites[$scope.site].drupal = true;
				break;
			case 'magento':
				$scope.data.sites[$scope.site].magento = true;
				break;
			case 'nodejs':
				$scope.data.sites[$scope.site].proxy = true;
				$scope.data.sites[$scope.site].root = false;
				break;
			case 'django':
				$scope.data.sites[$scope.site].php = false;
				$scope.data.sites[$scope.site].python = true;
				$scope.data.sites[$scope.site].django = true;
				$scope.data.sites[$scope.site].root = false;
				break;
			}

			gtag('event', preset, {
				event_category: 'preset',
			});
		};

		$scope.getSiteChanges = function(site) {
			if ($scope.siteChanges[site] === undefined) {
				return undefined;
			}

			var sum = 0;

			for (var tab in $scope.siteChanges[site]) {
				sum += $scope.siteChanges[site][tab];
			}

			return sum;
		};

		$scope.getSiteTabChanges = function(tab) {
			if ($scope.siteChanges[$scope.site] === undefined) {
				return 0;
			}

			return $scope.siteChanges[$scope.site][tab];
		};

		$scope.reset = function() {
			$scope.defaultData.index = 'index.php';

			$scope.data		= angular.copy($scope.defaultData);
			$scope.site		= 0;
			$scope.isDirty	= false;

			$scope.siteChanges		= {};
			$scope.commonChanges	= {};

			gtag('event', 'reset');
		};

		$scope.downloadZip = function() {
			var zip = new JSZip();

			var sourceCodes = $window.document.querySelectorAll('main .file .code.source');

			for (var i = 0; i < sourceCodes.length; i++) {
				var sourceCode = sourceCodes[i];

				var name	= sourceCode.dataset.filename;
				var content	= sourceCode.children[0].children[0].innerText;

				if (!$scope.isSymlink() && name.match(/^sites-available\//)) {
					name = name.replace(/^sites-available\//, 'sites-enabled/');
				}

				zip.file(name, content);

				if (name.match(/^sites-available\//)) {
					zip.file(name.replace(/^sites-available\//, 'sites-enabled/'), '../' + name, {
						unixPermissions: parseInt('120755', 8),
					});
				}
			}

			zip.generateAsync({
				type: 'blob',
				platform: 'UNIX',
			}).then(function(content) {
				saveAs(content, 'nginxconfig.io-' + $scope.getDomains().join(',') + '.zip');
			});

			gtag('event', $scope.getDomains().join(','), {
				event_category: 'download_zip',
			});
		};

		$scope.clipboardSuccess = function(key) {
			$scope.clipboardCopy = key;

			$timeout(function(_key) {
				if ($scope.clipboardCopy === _key) {
					$scope.clipboardCopy = undefined;
				}
			}, 1500, true, key);

			gtag('event', key, {
				event_category: 'clipboard',
			});
		};

		$scope.refreshHighlighting = function() {
			var sourceCodes = $window.document.querySelectorAll('main .file .code.source');

			for (var i = 0; i < sourceCodes.length; i++) {
				var sourceCode = sourceCodes[i];

				$timeout(function(_sourceCode) {
					_sourceCode.nextSibling.innerHTML = _sourceCode.innerHTML;
					if (_sourceCode.nextSibling.children.length && _sourceCode.nextSibling.children[0].children.length) {
						hljs.highlightBlock(_sourceCode.nextSibling.children[0].children[0]);
					}
					_sourceCode.setAttribute('hidden', '');

					doMasonry();
				}, 0, true, sourceCode);
			}
		};



		///////////////////////////
		// SCOPE QUERY FUNCTIONS //
		///////////////////////////

		// SERVER
		$scope.getDomain = function(site) {
			return getSiteValue(site, 'domain') || 'example.com';
		};

		$scope.getPath = function(site) {
			return getSiteValue(site, 'path') || '/var/www/' + $scope.getDomain(site);
		};

		$scope.isNonWWW = function(site) {
			return getSiteValue(site, 'non_www');
		};

		$scope.isWWW = function(site) {
			return !$scope.isNonWWW(site);
		};

		$scope.isCDN = function(site) {
			return $scope.isWWW(site) && getSiteValue(site, 'cdn');
		};

		$scope.isRedirect = function(site) {
			return getSiteValue(site, 'redirect');
		};

		$scope.isIPv6 = function(site) {
			return !!getSiteValue(site, 'ipv6');
		};



		// HTTPS
		$scope.isHTTPS = function(site) {
			return getSiteValue(site, 'https');
		};

		$scope.isHTTP2 = function(site) {
			return $scope.isHTTPS(site) && getSiteValue(site, 'http2');
		};

		$scope.isForceHTTPS = function(site) {
			return $scope.isHTTPS(site) && getSiteValue(site, 'force_https');
		};

		$scope.isHSTS = function(site) {
			return $scope.isHTTPS(site) && getSiteValue(site, 'hsts');
		};

		$scope.isHSTSSubdomains = function(site) {
			return $scope.isHSTS(site) && getSiteValue(site, 'hsts_subdomains');
		};

		$scope.isHSTSPreload = function(site) {
			return $scope.isHSTSSubdomains(site) && getSiteValue(site, 'hsts_preload');
		};

		$scope.isCertLetsEncrypt = function(site) {
			return $scope.isHTTPS(site) && getSiteValue(site, 'cert_type') === 'letsencrypt';
		};

		$scope.isCertCustom = function(site) {
			return $scope.isHTTPS(site) && getSiteValue(site, 'cert_type') === 'custom';
		};

		$scope.hasHTTPS = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isHTTPS(site)) {
					return true;
				}
			}

			return false;
		};

		$scope.hasCertLetsEncrypt = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isCertLetsEncrypt(site)) {
					return true;
				}
			}

			return false;
		};

		$scope.hasCertCustom = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isCertCustom(site)) {
					return true;
				}
			}

			return false;
		};

		$scope.getSslCertificate = function(site) {
			if ($scope.isCertLetsEncrypt(site)) {
				return '/etc/letsencrypt/live/' + $scope.getDomain(site) + '/fullchain.pem';
			}

			return getSiteValue(site, 'ssl_certificate') || '/etc/nginx/ssl/' + $scope.getDomain(site) + '.crt';
		};

		$scope.getSslCertificateKey = function(site) {
			if ($scope.isCertLetsEncrypt(site)) {
				return '/etc/letsencrypt/live/' + $scope.getDomain(site) + '/privkey.pem';
			}

			return getSiteValue(site, 'ssl_certificate_key') || '/etc/nginx/ssl/' + $scope.getDomain(site) + '.key';
		};

		$scope.hasCommonHSTS = function() {
			var commonHSTSSubdomains = undefined;
			var commonHSTSPreload = undefined;

			for (var site in $scope.data.sites) {
				if (!$scope.isHSTS(site)) {
					return false;
				}

				if (commonHSTSSubdomains === undefined ) {
					commonHSTSSubdomains = $scope.isHSTSSubdomains(site);
				} else if ($scope.isHSTSSubdomains(site) !== commonHSTSSubdomains) {
					return false;
				}

				if (commonHSTSPreload === undefined ) {
					commonHSTSPreload = $scope.isHSTSPreload(site);
				} else if ($scope.isHSTSPreload(site) !== commonHSTSPreload) {
					return false;
				}
			}

			return true;
		};



		// PHP
		$scope.isPHP = function(site) {
			return getSiteValue(site, 'php');
		};

		$scope.isWordPress = function(site) {
			return $scope.isPHP(site) && getSiteValue(site, 'wordpress');
		};

		$scope.isDrupal = function(site) {
			return $scope.isPHP(site) && getSiteValue(site, 'drupal');
		};

		$scope.isMagento = function(site) {
			return $scope.isPHP(site) && getSiteValue(site, 'magento');
		};

		$scope.hasPHP = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isPHP(site)) {
					return true;
				}
			}

			return false;
		};

		$scope.hasWordPress = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isWordPress(site)) {
					return true;
				}
			}

			return false;
		};

		$scope.hasDrupal = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isDrupal(site)) {
					return true;
				}
			}

			return false;
		};

		$scope.hasMagento = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isMagento(site)) {
					return true;
				}
			}

			return false;
		};

		$scope.isLegacyPHPRouting = function(site) {
			return $scope.isPHP(site) && getSiteValue(site, 'php_legacy_routing');
		};

		$scope.hasLegacyPHPRouting = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isLegacyPHPRouting(site)) {
					return true;
				}
			}

			return false;
		};



		// PYTHON
		$scope.isPython = function(site) {
			return getSiteValue(site, 'python');
		};

		$scope.isDjango = function(site) {
			return $scope.isPython(site) && getSiteValue(site, 'django');
		};

		$scope.hasPython = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isPython(site)) {
					return true;
				}
			}

			return false;
		};

		$scope.hasDjango = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isDjango(site)) {
					return true;
				}
			}

			return false;
		};



		// PROXY
		$scope.isProxy = function(site) {
			return getSiteValue(site, 'proxy');
		};

		$scope.hasProxy = function() {
			for (var site in $scope.data.sites) {
				if ($scope.isProxy(site)) {
					return true;
				}
			}

			return false;
		};



		// ROUTING
		$scope.isRoot = function(site) {
			return getSiteValue(site, 'root');
		};

		$scope.allRoot = function() {
			for (var site in $scope.data.sites) {
				if (!$scope.isRoot(site)) {
					return false;
				}
			}

			return true;
		};

		$scope.isIndexHTML = function(site) {
			return $scope.isRoot() && (getSiteValue(site, 'index') === 'index.html' || !$scope.isPHP(site));
		};

		$scope.isIndexPHP = function(site) {
			return $scope.isRoot() && getSiteValue(site, 'index') === 'index.php' && $scope.isPHP(site);
		};

		$scope.isFallbackHTML = function(site) {
			return $scope.isRoot() && getSiteValue(site, 'fallback_html');
		};

		$scope.isFallbackPHP = function(site) {
			return $scope.isRoot() && getSiteValue(site, 'fallback_php') && $scope.isPHP(site);
		};



		// LOGGING
		$scope.isAccessLogDomain = function(site) {
			return getSiteValue(site, 'access_log_domain');
		};

		$scope.isErrorLogDomain = function(site) {
			return getSiteValue(site, 'error_log_domain');
		};

		$scope.getAccessLogDomainPath = function(site) {
			return $scope.data.access_log.replace(/([^/]+)\.log$/, $scope.getDomain(site) + '.$1.log');
		};

		$scope.getErrorLogDomainPath = function(site) {
			return $scope.data.error_log.replace(/([^/]+)\.log (.+)$/, $scope.getDomain(site) + '.$1.log $2');
		};



		// COMMON - HTTPS
		$scope.isSSLProfileModern = function() {
			return $scope.hasHTTPS() && $scope.data.ssl_profile === 'modern';
		};

		$scope.isSSLProfileIntermediate = function() {
			return $scope.hasHTTPS() && $scope.data.ssl_profile === 'intermediate';
		};

		$scope.isSSLProfileOld = function() {
			return $scope.hasHTTPS() && $scope.data.ssl_profile === 'old';
		};

		$scope.isResolverCloudflare = function() {
			return $scope.hasHTTPS() && $scope.data.resolver_cloudflare;
		};

		$scope.isResolverGoogle = function() {
			return $scope.hasHTTPS() && $scope.data.resolver_google;
		};

		$scope.isResolverOpenDNS = function() {
			return $scope.hasHTTPS() && $scope.data.resolver_opendns;
		};

		$scope.isResolverQuad9 = function() {
			return $scope.hasHTTPS() && $scope.data.resolver_quad9;
		};

		$scope.isResolverVerisign = function() {
			return $scope.hasHTTPS() && $scope.data.resolver_verisign;
		};



		// COMMON - SECURITY
		$scope.isCSP = function() {
			return !!$scope.data.content_security_policy;
		};

		$scope.isServerTokens = function() {
			return $scope.data.server_tokens;
		};

		$scope.isLimitReq = function() {
			return $scope.data.limit_req;
		};



		// COMMON - PHP
		$scope.isPHPBackup = function() {
			return $scope.hasPHP() && !!$scope.data.php_server_backup;
		};

		// COMMON - PERFORMANCE
		$scope.isGzip = function() {
			return $scope.data.gzip;
		};

		$scope.isBrotli = function() {
			return $scope.data.brotli;
		};

		// COMMON - LOGGING
		$scope.isAccessLog = function() {
			return !!$scope.data.access_log;
		};

		$scope.isErrorLog = function() {
			return !!$scope.data.error_log;
		};

		$scope.isLogNotFound = function() {
			return $scope.data.log_not_found;
		};



		// COMMON - TOOLS
		$scope.isUnified = function() {
			return $scope.data.file_structure === 'unified';
		};

		$scope.isModularized = function() {
			return !$scope.isUnified();
		};

		$scope.isSymlink = function() {
			return $scope.isModularized() && $scope.data.symlink;
		};



		//////////////////
		// SCOPE EVENTS //
		//////////////////
		$scope.$watch('data', function(newValue, oldValue) {
			$timeout($scope.refreshHighlighting);

			for (var site in $scope.data.sites) {
				// www
				$scope.data.sites[site].domain = $scope.data.sites[site].domain.replace(/^https?:\/\//, '');
				$scope.data.sites[site].domain = $scope.data.sites[site].domain.replace(/\/.*$/, '');

				if ($scope.data.sites[site].domain.match(/^www\./)) {
					$scope.data.sites[site].domain = $scope.data.sites[site].domain.replace(/^www./, '');
					$scope.data.sites[site].non_www = false;
				}

				// toggle PHP <-> Python
				if (
					$scope.data.sites[site].php &&
					oldValue.sites[site] &&
					!oldValue.sites[site].php
				) {
					$scope.data.sites[site].python = false;
				} else if (
					$scope.data.sites[site].python &&
					oldValue.sites[site] &&
					!oldValue.sites[site].python
				) {
					$scope.data.sites[site].php = false;
				}

				// toggle proxy <-> (PHP || Python)
				if (
					$scope.data.sites[site].proxy &&
					oldValue.sites[site] &&
					!oldValue.sites[site].proxy
				) {
					$scope.data.sites[site].php = false;
					$scope.data.sites[site].python = false;
				} else if (
					(
						$scope.data.sites[site].php &&
						oldValue.sites[site] &&
						!oldValue.sites[site].php
					) ||
					(
						$scope.data.sites[site].python &&
						oldValue.sites[site] &&
						!oldValue.sites[site].python
					)
				) {
					$scope.data.sites[site].proxy = false;
				}
			}

			updateHash();
			$timeout(calculateChanges);

			for (var key in $scope.data) {
				if (!angular.equals(newValue[key], oldValue[key])) {
					gtag('event', key, {
						event_category: 'data_changed',
						event_label: $scope.data[key],
					});
				}
			}

			if (!$scope.dataInit) {
				$scope.dataInit = true;
			}
		}, true);



		//////////
		// INIT //
		//////////
		setDataFromHash();
		initMasonry();
	}
})();
