import { convertToBase } from "./FP";

export const dayToHour = convertToBase(24);
export const hourToHour = convertToBase(1);
export const minuteToHour = convertToBase(1 / 60);
export const secondToHour = convertToBase(1 / (60 * 60));

export function timeUnitsConvertor(convertor: string) {
    switch (convertor) {
        case "day": return dayToHour;
        case "hour": return hourToHour;
        case "minute": return minuteToHour;
        case "second": return secondToHour;
        default: return null;
    }
}
