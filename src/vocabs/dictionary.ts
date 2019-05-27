import * as vocabulary from "./vocabs.json";

// get an object and key in curry mode and return obj[key].
// this functionality is enough for simple dictionary
// but for big system may need define external dictionary service
export const dictionary = (vocabs: { [key: string]: string }) => (key: string) => vocabs[key] ? vocabs[key] : key;

// default translator use local vocabs.json file
export const translate = dictionary(vocabulary);
