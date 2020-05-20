export default global => {
    const config = {};

    config['# default uwsgi_params'] = '';
    config.include = 'uwsgi_params';

    config['# uwsgi settings'] = '';
    config.uwsgi_pass = (global.python.pythonServer.computed[0] === '/' ? 'unix:' : '')
        + global.python.pythonServer.computed;
    config['uwsgi_param Host'] = '$host';
    config['uwsgi_param X-Real-IP'] = '$remote_addr';
    config['uwsgi_param X-Forwarded-For'] = '$proxy_add_x_forwarded_for';
    config['uwsgi_param X-Forwarded-Proto'] = '$http_x_forwarded_proto';

    // Done!
    return config;
};
