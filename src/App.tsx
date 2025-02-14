import { useState } from 'react';
import data from './hangoutData.json';
import {
  Area,
  Character,
  getAreasAsString,
  getCharactersAsString,
} from '@/enums.ts';

const App = () => {
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

  const renderCharacters = () => {
    return getCharactersAsString().map((character) => (
      <button
        className={'xl:[6%] mx-[0.25%] mb-[0.5%] w-[18%] sm:w-[13%] md:w-[8%]'}
        type={'button'}
        key={character.toString()}
        onClick={() => setSelectedCharacter(character)}
      >
        <img
          className={activeCharacter(character)}
          src={`/images/Icon_${character}.png`}
          alt={character.toString()}
        />
      </button>
    ));
  };

  const renderAreas = () => {
    return getAreasAsString().map((area) => (
      <button
        className={'mx-1 mb-2 w-[45%] sm:w-[22%]'}
        type={'button'}
        key={area.toString()}
        onClick={() => setSelectedArea(area)}
      >
        <img
          className={`${activeArea(area)}`}
          src={`/images/Date_${area}.png`}
          alt={area.toString()}
        />
      </button>
    ));
  };

  const renderOptions = () => {
    if (selectedCharacter == Character.None || selectedArea == Area.None)
      return;

    return data[selectedCharacter][selectedArea]['Interested'].map(
      (choice: string) => (
        <div className={'relative w-fit'}>
          <img src={'/images/DateBorder.png'} alt={choice} key={choice}></img>
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

    return Object.entries(data[selectedCharacter]['Q&A']).map(
      ([question, answers], index) => (
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
    <div className={"bg-[url('/images/Background.png')]"}>
      <div
        className={
          'mx-auto h-full min-h-screen max-w-[1280px] bg-amber-50 bg-opacity-85 p-5'
        }
      >
        <div className={'flex flex-wrap justify-center'}>
          {renderCharacters()}
        </div>

        <div className={'mt-2 flex flex-wrap justify-center'}>
          {renderAreas()}
        </div>

        <div
          className={
            'grid grid-cols-2 gap-1 justify-self-center md:mt-2 md:grid-cols-3 lg:grid-cols-4'
          }
        >
          {renderOptions()}
        </div>
        <div className={'mt-2'}>{renderQuestions()}</div>
      </div>
    </div>
  );
};

export default App;
