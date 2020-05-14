export const gzipTypes = 'text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml';

export const extensions = {
    assets: 'css(\\.map)?|js(\\.map)?',
    fonts: 'ttf|ttc|otf|eot|woff2?',
    svg: 'svgz?',
    images: 'jpe?g|png|gif|ico|cur|heic|webp|tiff?',
    audio: 'mp3|m4a|aac|ogg|midi?|wav',
    video: 'mp4|mov|webm|mpe?g|avi|ogv|flv|wmv',
    docs: 'pdf|' +
        'docx?|dotx?|docm|dotm|' +
        'xlsx?|xltx?|xlsm|xltm|' +
        'pptx?|potx?|pptm|potm|ppsx?',
};
