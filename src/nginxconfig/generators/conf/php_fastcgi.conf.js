/*
Copyright 2020 DigitalOcean

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export default (domains, global) => {
    const legacyRouting = domains.some(d => d.routing.legacyPhpRouting.computed);
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
    config.fastcgi_pass = domains.some(d => d.php.php.computed) && global.php.phpBackupServer
        ? 'php'
        : ((global.php.phpServer.computed[0] === '/' ? 'unix:' : '') + global.php.phpServer.computed);
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
