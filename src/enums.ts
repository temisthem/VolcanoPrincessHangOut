export const getEnumKeyAsString = <T extends Record<string, string | number>>(enumObj: T, enumVal: T[keyof T]): string | undefined => {
  return Object.entries(enumObj).find(([_, value]) => value === enumVal)?.[0];
};

export const getEnumValuesAsString = <T extends Record<string, string | number>>(
  enumObj: T
): T[keyof T][] => {
  return filterEnum(Object.values(enumObj)) as T[keyof T][];
};

export const filterEnum = (arr: any[]) => {
  return arr.filter((val) => isNaN(Number(val)) && val.toString() !== "None");
};

export enum ScreenState {
  Hangout,
  Banquet
}