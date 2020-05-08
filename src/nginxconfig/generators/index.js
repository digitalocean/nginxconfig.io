import ConfigParser from '@webantic/nginx-config-parser';
const parser = new ConfigParser();

import { nginxFormat } from 'nginx-format';

import nginxConf from './nginx.conf';

const toConf = obj => {
    // Convert the obj to nginx
    const rawConf = nginxFormat(parser.toConf(obj));

    const commentConf = rawConf
        .replace(/((?:^|\n)(?:[^\S\r\n]*)#.+);($|\n)/g, '$1$2') // Remove semis on comments
        .replace(/((?:^|\n)[^\S\r\n]*[^#\s].*[^\n])\n([^\S\r\n]*)#/g, '$1\n$2\n$2#') // Double linebreak before comment
        .replace(/((?:^|\n)[^\S\r\n]*#.*\n[^\S\r\n]*#.*\n)([^\S\r\n]*)([^#\s])/g, '$1\n$2$3'); // Double linebreak after double comment

    return commentConf;
}

export default (domains, global) => {
    const files = {};

    files['nginx.conf'] = toConf(nginxConf(domains, global));

    return files;
}
