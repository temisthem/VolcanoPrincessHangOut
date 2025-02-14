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
      ? 'active'
      : 'filter grayscale opacity-80 hover:grayscale-0';
  };

  const activeArea = (area: Area) => {
    return selectedArea == area
      ? 'active'
      : 'filter grayscale opacity-80 hover:grayscale-0';
  };

  const renderCharacters = (start: number, end?: number) => {
    return getCharactersAsString(start, end).map((character) => (
      <button
        className={'xl:[6%] mx-[0.25%] mb-[0.5%] w-[13%] sm:w-[9%] lg:w-[8%]'}
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
      console.log(data)

    if (selectedCharacter == Character.None || selectedArea == Area.None)
      return;

    console.log(data[selectedCharacter]);
  }

  renderOptions();

  return (
    <div>
      <div className={'mx-auto h-screen max-w-[1280px] bg-amber-50 p-5'}>
        <div className={'flex flex-wrap justify-center'}>
          {renderCharacters(0)}
        </div>

        <div className={'mt-2 flex flex-wrap justify-center'}>
          {renderAreas()}
        </div>

        {/*<div>{renderOptions()}</div>*/}
      </div>
    </div>
  );
};

export default App;
