import browserLanguage from '../src/nginxconfig/util/browser_language';

let languages = [];

Object.defineProperty(window.navigator,'languages',{get:function(){
    return languages;
}});

Object.defineProperty(window.navigator,'language',{get:function(){
        return languages[0];
}});

const setNavigatorLanguges = lang => { languages = lang; };

// eslint-disable-next-line no-global-assign
Intl = undefined;

describe('#testGetBrowserLanguage', function() {
    test('#inChina', function() {
        setNavigatorLanguges(['zh-CN', 'zh', 'en-US', 'en']);
        expect(browserLanguage()).toEqual('zhCN');
    });

    test('#inHongKong',function (){
        setNavigatorLanguges(['zh-TW','zh','en-US','en']);
        expect(browserLanguage()).toEqual('zhTW');
    });

    test('#inJapan',function(){
        setNavigatorLanguges(['ja-JP','ja']);
        expect(browserLanguage()).toBeFalsy();
    });
});
