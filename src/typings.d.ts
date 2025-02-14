type InterestedOrNotInterested = string[];

interface Location {
    [key: string]: {
        Interested: InterestedOrNotInterested;
        NotInterested: InterestedOrNotInterested;
    };
}

interface QandA {
    [question: string]: string[];
}

interface CharacterData {
    [location: string]: (Location | { "Q&A": QandA })[];
}