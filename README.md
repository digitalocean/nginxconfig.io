# [nginxconfig.io](https://nginxconfig.io)

Online nginx configuration generator.

## Features
* HTTPS (with [Let's Encrypt](https://letsencrypt.org), [Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/))
* HTTP2
* CDN
* www / non-www
* PHP (TCP, 5.x FPM, 7.0 FPM, 7.1 FPM, 7.2 FPM)
* WordPress security essentials
* pass requests to index.php *(Laravel, Lumen, Symfony, Zend, CodeIgniter, Yii, Phalcon, CakePHP, Slim...)*
* pass requests to index.html *(Angular, React, Vue.js, Ember.js...)*
* unified (`nginx.conf`) / separated file structure (ideal for multi-domain environment)
* security headers
* `worker_processes`
* `user`
* `pid`
* `access_log`
* `error_log`
* `gzip`
* `server_tokens`
* `log_not_found`
* rate limiting (`limit_req`)
* expiration by file types (`expires`)

## Built With
* [Bootstrap](http://getbootstrap.com) - Grid, form controls
* [AngularJS](https://angularjs.org) - Two-way data binding, template handling
* [highlight.js](https://highlightjs.org) - nginx syntax highlight
* [clipboard.js](https://clipboardjs.com) - Copy generated config to clipboard
* [ngclipboard](http://sachinchoolur.github.io/ngclipboard/) - AngularJS directive for clipboard.js
* [Angular Tooltips](https://720kb.github.io/angular-tooltips/) - helper tooltips
