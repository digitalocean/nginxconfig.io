import browserLanguage from '../src/nginxconfig/util/browser_language';

class MockLocales{
    static languages = [];

    static language = null;

    static IntlBackup = null;

    static navigator = null;

    static setNavigatorLanguages(langs){
        MockLocales.languages = langs;
        return this;
    }

    static setNavigatorLanguage(lang){
        MockLocales.language = lang;
        return this;
    }

    static setDateTimeLocale(locale) {
        const newDateTimeForMat = new Intl.DateTimeFormat(locale);
        MockLocales.IntlBackup = Intl;
        if (!locale){
            // eslint-disable-next-line no-global-assign
            Intl = undefined;
            return this;
        }

        // eslint-disable-next-line no-global-assign
        Intl = {
            DateTimeFormat(){
                return newDateTimeForMat;
            },
        };
        return this;
    }

    static restoreDateTimeLocale(){
        // eslint-disable-next-line no-global-assign
        Intl = MockLocales.IntlBackup;
        MockLocales.IntlBackup = null;
        return this;
    }

    static setNavigator(navigator)
    {
        MockLocales.navigator = window.navigator;
        window.navigator = navigator;
        return this;
    }

    static restoreNavigator(){
        window.navigator = MockLocales.navigator;
        MockLocales.navigator = null;
        return this;
    }
}
Object.defineProperty(window.navigator,'languages',{get:() => {
        return MockLocales.languages ?? [];
    }});

Object.defineProperty(window.navigator,'language',{get:() => {
        return MockLocales.language ?? null;
    }});


describe('#browserLanguage', ()=> {
    test('#Selects the first available exact match for language/region', ()=> {
        MockLocales.setDateTimeLocale(undefined);

        MockLocales.setNavigatorLanguages(['zh-CN', 'zh','en-US','en']);
        expect(browserLanguage()).toEqual('zhCN');

        MockLocales.setNavigatorLanguages(['zh-TW','zh','en-US','en']);
        expect(browserLanguage()).toEqual('zhTW');

        MockLocales.setNavigatorLanguages(['ja-JP','ja']);
        expect(browserLanguage()).toBeFalsy();

        MockLocales.setNavigatorLanguages(['zh', 'en-US', 'en']);
        expect(browserLanguage()).toEqual('en');

        MockLocales.restoreDateTimeLocale();
    });

    test('#Selects the first available language match based on language/region',()=> {
        MockLocales.setDateTimeLocale(undefined);

        MockLocales.setNavigatorLanguages(['ja-JP', 'ja', 'en-US']);
        expect(browserLanguage()).toEqual('en');

        MockLocales.restoreDateTimeLocale();
    });

    test('# Selects the first available language match based on language alone',()=>{
        MockLocales.setDateTimeLocale(undefined);

        MockLocales.setNavigatorLanguages(['ja-JP', 'ja', 'zh']);
        expect(browserLanguage()).toEqual('zhCN');

        MockLocales.restoreDateTimeLocale();
    });
});

describe('#test different sources',()=>{
    test('#navigator and locale is undefined',()=>{
        MockLocales.setNavigatorLanguages(undefined);
        MockLocales.setNavigatorLanguage(undefined);
        MockLocales.setDateTimeLocale(undefined);
        expect(browserLanguage()).toBeFalsy();
        MockLocales.restoreDateTimeLocale();
    });

    test('#language as en and languages is undefined',()=>{
        MockLocales.setNavigatorLanguage('en');
        MockLocales.setNavigatorLanguages(undefined);
        MockLocales.setDateTimeLocale(undefined);
        expect(browserLanguage()).toEqual('en');
        MockLocales.restoreDateTimeLocale();
    });

    test('#language is undefined and languages is en-US,en and Intl is undefined',()=>{
        MockLocales.setNavigatorLanguage(undefined);
        MockLocales.setNavigatorLanguages(['en-US','en']);
        MockLocales.setDateTimeLocale(undefined);
        expect(browserLanguage()).toEqual('en');
        MockLocales.restoreDateTimeLocale();
    });

    test('#navigator is undefined and locale is en-US',()=>{
        MockLocales.setNavigator(undefined);
        MockLocales.setDateTimeLocale('en-US');
        expect(browserLanguage()).toEqual('en');
        MockLocales.restoreDateTimeLocale();
        MockLocales.restoreNavigator();
    });
});
