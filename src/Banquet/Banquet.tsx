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
          className={'xl:[6%] mx-[0.25%] mb-[1%] w-[20%] sm:w-[12%] md:w-[16%]'}
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
      <div className={'mx-1 mb-2 w-[45%] sm:w-[22%]'} key={area.toString()}>
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
    // @ts-ignore
    const okayOptions: Topic[] = data[selectedArea][selectedCharacter]['Okay'];

    return (
      <div className={'grid grid-cols-2 mx-10'}>
        <div className={'col-span-1'}>
          <p className={"font-bold w-fit mx-auto"}>Great</p>
          {greatOptions.map((option) => (
              <div className={"flex items-center justify-center"}>
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
        </div>
        <div className={'col-span-1'}>
          <p className={"font-bold w-fit mx-auto"}>Okay</p>
          {okayOptions.map((option) => (
              <div className={"flex items-center justify-center"}>
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
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={'mx-auto flex justify-around'}>{renderAreas()}</div>
      {selectedArea !== Area.None && (
        <div className={'mx-4 mt-4 flex justify-around'}>
          {renderCharacters()}
        </div>
      )}

      {isSelectionReady ? (
        <div>{renderOptions()}</div>
      ) : (
        <p className={'mx-auto mt-6 w-fit text-xl font-bold'}>
          Select a character and location to start!
        </p>
      )}
    </>
  );
};

export default Banquet;
