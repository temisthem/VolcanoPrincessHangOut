export const getCharactersAsString = (): Character[] => {
    return filterEnum((Object.values(Character) as Character[]));
}

export const getAreasAsString = (): Area[] => {
    return filterEnum((Object.values(Area) as Area[]));
}

export const filterEnum = (arr: any[]) => {
    return arr.filter((area) => isNaN(Number(area)) && area.toString() !== "None");
}

export enum Character {
    None,
    Benson,
    Claude,
    Craig,
    Gwyneth,
    Hackett,
    Kenneth,
    Lebsa,
    Lon,
    Mona,
    Nina,
    Ze,
    Basilou,
    Claire,
    Connie,
    Derrick,
    Jermaine,
    Mark,
    Mary,
    Rebecca
}

export enum Area {
    None,
    Olaf_Theatre = "Olaf Theatre",
    Altar_Library = "Altar Library",
    Ancient_Colosseum = "Ancient Colosseum",
    Royal_Greenhouse = "Royal Greenhouse",
}