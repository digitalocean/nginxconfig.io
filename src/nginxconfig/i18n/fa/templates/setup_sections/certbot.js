/*
Copyright 2024 DigitalOcean

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

import common from '../../common.js';

const certbot = 'Certbot';

export default {
    commentOutSslDirectivesInConfiguration: `توضیحات ${common.ssl} مرتبط را در پیکربندی زیر نظر بگیرید:`,
    sslOffDeprecationWarning: `این دستور یک دستور موقت <code class="slim">ssl off</code> اضافه خواهد کرد تا اطمینان حاصل شود که دستورات ${common.ssl} فعال نیستند. این ممکن است باعث ایجاد هشدار در ${common.nginx} شود که ایمن است نادیده گرفته شود. این دستور هنگامی که ${certbot} پیکربندی شود، حذف خواهد شد.`,
    reloadYourNginxServer: `سرور ${common.nginx} خود را دوباره بارگذاری کنید:`,
    obtainSslCertificatesFromLetsEncrypt: `گواهی‌نامه‌های ${common.ssl} را از ${common.letsEncrypt} با استفاده از ${certbot} بدست آورید:`,
    uncommentSslDirectivesInConfiguration: `توضیحات ${common.ssl} مرتبط را در پیکربندی را بدون نظر بگذارید:`,
    configureCertbotToReloadNginxOnCertificateRenewal: `پیکربندی ${certbot} برای دوباره بارگذاری ${common.nginx} هنگامی که گواهی‌نامه‌ها با موفقیت تمدید شوند:`,
    certbotDoesNotNeedToBeSetupForYourConfiguration: `${certbot} نیازی به راه‌اندازی برای پیکربندی ${common.nginx} شما ندارد.`,
    certbot,
};
