import { useState } from 'react';
import { Area, Character } from '@/Banquet/enums.ts';
import { publicDir } from '@/helpers.ts';
import { getEnumKeyAsString, getEnumValuesAsString } from '@/enums.ts';

const Banquet = ({ showName }: { showName: boolean }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(Character.None);
  const [selectedArea, setSelectedArea] = useState(Area.None);

  const isSelectionReady =
    selectedCharacter !== Character.None && selectedArea !== Area.None;

  const activeCharacter = (character: Character) => {
    return selectedCharacter == character
      ? ''
      : 'filter grayscale opacity-80 hover:grayscale-0';
  };

  const activeArea = (area: Area) => {
    return selectedArea == area
      ? ''
      : 'filter grayscale opacity-80 hover:grayscale-0';
  };

  const renderCharacters = () => {
    return getEnumValuesAsString(Character).map((character) => (
      <div
        className={'xl:[6%] mx-[0.25%] mb-[1%] w-[18%] sm:w-[13%] md:w-[8%]'}
        key={character.toString()}
      >
        <button
          type={'button'}
          onClick={() => setSelectedCharacter(character)}
        >
          <img
            className={activeCharacter(character)}
            src={`${publicDir}Banquet/Banquet_${getEnumKeyAsString(Character, character)}.png`}
            alt={character.toString()}
          />
        </button>
        {showName && <p className={'mx-auto mt-[-4px] w-fit text-[14px] lg:text-base'}>{character.toString()}</p>}
      </div>
    ));
  };

  const renderAreas = () => {
    return getEnumValuesAsString(Area).map((area) => (
      <div className={'mx-1 mb-2 w-[45%] sm:w-[22%]'}
           key={area.toString()}
      >
        <button
          type={'button'}
          onClick={() => setSelectedArea(area)}
        >
          <img
            className={`${activeArea(area)}`}
            src={`${publicDir}Banquet/Banquet_${getEnumKeyAsString(Area, area)}.png`}
            alt={area.toString()}
          />
        </button>
        {showName && <p className={'mx-auto w-fit text-[14px] md:text-base'}>{area.toString()}</p>}
      </div>
    ));
  };

  return <>
    <div className={"flex mx-auto justify-around"}>{renderAreas()}</div>
    {selectedArea !== Area.None && <div className={"flex"}>{renderCharacters()}</div>}

    {isSelectionReady ? (
      <>
        <p>Selection Done</p>
      </>
    ) : (
      <p className={'mx-auto mt-6 w-fit text-xl font-bold'}>
        Select a character and location to start!
      </p>
    )}
  </>;
};

export default Banquet;
