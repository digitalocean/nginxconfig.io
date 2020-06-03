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
    phpIsDisabled: `${common.php} is disabled.`,
    phpCannotBeEnabledWithReverseProxy: `${common.php} cannot be enabled whilst the reverse proxy is enabled.`,
    phpCannotBeEnabledWithPython: `${common.php} cannot be enabled whilst ${common.python} is enabled.`,
    enablePhp: `${common.enable} ${common.php}`,
    wordPressRules: `${common.wordPress} rules`,
    enableWordPressRules: `${common.enable} ${common.wordPress}-specific rules`,
    drupalRules: `${common.drupal} rules`,
    enableDrupalRules: `${common.enable} ${common.drupal}-specific rules`,
    magentoRules: `${common.magento} rules`,
    enableMagentoRules: `${common.enable} ${common.magento}-specific rules`,
};
