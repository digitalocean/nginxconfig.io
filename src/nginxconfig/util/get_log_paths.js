export const getAccessLogDomainPath = (domain, global) => {
    return global.logging.accessLog.computed.replace(/([^/]+)\.log$/, `${domain.server.domain.computed}.$1.log`);
};

export const getErrorLogDomainPath = (domain, global) => {
    return global.logging.errorLog.computed.replace(/([^/]+)\.log (.+)$/, `${domain.server.domain.computed}.$1.log $2`);
};
