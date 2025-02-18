import Hangout from '@/Hangout/Hangout.tsx';
import { useState } from 'react';

const App = () => {
const [showNames, setShowNames] = useState(false)

  return (
    <div className={"bg-[url('/Background.png')]"}>
      <div
        className={
          'mx-auto h-full min-h-screen max-w-[1280px] bg-amber-50 bg-opacity-85 p-5'
        }
      >
        <button className={"w-fit"} onClick={() => setShowNames(!showNames)}>test</button>
        <Hangout showName={showNames}></Hangout>
      </div>
    </div>
  );
};

export default App;
