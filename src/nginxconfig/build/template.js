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

const path = require('path');
const fs = require('fs');

// Fetch the posthtml template and convert it to an ejs template
const main = () => {
    const buildDir = path.join(__dirname, '..', '..', '..', 'build');
    let template = fs.readFileSync(path.join(buildDir, 'base.html'), 'utf8');

    template = template.replace('<block name="title"></block>', 'NGINXConfig | ');
    template = template.replace('<block name="head"></block>', '');
    template = template.replace('<block name="content"></block>', '<div id="app"></div>');

    fs.writeFileSync(path.join(buildDir, 'index.html'), template);
};

main();
