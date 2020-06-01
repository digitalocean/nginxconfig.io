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

export default () => {
    const config = {};

    config.proxy_http_version = '1.1';
    config.proxy_cache_bypass = '$http_upgrade';

    config['proxy_set_header Upgrade'] = '$http_upgrade';
    config['proxy_set_header Connection'] = '"upgrade"';
    config['proxy_set_header Host'] = '$host';
    config['proxy_set_header X-Real-IP'] = '$remote_addr';
    config['proxy_set_header X-Forwarded-For'] = '$proxy_add_x_forwarded_for';
    config['proxy_set_header X-Forwarded-Proto'] = '$scheme';
    config['proxy_set_header X-Forwarded-Host'] = '$host';
    config['proxy_set_header X-Forwarded-Port'] = '$server_port';

    // Done!
    return config;
};
