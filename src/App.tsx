import Hangout from '@/Hangout/Hangout.tsx';
import { useState } from 'react';
import { ScreenState } from '@/enums.ts';
import Banquet from '@/Banquet/Banquet.tsx';

const App = () => {
  const getSavedScreenState = () => {
    const savedState = localStorage.getItem('screenState');
    if (savedState === null) return ScreenState.Hangout;

    const parsedValue = Number(savedState);

    return parsedValue in ScreenState
      ? (parsedValue as ScreenState)
      : ScreenState.Hangout;
  };

  const getSavedNameState = () => {
    const savedState = localStorage.getItem('nameState');
    if (savedState === null) return false;

    return savedState === "true";
  };


  const [screenState, setScreenState] = useState<ScreenState>(getSavedScreenState());
  const [showNames, setShowNames] = useState(getSavedNameState());

  const onSwitchScreenState = () => {
    const nextState =
      screenState === ScreenState.Hangout
        ? ScreenState.Banquet
        : ScreenState.Hangout;

    localStorage.setItem('screenState', nextState.toString());
    setScreenState(nextState);
  };

  const onSwitchNameDisplay = () => {
    const nextState = !showNames

    localStorage.setItem('nameState', nextState.toString());
    setShowNames(nextState);
  }

  const getScreenStateSwitchText = () => {
    return screenState === ScreenState.Hangout ? 'Banquet' : 'Hangout';
  };

  const getShowHideNamesText = () => {
    return showNames ? 'Hide Names' : 'Show Names';
  };

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
            onClick={() => onSwitchNameDisplay()}
          >
            {getShowHideNamesText()}
          </button>
          <button
            className={'w-fit rounded-md bg-amber-400 px-2 py-1'}
            onClick={() => onSwitchScreenState()}
          >
            {getScreenStateSwitchText()}
          </button>
        </div>
        {screenState === ScreenState.Hangout && (
          <Hangout showName={showNames}></Hangout>
        )}
        {screenState === ScreenState.Banquet && (
          <Banquet showName={showNames}></Banquet>
        )}
        <p className={"ml-auto mt-auto pt-8 text-sm"}>Visual assets & information courtesy of <a className={"text-blue-700"} href={"https://volcanoprincess.miraheze.org/"}>https://volcanoprincess.miraheze.org/</a></p>
      </div>
    </div>
  );
};

export default App;
