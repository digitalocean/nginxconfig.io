import toConf from './to_conf';
import nginxConf from './conf/nginx.conf';

// Convert the data to nginx conf and do some magic to comments
const toConfig = entriesOrObject => toConf(entriesOrObject)
    .replace(/^([^\S\r\n]*[^#\s].*[^\n])\n([^\S\r\n]*)#/gm, '$1\n\n$2#') // Double linebreak before comment
    .replace(/^([^\S\r\n]*#.*\n[^\S\r\n]*#.*\n)([^\S\r\n]*[^#\s])/gm, '$1\n$2'); // Double linebreak after double comment

export default (domains, global) => {
    const files = [];
    files.push(['nginx.conf', toConfig(nginxConf(domains, global))]);
    return files;
};
