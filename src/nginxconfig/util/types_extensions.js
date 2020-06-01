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
