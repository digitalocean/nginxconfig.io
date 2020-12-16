import browserLanguage from '../src/nginxconfig/util/browser_language';

class mockLocales{
    static languages = [];

    static language = null;
    IntlBackup = null;

    setNavigatorLanguages(langs){
        mockLocales.languages = langs;
        return this;
    }

    setNavigatorLanguage(lang){
        mockLocales.language = lang;
        return this;
    }

    setDateTimeLocale(locale) {
        const newDateTimeForMat = new Intl.DateTimeFormat(locale);
        this.IntlBackup = Intl;
        if (!locale){
            // eslint-disable-next-line no-global-assign
            Intl = undefined;
            return;
        }

        // eslint-disable-next-line no-global-assign
        Intl = {
            DateTimeFormat(){
                return newDateTimeForMat;
            },
        };
        return this;
    }

    restoreDateTimeLocale(){
        // eslint-disable-next-line no-global-assign
        Intl = this.IntlBackup;
        return this;
    }
}
Object.defineProperty(window.navigator,'languages',{get:() => {
    return mockLocales.languages ?? [];
}});

Object.defineProperty(window.navigator,'language',{get:() => {
    return mockLocales.language ?? null;
}});


describe('#testGetBrowserLanguage', ()=> {
    const Locale = new mockLocales();

    test('#inChina', ()=> {
        Locale.setNavigatorLanguages(['zh-CN', 'zh', 'en-US', 'en']);
        Locale.setDateTimeLocale(undefined);
        expect(browserLanguage()).toEqual('zhCN');
        Locale.restoreDateTimeLocale();
    });

    test('#inHongKong',()=> {
        Locale.setNavigatorLanguages(['zh-TW','zh','en-US','en']);
        Locale.setDateTimeLocale(undefined);
        expect(browserLanguage()).toEqual('zhTW');
        Locale.restoreDateTimeLocale();
    });

    test('#inJapan',()=> {
        Locale.setNavigatorLanguages(['ja-JP','ja']);
        Locale.setDateTimeLocale(undefined);
        expect(browserLanguage()).toBeFalsy();
        Locale.restoreDateTimeLocale();
    });
});

describe('#test different sources',()=>{
    const Locale = new mockLocales();

    test('#navigator and locale is undefined',()=>{
        Locale.setNavigatorLanguages(undefined);
        Locale.setNavigatorLanguage(undefined);
        Locale.setDateTimeLocale(undefined);
        expect(browserLanguage()).toBeFalsy();
        Locale.restoreDateTimeLocale();
    });

    test('#language as en and languages is undefined',()=>{
        Locale.setNavigatorLanguage('en');
        Locale.setNavigatorLanguages(undefined);
        Locale.setDateTimeLocale(undefined);
        expect(browserLanguage()).toEqual('en');
        Locale.restoreDateTimeLocale();
    });

    test('#language is undefined and languages is en-US,en and Intl is undefined',()=>{
        Locale.setNavigatorLanguage(undefined);
        Locale.setNavigatorLanguages(['en-US','en']);
        Locale.setDateTimeLocale(undefined);
        expect(browserLanguage()).toEqual('en');
        Locale.restoreDateTimeLocale();
    });

    test('#navigator is undefined and locale is en-US',()=>{
        const oldNavigator = window.navigator;
        window.navigator = undefined;
        Locale.setDateTimeLocale('en-US');
        expect(browserLanguage()).toEqual('en');
        Locale.restoreDateTimeLocale();
        window.navigator = oldNavigator;
    });
});
