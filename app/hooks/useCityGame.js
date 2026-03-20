import { useState, useRef } from "react";

export function useCityGame(cityElements) {
  const [inputCode, setInputCode] = useState("");
  const [unlockedElements, setUnlockedElements] = useState([]);
  const [error, setError] = useState("");
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);

  const [showRoulette, setShowRoulette] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);
  const [elementToUnlock, setElementToUnlock] = useState(null);
  const [autoOpenElement, setAutoOpenElement] = useState(null);
   
  const cityRef = useRef(null);

  const handleUnlockComplete = (element) => {
    if (cityRef.current) {
      cityRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setAutoOpenElement(element);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const normalizedInput = inputCode.trim().toUpperCase();
    
    if (unlockedElements.includes(normalizedInput)) {
      setError("Ten kod został już wykorzystany!");
      return;
    }

    const matchedElement = cityElements.find(
      (el) => el.code === normalizedInput
    );

    if (matchedElement) {
      setElementToUnlock(matchedElement);
      setShowRoulette(true);
    } else {
      setError("Nieprawidłowy kod! Spróbuj ponownie.");
    }
  };

  const isUnlocked = (code) => unlockedElements.includes(code);

  const handleElementClick = (code) => {
    setInputCode(code);
  };

  return {
    cityRef,
    inputCode,
    setInputCode,
    unlockedElements,
    setUnlockedElements,
    error,
    showUnlockAnimation,
    setShowUnlockAnimation,
    newlyUnlocked,
    setNewlyUnlocked,
    showRoulette,
    setShowRoulette,
    isSpinning,
    setIsSpinning,
    winner,
    setWinner,
    showWinner,
    setShowWinner,
    elementToUnlock,
    autoOpenElement,
    handleSubmit,
    isUnlocked,
    handleElementClick,
    handleUnlockComplete
  };
}
