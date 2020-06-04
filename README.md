[![GitHub stars](https://img.shields.io/github/stars/digitalocean/nginxconfig.io.svg)](https://github.com/digitalocean/nginxconfig.io/stargazers)
[![GitHub contributors](https://img.shields.io/github/contributors/digitalocean/nginxconfig.io.svg?color=blue)](https://github.com/digitalocean/nginxconfig.io/graphs/contributors)
[![MIT License](https://img.shields.io/github/license/digitalocean/nginxconfig.io.svg?color=blue)](https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE.md)
<br>
[![Closed issues](https://img.shields.io/github/issues-closed-raw/digitalocean/nginxconfig.io.svg?color=brightgreen)](https://github.com/digitalocean/nginxconfig.io/issues?q=is%3Aissue+is%3Aclosed)
[![Closed PR](https://img.shields.io/github/issues-pr-closed-raw/digitalocean/nginxconfig.io.svg?color=brightgreen)](https://github.com/digitalocean/nginxconfig.io/pulls?q=is%3Apr+is%3Aclosed)
[![Open issues](https://img.shields.io/github/issues-raw/digitalocean/nginxconfig.io.svg)](https://github.com/digitalocean/nginxconfig.io/issues)
[![Open PR](https://img.shields.io/github/issues-pr-raw/digitalocean/nginxconfig.io.svg)](https://github.com/digitalocean/nginxconfig.io/pulls)
<br>
[![Build status](https://img.shields.io/travis/com/digitalocean/nginxconfig.io.svg)](https://travis-ci.com/digitalocean/nginxconfig.io)
[![Uptime Robot ratio (7 days)](https://img.shields.io/uptimerobot/ratio/7/m779967051-bbb607d7a68973aaf01371fe.svg)](https://stats.uptimerobot.com/BqPYtQ74)
[![Google PageSpeed Insights](https://img.shields.io/badge/PageSpeed-95--100-brightgreen.svg)](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fnginxconfig.io&tab=desktop)
[![Qualys SSL Labs](https://img.shields.io/badge/SSL%20Report-A+-brightgreen.svg)](https://www.ssllabs.com/ssltest/analyze.html?d=nginxconfig.io)
[![securityheaders.io](https://img.shields.io/badge/securityheaders.io-A-brightgreen.svg)](https://securityheaders.com/?q=https%3A%2F%2Fnginxconfig.io%2F)
[![HSTS preload](https://img.shields.io/hsts/preload/nginxconfig.io.svg?label=HSTS)](https://hstspreload.org/?domain=nginxconfig.io)


[![nginxconfig.io](public/assets/img/github.png)](https://nginxconfig.io)

<p align="center">
  <h3 align="center">⚙️ NGINX configuration generator on steroids 💉</h3>
  <p align="center">
    The only tool you'll ever need to configure your NGINX server.
    <br>
    <a href="https://nginxconfig.io"><strong>nginxconfig.io »</strong></a>
    <br />
    <br />
    <a href="https://github.com/digitalocean/nginxconfig.io/issues">Report Bug</a>
    ·
    <a href="https://github.com/digitalocean/nginxconfig.io/issues">Request Feature</a>
  </p>
</p>

<br>

# ✨ [nginxconfig.io](https://nginxconfig.io)
NGINX is so much more than just a webserver. You already knew that, probably.

We love NGINX, because:
* low memory usage
* high concurrency
* asynchronous event-driven architecture
* load balancing
* reverse proxying
* FastCGI support with caching (PHP)
* amazing fast handling of static files
* TLS/SSL with SNI
* **sexy config syntax**

A lot of features with corresponding configuration directives. You can deep dive into the [NGINX documentation](http://nginx.org/en/docs/) right now OR you can use this tool to check how NGINX works, observe how your inputs are affecting the output, **generate the best config for your specific use-case** (and in parallel you can still use the docs).

## 🚀 Usage
`GOTO` **[`nginxconfig.io`](https://nginxconfig.io)**

**Features:**
HTTPS, HTTP/2, IPv6, certbot, HSTS, security headers, SSL profiles, OCSP resolvers, caching, gzip, brotli, fallback routing, reverse proxy, www/non-www redirect, CDN, PHP (TCP/socket, WordPress, Drupal, Magento), Node.js, Python (Django), etc.

## 👨‍💻 Author
**Bálint Szekeres &lt;balint@szekeres.me&gt; (https://balint.szekeres.me)**
* GitHub: [@0xB4LINT](https://github.com/0xB4LINT)
* LinkedIn: [@0xB4LINT](https://www.linkedin.com/in/0xB4LINT/)

## ▶️ Install locally
1. Clone the repository
	```sh
	git clone https://github.com/digitalocean/nginxconfig.io.git
	```
1. Install NPM packages
	```sh
	npm install
	```
1. Build assets & run server *(with file watchers)*
	```sh
	npm start
	```
1. Your browser will open **[127.0.0.1:3000](http://127.0.0.1:3000)**

## ▶️ Install as a container

1. Clone the repository
	```sh
	git clone https://github.com/digitalocean/nginxconfig.io.git
	```
2. Change into the directory
   ```sh
   cd nginxconfig.io
   ```
3. Build the container (don't miss the period at the end of the command)
   ```sh
   docker build --tag nginxconfig-io .
   ```
4. Run the image
   ```sh
   # Run once and remove container when stopped
   docker run --rm -d nginxconfig-io
   # Use port 8000 and have the container persist on reboots (docker service needs to be enabled also)
   docker run -d --name nginxconfig-io -p 8000:80/tcp --restart unless-stopped nginxconfig-io
   ```

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
1. Commit your Changes (`git commit -m 'Add some AmazingFeature`)
1. Push to the Branch (`git push origin feature/AmazingFeature`)
1. Open a Pull Request

## ⚒️ Built With
* [Bootstrap](http://getbootstrap.com) - Grid, form controls
* [AngularJS](https://angularjs.org) - Two-way data binding, template handling
* [highlight.js](https://highlightjs.org) - nginx syntax highlight
* [clipboard.js](https://clipboardjs.com) - Copy generated config to clipboard
* [ngclipboard](http://sachinchoolur.github.io/ngclipboard/) - AngularJS directive for clipboard.js
* [Angular Tooltips](https://720kb.github.io/angular-tooltips/) - helper tooltips
* [Masonry](https://masonry.desandro.com) - files grid layout
* [JSZip](https://stuk.github.io/jszip) - generating zip package
* [FileSaver](https://github.com/eligrey/FileSaver.js) - downloading zip file
* [notie](https://jaredreich.com/notie/) - toast notifications

## 📚 Resources
* [Mozilla SSL Configuration Generator v5](https://ssl-config.mozilla.org)
* [Mozilla SSL Configuration Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
* [OWASP TLS Cipher String Cheat Sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/TLS_Cipher_String_Cheat_Sheet.md)
* [Nginx Optimization: understanding sendfile, tcp_nodelay and tcp_nopush](https://thoughts.t37.net/nginx-optimization-understanding-sendfile-tcp-nodelay-and-tcp-nopush-c55cdd276765)
* [NGINX Tuning For Best Performance](https://gist.github.com/denji/8359866)
* [Hardening Your HTTP Security Headers](https://www.keycdn.com/blog/http-security-headers/)
* [h5bp/server-configs-nginx](https://github.com/h5bp/server-configs-nginx)
* [Diffie-Hellman DSA-like parameters](https://security.stackexchange.com/questions/95178/diffie-hellman-parameters-still-calculating-after-24-hours/95184#95184)
* [hstspreload.org](https://hstspreload.org)
* [Optimal value for nginx worker_connections](https://serverfault.com/questions/787919/optimal-value-for-nginx-worker-connections)

## ⭐️ Show your support
Give a ⭐️ if this project helped you!

## 📝 License
Copyright © 2019 [DigitalOcean, Inc &lt;contact@digitalocean.com&gt; (https://www.digitalocean.com)](https://www.digitalocean.com).<br>
This project is [MIT](https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE) licensed.
