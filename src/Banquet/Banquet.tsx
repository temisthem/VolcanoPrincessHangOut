import { useState } from 'react';
import data from './banquetData.json';
import { Area, Character, Topic } from '@/Banquet/enums.ts';
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

  const onAreaClick = (area: Area) => {
    setSelectedCharacter(Character.None);
    setSelectedArea(area);
  };

  const renderCharacters = () => {
    if (selectedArea === Area.None) return;

    const areaCharacters = data[selectedArea];

    return getEnumValuesAsString(Character)
      .filter((character) =>
        Object.keys(areaCharacters).includes(character.toString()),
      )
      .map((character) => (
        <div
          className={'w-[30%] sm:w-[16%]'}
          key={character.toString()}
        >
          <button
            type={'button'}
            onClick={() => setSelectedCharacter(character)}
          >
            <img
              className={activeCharacter(character)}
              src={`${publicDir}Banquet/Banquet_${getEnumKeyAsString(
                Character,
                character,
              )}.png`}
              alt={character.toString()}
            />
          </button>
          {showName && (
            <p className={'mx-auto mt-[-4px] w-fit text-[14px] lg:text-base'}>
              {character.toString()}
            </p>
          )}
        </div>
      ));
  };

  const renderAreas = () => {
    return getEnumValuesAsString(Area).map((area) => (
      <div className={'mx-4 mb-2 sm:[mb-0] w-[18%] sm:w-[18%]'} key={area.toString()}>
        <button type={'button'} onClick={() => onAreaClick(area)}>
          <img
            className={`${activeArea(area)}`}
            src={`${publicDir}Banquet/Banquet_${getEnumKeyAsString(
              Area,
              area,
            )}.png`}
            alt={area.toString()}
          />
        </button>
        {showName && (
          <p className={'mx-auto w-fit text-[14px] md:text-base'}>
            {area.toString()}
          </p>
        )}
      </div>
    ));
  };

  const renderOptions = () => {
    if (selectedArea === Area.None || selectedCharacter === Character.None)
      return;

    // @ts-ignore
    const greatOptions: Topic[] = data[selectedArea][selectedCharacter]['Great'];

    return (
          <>
            <p className={"font-bold w-fit mx-auto"}>Topics</p>
                 {greatOptions.map((option) => (
                    <div className={"flex items-center justify-left"} key={option}>
                      <img
                          className={"w-10 h-10 mr-1"}
                      src={`${publicDir}Banquet/Banquet_${getEnumKeyAsString(
                        Topic,
                        option,
                      )}.png`}
                      alt={option.toString()}
                    ></img>
                    <p>{option}</p>
                  </div>
                ))}
          </>
    );
  };

  return (
    <>
      <div className={'mx-auto flex justify-center'}>{renderAreas()}</div>
      {selectedArea !== Area.None && (
        <div className={'mx-4 flex flex-wrap justify-center'}>
          {renderCharacters()}
        </div>
      )}

      {isSelectionReady ? (
        <div className={"mt-4 mx-auto"}>{renderOptions()}</div>
      ) : (
        <p className={'mx-auto mt-6 w-fit text-xl font-bold'}>
          Select a character and location to start!
        </p>
      )}
    </>
  );
};

export default Banquet;
