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

import isChanged from './is_changed';

export default (defaults, cat, isInteraction = true) => {
    return Object.keys(defaults).reduce((prev, key) => {
        prev[key] = {
            get() {
                return this.$props.data[key].value;
            },
            set (value) {
                // Save user interaction if value changed
                if (isInteraction
                    && this.$parent
                    && 'data' in this.$parent.$props
                    && 'hasUserInteraction' in this.$parent.$props.data
                    && !this.$parent.$props.data.hasUserInteraction
                    && this.$props.data[key].value !== value)
                        this.$parent.$props.data.hasUserInteraction = true;

                this.$props.data[key].value = value;
                this.$props.data[key].computed = value;
            },
        };
        prev[key + 'Default'] = {
            get() {
                return this.$props.data[key].default;
            },
        };
        prev[key + 'Enabled'] = {
            get() {
                return this.$props.data[key].enabled;
            },
        };
        prev[key + 'Changed'] = {
            get() {
                return isChanged(this.$props.data[key], cat, key);
            },
        };
        return prev;
    }, {});
};
