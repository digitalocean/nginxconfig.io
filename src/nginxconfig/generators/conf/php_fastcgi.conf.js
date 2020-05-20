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
