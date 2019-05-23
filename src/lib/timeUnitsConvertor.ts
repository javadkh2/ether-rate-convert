import { convertToBase } from "./utils";

// collection on conversion function that convert time units to hour
export const dayToHour = convertToBase(24);
export const hourToHour = convertToBase(1);
export const minuteToHour = convertToBase(1 / 60);
export const secondToHour = convertToBase(1 / (60 * 60));

// check a time unit name and return the convertor function
export function timeUnitsConvertor(convertor: string) {
    switch (convertor) {
        case "day": return dayToHour;
        case "hour": return hourToHour;
        case "minute": return minuteToHour;
        case "second": return secondToHour;
        default: return null;
    }
}
