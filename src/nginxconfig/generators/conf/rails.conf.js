/*
Copyright 2020 DigitalOcean

This code is licensed under the MIT License.
You may obtain a copy of the License at
https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE or https://mit-license.org/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions :

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

export default (domain) => {

    const config = {};
    const namedLocation = domain[0].rails.namedLocation.computed;
    const staticRootPath = domain[0].server.path.computed + domain[0].server.documentRoot.computed;

    config[`upstream ${domain[0].server.domain.computed}`] = {
        server: `unix:${domain[0].server.path.computed}/shared/sockets/puma.sock`,
    }

    config['#Rails: Path for static files'] = '';
    config['root'] = `${staticRootPath}`;

    config['# Rails: Set larger client header buffer than the default to prevent "Request header or coookie too large"'] = '';
    config['large_client_header_buffers'] = '4 16k';

    config['# Rails: Set client max body size to 4G to prevent "413 Request Entity Too Large" '] = '';
    config['client_max_body_size'] = '4G';

    config['# Rails: ~2 seconds is often enough for most folks to parse HTML/CSS and retrieve needed images/icons/frames, connections are cheap in nginx so increasing this is generally safe.'] = '';
    config['keepalive_timeout'] = 10;

    config['# Rails: Error pages'] = '';
    config['error_page'] = '500 502 503 504 /500.html';

    config['# Rails: try files'] = '';
    config['location /'] = {
        proxy_http_version: 1.1,
        try_files: `$uri/index.html $uri ${namedLocation}`
    };

    config['# Rails: "^~ /assets/" is a "prefix string", not a regex. "^~" will prevent further location searching after this location is matched.'] = '';
    config['location ^~ /assets/'] = {
        gzip_static: 'on',
        expires: 'max',
        add_header: 'Cache-Control public',
        try_files: '$uri =404',
        error_page: '404 /404_error.html',
    };
    
    config['# Rails: Set named location to be used in try_files']
    config[`location ${namedLocation} `] = {
        'proxy_set_header X-Forwarded-For': '$proxy_add_x_forwarded_for',
        'proxy_set_header X-Forwarded-Proto': 'https',
        'proxy_set_header Host': '$http_host',
        proxy_redirect: 'off',
        proxy_http_version: 1.1,
        '# If the file exists as a static file serve it directly without': '', 
        '# running all the other rewrite tests on it': '',
        'if (-f $request_filename)': {
            '': 'break',
        },
        '# Check for index.html for directory index': '',
        '# if it\'s there on the filesystem then rewrite': '',
        '# the url to add /index.html to the end of it': '',
        '# and then break to send it to the next config rules.': '',
        'if (-f $request_filename/index.html)': {
            rewrite: `(.*) $1/index.html break`
        },
        '# This is the meat of the rack page caching config': '',
        '# it adds .html to the end of the url and then checks': '',
        '# the filesystem for that file. If it exists, then we': '',
        '# rewrite the url to have explicit .html on the end': '',
        '# and then send it on its way to the next config rule.': '',
        '# if there is no file on the fs then it sets all the': '',
        '# necessary headers and proxies to our upstream pumas': '',
        'if (-f $request_filename.html)': {
            rewrite: `(.*) $1.html break`
        },
        'if (!-f $request_filename)': {
            proxy_pass: `http://${domain[0].server.domain.computed}`,
            '': 'break',
          }
    };

    // Done!
    return config;
};
