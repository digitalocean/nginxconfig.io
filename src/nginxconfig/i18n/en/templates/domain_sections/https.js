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

import common from '../../common';

export default {
    enableEncryptedSslConnection: `${common.enable} encrypted ${common.ssl} connections`,
    http2: `${common.http}/2`,
    enableHttp2Connections: `${common.enable} ${common.http}/2 connections`,
    forceHttps: `Force ${common.https}`,
    hsts: 'HSTS',
    enableStrictTransportSecurity: `${common.enable} Strict Transport Security`,
    certificationType: 'Certification type',
    customCertificate: 'Custom certificate',
    letsEncryptEmail: `${common.letsEncrypt} email`,
};
