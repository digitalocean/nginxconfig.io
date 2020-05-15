export default domains => {
    return domains.every(d => d.https.hsts.computed)
        && (
            domains.every(d => d.https.hstsSubdomains.computed)
            || domains.every(d => !d.https.hstsSubdomains.computed)
        )
        && (
            domains.every(d => d.https.hstsPreload.computed)
            || domains.every(d => !d.https.hstsPreload.computed)
        );
};
