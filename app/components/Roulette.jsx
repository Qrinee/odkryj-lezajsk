"use client";

import RouletteSpinner from "./roulette/RouletteSpinner";
import WinnerPresentation from "./roulette/WinnerPresentation";
import UnlockCelebration from "./roulette/UnlockCelebration";

export default function Roulette(props) {
  return (
    <>
      <RouletteSpinner {...props} />
      <WinnerPresentation 
        showWinner={props.showWinner} 
        winner={props.winner} 
      />
      <UnlockCelebration 
        showUnlockAnimation={props.showUnlockAnimation} 
        newlyUnlocked={props.newlyUnlocked} 
        unlockedElementsCount={props.unlockedElements.length} 
        totalElements={props.totalElements} 
      />
    </>
  );
}
