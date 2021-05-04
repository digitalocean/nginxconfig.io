<h3 align="center">⚙️ NGINX configuration generator on steroids 💉</h3>
<p align="center">
    The only tool you'll ever need to configure your NGINX server.
    <br />
    This is the fork of very useful open-source project by Digital Ocean, here's more information about this project:
    <br />
    <a href="https://github.com/digitalocean/nginxconfig.io"><strong>github.com/digitalocean/nginxconfig.io »</strong></a>
</p>

<br />

# ✨ About this fork

This fork is used to implement Digital Ocean's NGINX configurator to REG.RU web-site with some cosmetic tune-ups:

* unneccessary Digital Ocean stuff removed
* some styles updated to match REG.RU style-guide
* some layout improvements implemented
* static build added to Github repo for deployment

No any logic updates made here, it works just like ofirinal project.

## 🚀 Usage

`GOTO` **[`reg.ru/web-tools/nginx-config-generator`](https://www.reg.ru/web-tools/nginx-config-generator)**

## ▶️ Development

1. Clone the repository
    ```sh
    git clone https://github.com/regru/nginxconfig.io.git
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

6. Analyze production bundle size & composition
    ```sh
    npm run analyze
    ```

7. Build for production *(to the `dist` directory)*
    ```sh
    npm run build:regru-static
    ```

## 🤝 Contributing

1. Clone the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

### Rewrite & maintenance of this fork
**Valery Kovalev &lt;v.kovalev@reg.ru; (https://reg.ru)**

### Rewrite & maintenance of Digital Ocean project

**Matt (IPv4) Cowley &lt;me@mattcowley.co.uk&gt; (https://mattcowley.co.uk)**
* GitHub: [@MattIPv4](https://github.com/MattIPv4)

### Original version

**Bálint Szekeres &lt;balint@szekeres.me&gt; (https://balint.szekeres.me)**
* GitHub: [@0xB4LINT](https://github.com/0xB4LINT)
* LinkedIn: [@0xB4LINT](https://www.linkedin.com/in/0xB4LINT/)

## 📝 License

Copyright © 2021 [Reg.ru, Inc (https://www.reg.ru)](https://www.reg.ru).
Copyright © 2021 [DigitalOcean, Inc &lt;contact@digitalocean.com&gt; (https://www.digitalocean.com)](https://www.digitalocean.com).
<br />
This project is licensed under the [MIT](https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE) license.
