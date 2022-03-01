<!--
Copyright 2022 DigitalOcean

This code is licensed under the MIT License.
You may obtain a copy of the License at
https://github.com/digitalocean/nginxconfig.io/blob/master/LICENSE or https://mit-license.org/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions :

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
-->

<script>
    import PrettyInput from 'pretty-checkbox-vue/src/PrettyInput';

    // Vue 3 fix: Remove top-level model as it's unused
    Reflect.deleteProperty(PrettyInput, 'model');

    // Vue 3 fix: Patch in an empty vnode object as it doesn't exist
    PrettyInput.mounted = (original => function (...args) {
        return original.apply(new Proxy(this, {
            get: (target, key) => key === '$vnode'
                ? {}
                : Reflect.get(target, key),
        }), args);
    })(PrettyInput.mounted);

    // Vue 3 fix: Patch in firing update:modelValue event on input change
    PrettyInput.methods.updateInput = (original => function (...args) {
        return original.apply(new Proxy(this, {
            get: (target, key) => key === '$emit'
                ? function (event, ...eventArgs) {
                    return Reflect.get(target, key).apply(this, [event === 'change'
                        ? 'update:modelValue'
                        : event].concat(eventArgs));
                }
                : Reflect.get(target, key),
        }), args);
    })(PrettyInput.methods.updateInput);

    export default PrettyInput;
</script>
