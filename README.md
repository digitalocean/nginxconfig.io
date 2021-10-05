[![GitHub stars](https://img.shields.io/github/stars/digitalocean/nginxconfig.io.svg)](https://github.com/digitalocean/nginxconfig.io/stargazers)
[![GitHub contributors](https://img.shields.io/github/contributors/digitalocean/nginxconfig.io.svg?color=blue)](https://github.com/digitalocean/nginxconfig.io/graphs/contributors)
[![MIT License](https://img.shields.io/github/license/digitalocean/nginxconfig.io.svg?color=blue)](https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE)
<br />
[![Closed issues](https://img.shields.io/github/issues-closed-raw/digitalocean/nginxconfig.io.svg?color=brightgreen)](https://github.com/digitalocean/nginxconfig.io/issues?q=is%3Aissue+is%3Aclosed)
[![Closed PR](https://img.shields.io/github/issues-pr-closed-raw/digitalocean/nginxconfig.io.svg?color=brightgreen)](https://github.com/digitalocean/nginxconfig.io/pulls?q=is%3Apr+is%3Aclosed)
[![Open issues](https://img.shields.io/github/issues-raw/digitalocean/nginxconfig.io.svg)](https://github.com/digitalocean/nginxconfig.io/issues)
[![Open PR](https://img.shields.io/github/issues-pr-raw/digitalocean/nginxconfig.io.svg)](https://github.com/digitalocean/nginxconfig.io/pulls)

[![nginxconfig](src/static/banner.png)](https://do.co/nginxconfig)

<h3 align="center">⚙️ NGINX configuration generator on steroids 💉</h3>
<p align="center">
    The only tool you'll ever need to configure your NGINX server.
    <br />
    <a href="https://do.co/nginxconfig"><strong>do.co/nginxconfig »</strong></a>
    <br />
    <br />
    <a href="https://github.com/digitalocean/nginxconfig.io/issues/new?template=report-a-bug.md">Report a bug</a>
    ·
    <a href="https://github.com/digitalocean/nginxconfig.io/issues/new?template=request-a-feature.md">Request a feature</a>
</p>

<br />

# ✨ [NGINX Config](https://do.co/nginxconfig)

NGINX is so much more than just a webserver. You already knew that, probably.

We love NGINX, because:
* Low memory usage
* High concurrency
* Asynchronous event-driven architecture
* Load balancing
* Reverse proxying
* FastCGI support with caching (PHP)
* Amazing fast handling of static files
* TLS/SSL with SNI

A lot of features with corresponding configuration directives.
You can deep dive into the [NGINX documentation](http://nginx.org/en/docs/) right now OR you can [use this tool](https://do.co/nginxconfig) to check
how NGINX works, observe how your inputs are affecting the output, and **generate the best config for your specific
use-case** (in parallel you can also still use the docs).

## 🚀 Usage

`GOTO` **[`do.co/nginxconfig`](https://do.co/nginxconfig)**

**Features:**
HTTPS, HTTP/2, IPv6, certbot, HSTS, security headers, SSL profiles, OCSP resolvers, caching, gzip, brotli, fallback
routing, reverse proxy, www/non-www redirect, CDN, PHP (TCP/socket, WordPress, Drupal, Magento, Joomla), Node.js support, Python
(Django) server, etc.

## 👨‍💻 Author

### Rewrite & Maintenance

**Matt (IPv4) Cowley &lt;me@mattcowley.co.uk&gt; (https://mattcowley.co.uk)**
* GitHub: [@MattIPv4](https://github.com/MattIPv4)

### Original version

**Bálint Szekeres &lt;balint@szekeres.me&gt; (https://balint.szekeres.me)**
* GitHub: [@0xB4LINT](https://github.com/0xB4LINT)
* LinkedIn: [@0xB4LINT](https://www.linkedin.com/in/0xB4LINT/)

## ▶️ Development

1. Clone the repository
    ```sh
    git clone https://github.com/digitalocean/nginxconfig.io.git
    ```
 
2. Install NPM packages
    ```sh
    npm ci
    ```

3. Run the development server *(with file watchers)*
    ```sh
    npm run dev
    ```

4. Open the development site **[localhost:8080](http://localhost:8080)**

5. Lint your code *(eslint & sass-lint)*
    ```sh
    npm test
    ```

6. Build for production *(to the `dist` directory)*
    ```sh
    npm run build
    ```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚒️ Built With

* [Vue.js](https://vuejs.org/) - Template handling & app generation
* [Bulma](https://bulma.io/) - Base styling, customised by [do-bulma](https://github.com/do-community/do-bulma)
* [Prism](https://prismjs.com/) - Bash & NGINX syntax highlighting

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

Copyright © 2020 [DigitalOcean, Inc &lt;contact@digitalocean.com&gt; (https://www.digitalocean.com)](https://www.digitalocean.com).
<br />
This project is licensed under the [MIT](https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE) license.
