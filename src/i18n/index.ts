import {en, km} from './lang';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import i18n from 'i18next';
import LanguageDetector, {DetectorOptions,} from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

// since we can't access constant file from here, we have to declare it here
export const i18nQuerystring = 'lng';
export const i18nKey = 'i18nextLng';

/** the translations
 (tip move them in a JSON file and import them,
 or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
 **/
const resources = {
    en: {
        translation: en,
    },
    km: {
        translation: km,
    }
};
const fallbackLng = ['en'];
export const options: DetectorOptions = {
    /** order and from where user language should be detected **/
    order: [
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
    ],

    /** keys or params to lookup language from **/
    lookupQuerystring: i18nQuerystring,
    lookupCookie: 'i18next',
    lookupLocalStorage: i18nKey,
    lookupSessionStorage: i18nKey,
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    /** cache user language on **/
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    /** optional expire and domain for set cookie **/
    cookieMinutes: 10,
    cookieDomain: 'myDomain',

    /** optional htmlTag with lang attribute, the default is:**/
    htmlTag: typeof document !== "undefined" ? document.documentElement : undefined,

    /** optional set cookie options, reference:https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie**/
    cookieOptions: {path: '/', sameSite: 'strict'},
};
i18n
    .use(LanguageDetector)
    .use(initReactI18next) /** passes i18n down to react-i18next**/
    .init({
        /** returnObjects: true,
         cleanCode: true**/
        resources,
        fallbackLng,
        debug: true,
        detection: options,
        /** lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
         you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
         if you're using a language detector, do not define the lng option**/

        interpolation: {
            escapeValue: false /** react already safes from xss**/,
        },
        react: {
            useSuspense: false,
        },
    })

// Set Day.js locale based on i18n language
dayjs.locale(i18n.language);

export default i18n;
