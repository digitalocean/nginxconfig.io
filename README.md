[![nginxconfig.io](public/assets/img/github.png)](https://nginxconfig.io)

# NGiИX configuration generator

## Features
### Site
* Domain
* Path
* Document root
* www subdomain
* CDN
* Redirect www to non-www or non-www to www
* Listen IPv4, IPv6

### HTTPS
* HTTPS
* HTTP2
* Force HTTPS redirect
* [HSTS](https://hstspreload.org)
* [SSL profiles](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
* Certification type
	* [Let's Encrypt](https://letsencrypt.org)
	* Custom certificate
* OCSP DNS resolvers
	* [Cloudflare Resolver](https://www.cloudflare.com/dns/)
	* [Google Public DNS](https://developers.google.com/speed/public-dns/)
	* [OpenDNS](https://www.opendns.com)

### Security
* Referrer-Policy
	* `no-referrer`
	* `no-referrer-when-downgrade`
	* `origin`
	* `origin-when-cross-origin`
	* `same-origin`
	* `strict-origin`
	* `strict-origin-when-cross-origin`
	* `unsafe-url`
* Content-Security-Policy
* X-Frame-Options
* X-XSS-Protection
* X-Content-Type-Options
* `server_tokens`
* `limit_req` (throttle WordPress login)

### PHP
* PHP
* PHP server
	* TCP
	* HHVM socket
	* 5.x socket
	* 7.x socket
* PHP backup server
* WordPress security essentials
* Drupal security essentials
* Magento security essentials

### Python
* Python
* Python server
* Python backup server

### Routing
* `index`
* Fallback routing
	* index.php
		* *[Laravel](https://laravel.com/docs/master/deployment#nginx)*
		* *[Lumen](https://lumen.laravel.com/docs/5.1/installation#configuration)*
		* *[Symfony](https://symfony.com/doc/current/setup/web_server_configuration.html#nginx)*
		* *[Zend](https://www.nginx.com/resources/wiki/start/topics/recipes/zend/)*
		* *[CodeIgniter](https://www.nginx.com/resources/wiki/start/topics/recipes/codeigniter/)*
		* *[Yii](http://www.yiiframework.com/doc/guide/1.1/en/quickstart.apache-nginx-config#nginx)*
		* *[CakePHP](https://book.cakephp.org/3.0/en/installation.html#nginx)*
		* *[Slim](https://www.slimframework.com/docs/start/web-servers.html)*
	* index.html
		* *[Angular](https://angular.io/guide/deployment#production-servers)*
		* *[React](https://github.com/react-boilerplate/react-boilerplate/blob/v3.5.0/app/.nginx.conf#L81)*
		* *[Vue.js](https://stackoverflow.com/questions/47655869/how-to-use-vue-js-with-nginx)*
		* *[Ember.js](https://discuss.emberjs.com/t/how-to-serve-all-routes-on-a-production-server-exactly/6372)*
* Fallback routing PHP (SPA + API support)

### Cache
* Assets (`css(\.map)?|js(\.map)?`)
* Media
	* Images (`jpe?g|png|gif|ico|cur|heic|webp|tiff?`)
	* Audio (`mp3|m4a|aac|ogg|midi?|wav`)
	* Video (`mp4|mov|webm|mpe?g|avi|ogv|flv|wmv`)
* SVG (`svgz?`)
* Fonts (`ttf|ttc|otf|eot|woff2?`)

### Reverse proxy
* Reverse proxy
* Path
* `proxy_pass`
* Proxy headers

### Logging
* `access_log`
* `error_log`
* `access_log` by domain
* `error_log` by domain
* `log_not_found`

### nginx
* `worker_processes`
* `user`
* `pid`
* `client_max_body_size`

### Tools
* Download generated config
* Modularized / unified structure (multiple or singe file(s))
* Share settings
* Reset

## Built With
* [Bootstrap](http://getbootstrap.com) - Grid, form controls
* [AngularJS](https://angularjs.org) - Two-way data binding, template handling
* [highlight.js](https://highlightjs.org) - nginx syntax highlight
* [clipboard.js](https://clipboardjs.com) - Copy generated config to clipboard
* [ngclipboard](http://sachinchoolur.github.io/ngclipboard/) - AngularJS directive for clipboard.js
* [Angular Tooltips](https://720kb.github.io/angular-tooltips/) - helper tooltips
* [Masonry](https://masonry.desandro.com) - files grid layout
* [JSZip](https://stuk.github.io/jszip) - generating zip package
* [FileSaver](https://github.com/eligrey/FileSaver.js) - downloading zip file

## Resources
* [Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
* [Nginx Optimization: understanding sendfile, tcp_nodelay and tcp_nopush](https://thoughts.t37.net/nginx-optimization-understanding-sendfile-tcp-nodelay-and-tcp-nopush-c55cdd276765)
* [NGINX Tuning For Best Performance](https://gist.github.com/denji/8359866)
* [Hardening Your HTTP Security Headers](https://www.keycdn.com/blog/http-security-headers/)
* [h5bp/server-configs-nginx](https://github.com/h5bp/server-configs-nginx)
* [Diffie-Hellman DSA-like parameters](https://security.stackexchange.com/questions/95178/diffie-hellman-parameters-still-calculating-after-24-hours/95184#95184)
* [hstspreload.org](https://hstspreload.org)
* [Optimal value for nginx worker_connections](https://serverfault.com/questions/787919/optimal-value-for-nginx-worker-connections)
