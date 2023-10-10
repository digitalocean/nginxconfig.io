/*
Copyright 2021 DigitalOcean

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

export default (domains) => {
    const legacyRouting = domains.some((d) => d.routing.legacyPhpRouting.computed);
    const config = {};

    if (legacyRouting) {
        config['# split path'] = '';
        config.fastcgi_split_path_info = '^(.+\\.php)(/.+)$';
        config.set = '$_fastcgi_path_info $fastcgi_path_info';
    }

    config['# 404'] = '';
    config.try_files = '$fastcgi_script_name =404';

    config['# default fastcgi_params'] = '';
    config.include = 'fastcgi_params';

    config['# fastcgi settings'] = '';
    config.fastcgi_index = 'index.php';
    config.fastcgi_buffers = '8 16k';
    config.fastcgi_buffer_size = '32k';

    config['# fastcgi params'] = '';
    config['fastcgi_param DOCUMENT_ROOT'] = '$realpath_root';
    config['fastcgi_param SCRIPT_FILENAME'] = '$realpath_root$fastcgi_script_name';
    if (legacyRouting) config['fastcgi_param PATH_INFO'] = '$_fastcgi_path_info';
    config['fastcgi_param PHP_ADMIN_VALUE'] = '"open_basedir=$base/:/usr/lib/php/:/tmp/"';

    // Done!
    return config;
};
