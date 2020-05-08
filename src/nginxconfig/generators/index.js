import toConf from './to_conf';
import nginxConf from './nginx.conf';

const toConfig = obj => {
    // Convert the obj to nginx
    const rawConf = toConf(obj);

    // Do some magic to comments
    const commentConf = rawConf
        .replace(/^([^\S\r\n]*[^#\s].*[^\n])\n([^\S\r\n]*)#/gm, '$1\n\n$2#') // Double linebreak before comment
        .replace(/^([^\S\r\n]*#.*\n[^\S\r\n]*#.*\n)([^\S\r\n]*[^#\s])/gm, '$1\n$2') // Double linebreak after double comment

    return commentConf;
}

export default (domains, global) => {
    const files = {};

    files['nginx.conf'] = toConfig(nginxConf(domains, global));

    return files;
}
