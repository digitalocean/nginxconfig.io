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
