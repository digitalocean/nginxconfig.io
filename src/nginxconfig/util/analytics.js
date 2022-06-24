/*
Copyright 2022 DigitalOcean

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

import { info } from './log';

export default ({ category, action, label, value, nonInteraction }) => {
    info('Analytics event:', { category, action, label, value, nonInteraction });

    /*try {
        // Google Analytics
        window.ga('send', 'event', {
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
            nonInteraction,
        });
    } catch (_) {
        // If analytics fail, don't block anything else
    }*/

    try {
        // Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'nginx_tool',
            category,
            action,
            label,
            value,
            nonInteraction,
        });
    } catch (_) {
        // If analytics fail, don't block anything else
    }

    try {
        // Segment
        window.analytics.track('Web Interaction', {
            category,
            action,
            label,
            value,
            nonInteraction,
        });
    } catch (_) {
        // If analytics fail, don't block anything else
    }
};

/*
All analytics events in app:

# Initial language set (from browser or query param)

File: app.vue
Category: 'Language'
Action: 'Set'
Label: language pack name
Non-interaction: true

# User manually changing tool language

File: app.vue
Category: 'Language'
Action: 'Set'
Label: language pack name
Non-interaction: false

# Initial domains set (from query params)

File: app.vue
Category: 'Site'
Action: 'Added'
Value: total number of sites active in tool
Non-interaction: true

# User adding a domain

File: app.vue
Category: 'Site'
Action: 'Added'
Value: total number of sites active in tool
Non-interaction: false

# User removing a domain

File: app.vue
Category: 'Site'
Action: 'Removed'
Label: domain name being removed
Value: total number of sites active in tool after removal

# Initial split column mode (will always be disabled)

File: app.vue
Category: 'Split column'
Action: 'Disabled'
Non-interaction: true

# User changing the column mode

File: app.vue
Category: 'Split column'
Action: 'Disabled' / 'Enabled'
Non-interaction: false

# User applying a preset

File: domain_sections/presets.vue
Category: 'Preset'
Action: 'Applied'
Label: preset internal name

# User applying a preset with previous customisations

File: domain_sections/presets.vue
Category: 'Preset'
Action: 'Overwritten'
Label: preset internal name

# User resetting global settings

File: global_sections/tools.vue
Category: 'Tools'
Action: 'Global settings reset'

# User resetting a domain

File: global_sections/tools.vue
Category: 'Tools'
Action: 'Site reset'
Label: domain name being reset

# User removing a domain in the tools tab

Note: This will also trigger the regular site removal event in app.vue
File: global_sections/tools.vue
Category: 'Tools'
Action: 'Removed site'
Label: domain name being removed

# User resetting all domains

File: global_sections/tools.vue
Category: 'Tools'
Action: 'All sites reset'
Label: comma-separated list of domain names being reset
Value: total number of domains being reset

# User removing all domains

Note: This will also trigger the regular site removal event in app.vue for each domain removed
File: global_sections/tools.vue
Category: 'Tools'
Action: 'All sites removed'
Label: comma-separated list of domain names being removed
Value: total number of domains being removed

# User clicking a tab in global settings

File: global.vue
Category: 'Global'
Action: 'Tab clicked'
Label: from tab, to tab

# User clicking back in global settings

File: global.vue
Category: 'Global'
Action: 'Back clicked'
Label: from tab, to tab

# User clicking next in global settings

File: global.vue
Category: 'Global'
Action: 'Next clicked'
Label: from tab, to tab

# User clicking a tab in domain settings

File: domain.vue
Category: 'Site'
Action: 'Tab clicked'
Label: from tab, to tab

# User clicking back in domain settings

File: domain.vue
Category: 'Site'
Action: 'Back clicked'
Label: from tab, to tab

# User clicking next in domain settings

File: domain.vue
Category: 'Site'
Action: 'Next clicked'
Label: from tab, to tab

# User clicking a tab in setup

File: setup.vue
Category: 'Setup'
Action: 'Tab clicked'
Label: from tab, to tab

# User clicking back in setup

File: setup.vue
Category: 'Setup'
Action: 'Back clicked'
Label: from tab, to tab

# User clicking next in setup

File: setup.vue
Category: 'Setup'
Action: 'Next clicked'
Label: from tab, to tab

# User downloading the config

File: setup.vue
Category: 'Setup'
Action: 'Downloaded tar file'
Label: name of the tar file (incl. domain names)
Value: total number of active domains

# User copying the base64 config

File: setup.vue
Category: 'Setup'
Action: 'Copied base64 tar'
Label: name of the tar file (incl. domain names)
Value: total number of active domains

# User copying a code snippet in setup

File: setup.vue
Category: 'Setup'
Action: 'Code snippet copied'
Label: tab name: a summary of the code snippet

# User copying a config file

File: app.vue
Category: 'Config files'
Action: 'Code snippet copied'
Label: name of file without nginx directory

# Droplet callout is rendered

File: callouts/droplet.vue
Category: 'Droplet callout'
Action: 'Visible'
Non-interaction: true

# User clicks on droplet callout

File: callouts/droplet.vue
Category: 'Droplet callout'
Action: 'Clicked'

# Contribute callout is rendered (on scroll)

File: callouts/contribute.vue
Category: 'Contribute callout'
Action: 'Visible'
Non-interaction: true

# User clicks on contribute callout

File: callouts/contribute.vue
Category: 'Contribute callout'
Action: 'Clicked'

# User closes the contribute callout

File: callouts/contribute.vue
Category: 'Contribute callout'
Action: 'Closed'

*/
