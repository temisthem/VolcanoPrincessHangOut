import Hangout from '@/Hangout/Hangout.tsx';
import { useState } from 'react';
import { ScreenState } from '@/enums.ts';
import Banquet from '@/Banquet/Banquet.tsx';

const App = () => {
  const [showNames, setShowNames] = useState(false);
  const [screenState, setScreenState] = useState(ScreenState.Banquet);

  const switchScreenState = () => {
    setScreenState(
      screenState === ScreenState.Hangout
        ? ScreenState.Banquet
        : ScreenState.Hangout
    );
  };

  const getScreenStateSwitchText = () => {
    return screenState === ScreenState.Hangout ? 'Banquet' : 'Hangout';
  };

  const getShowHideNamesText = () => {
    return showNames ? "Hide Names" : "Show Names"
  }

  return (
    <div className={"bg-[url('/Background.png')]"}>
      <div
        className={
          'mx-auto flex h-full min-h-screen max-w-[1280px] flex-col bg-amber-50 bg-opacity-85 p-5'
        }
      >
        <div className={'mb-4 ml-auto flex'}>
          <button
            className={'mr-2 w-fit rounded-md bg-amber-400 px-2 py-1'}
            onClick={() => setShowNames(!showNames)}
          >
            {getShowHideNamesText()}
          </button>
          <button
            className={'w-fit rounded-md bg-amber-400 px-2 py-1'}
            onClick={() => switchScreenState()}
          >
            {getScreenStateSwitchText()}
          </button>
        </div>
        {screenState === ScreenState.Hangout && <Hangout showName={showNames}></Hangout>}
        {screenState === ScreenState.Banquet && <Banquet showName={showNames}></Banquet>}
      </div>
    </div>
  );
};

export default App;
