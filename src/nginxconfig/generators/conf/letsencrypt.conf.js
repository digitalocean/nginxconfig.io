export default global => {
    const config = {};

    config['# ACME-challenge'] = '';
    config['location ^~ /.well-known/acme-challenge/'] = {
        root: global.https.letsEncryptRoot.computed.replace(/\/+$/, ''),
    };

    // Done!
    return config;
};
