import { useState } from 'react';
import data from './hangoutData.json';
import {
  Area,
  Character,
} from '@/Hangout/enums.ts';
import { publicDir } from '@/helpers.ts';
import { getEnumValuesAsString } from '@/enums.ts';

const Hangout =  ({ showName }: { showName: boolean }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(Character.None);
  const [selectedArea, setSelectedArea] = useState(Area.None);

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

  const isSelectionReady =
    selectedCharacter !== Character.None && selectedArea !== Area.None;

  const renderCharacters = () => {
    return getEnumValuesAsString(Character).map((character) => (
    // return getCharactersAsString().map((character) => (
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
            src={`${publicDir}Hangout/Icon_${character}.png`}
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
            src={`${publicDir}Hangout/Date_${area}.png`}
            alt={area.toString()}
          />
        </button>
        {showName && <p className={'mx-auto w-fit text-[14px] md:text-base'}>{area.toString()}</p>}
      </div>
    ));
  };

  const renderOptions = () => {
    if (selectedCharacter == Character.None || selectedArea == Area.None)
      return;

    // @ts-ignore
    return data[selectedCharacter][selectedArea]['Interested'].map(
      (choice: string) => (
        <div className={'relative w-fit'}>
          <img
            src={`${publicDir}Hangout/DateBorder.png`}
            alt={choice}
            key={choice}
          ></img>
          <p
            className={
              'absolute left-1/2 top-1/2 w-full translate-x-[-50%] translate-y-[-50%] px-5 text-[9px] text-white xs:text-sm'
            }
          >
            {choice}
          </p>
        </div>
      ),
    );
  };

  const renderQuestions = () => {
    if (selectedCharacter == Character.None || selectedArea == Area.None)
      return;

    // @ts-ignore
    return Object.entries(data[selectedCharacter]['Q&A']).map(
      ([question, answers]: [string, any], index) => (
        <div key={question} className="grid grid-cols-5 justify-between">
          <div
            className={`${
              index === 0 ? 'border-t-2' : 'border-t-0'
            } col-span-3 border-2 border-amber-900 p-1 text-[12px] xs:text-[14px] md:text-base`}
          >
            {question}
          </div>
          <div
            className={`${
              index === 0 ? 'border-t-2' : 'border-t-0'
            } col-span-2 border-b-2 border-r-2 border-amber-900 p-1 text-[12px] xs:text-[14px] md:text-base`}
          >
            {answers[0]}
          </div>
        </div>
      ),
    );
  };

  return (
    <>
      <div className={'flex flex-wrap justify-center'}>
        {renderCharacters()}
      </div>

      <div className={'mt-2 flex flex-wrap justify-center'}>
        {renderAreas()}
      </div>

      {isSelectionReady ? (
        <>
          <div
            className={
              'grid grid-cols-2 gap-1 justify-self-center md:mt-2 md:grid-cols-3 lg:grid-cols-4'
            }
          >
            {renderOptions()}
          </div>
          <div className="mt-3 grid grid-cols-5 justify-between">
            <p className={"col-span-3 mx-auto font-bold text-[14px] md:text-base"}>Questions</p>
            <p className={"col-span-2 mx-auto font-bold text-[14px] md:text-base"}>Answers</p>
          </div>
          <div>{renderQuestions()}</div>
        </>
      ) : (
        <p className={'mx-auto mt-6 w-fit text-xl font-bold'}>
          Select a character and location to start!
        </p>
      )}
    </>
  );
};

export default Hangout;
