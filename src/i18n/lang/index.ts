import en from './en.json';
import km from './km.json';


type LanguageType = keyof typeof en;

const Localization = <T extends LanguageType>(
    key: T,
    prop: keyof (typeof en)[T],
): string => `${key}.${prop as string}`;
export {Localization, km, en};
