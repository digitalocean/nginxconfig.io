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
