export const getCharactersAsString = (start?: number, end?: number): Character[] => {
    const characters= filterEnum((Object.values(Character) as Character[]));

    if (start !== undefined)
        return characters.slice(start, end);

    return characters;
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
    Olaf_Theatre,
    Altar_Library,
    Ancient_Colosseum,
    Royal_Greenhouse
}