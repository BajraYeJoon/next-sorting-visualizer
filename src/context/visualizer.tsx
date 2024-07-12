"use client";

import { generateRandomNumber, MAX_ANIMATION_SPEED } from "@/lib/constant";
import { AnimationArrayType, SortingAlgorithmType } from "@/lib/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  setArrayToSort: (array: number[]) => void;
  selectedAlgorithm: SortingAlgorithmType;
  setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isComplete: boolean) => void;
  resetArrayAndAnimation: () => void;
  startAnimation: (animation: AnimationArrayType) => void;
  requireReset: boolean;
}

const SortingAlgorithmContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

export const SortingAlgorithmProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithmType>("bubble");

  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  const requireReset = isAnimationComplete || isSorting;

  useEffect(() => {
    resetArrayAndAnimation();

    window.addEventListener("resize", resetArrayAndAnimation);

    return () => {
      window.removeEventListener("resize", resetArrayAndAnimation);
    };
  }, []);

  //to reset the array
  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");

    if (!contentContainer) return;

    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = [];
    const numberofBars = Math.floor(contentContainerWidth / 8);
    const contentContainerHeight = window.innerHeight;
    const maxBarHeight = Math.max(contentContainerHeight - 400, 100);

    //to populate the array
    for (let bar = 0; bar < numberofBars; bar++) {
      tempArray.push(generateRandomNumber(35, maxBarHeight));
    }

    setArrayToSort(tempArray);
    setIsAnimationComplete(false);
    setIsSorting(false);

    //to reset the aarray in mid way
    const resetHighestBar = window.setTimeout(() => {
      for (let i = resetHighestBar; i >= 0; i--) {
        window.clearTimeout(i);
      }
    }, 0);

    setTimeout(() => {
      const arrayOfLines = document.getElementsByClassName(
        "array-line"
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < arrayOfLines.length; i++) {
        arrayOfLines[i].classList.remove("bg-green-500");
        arrayOfLines[i].classList.add("bg-purple-500");
      }
    }, 0);
  };

  //to start the sorting
  const startAnimation = (animation: AnimationArrayType) => {
    setIsSorting(true);

    const inverseSpeed = (1 / animationSpeed) * 200;
    const arrayOfLines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (
      indexes: number[],
      toAddClassname: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        arrayOfLines[index].classList.add(toAddClassname);
        arrayOfLines[index].classList.remove(removeClassName);
      });
    };

    animation.forEach(([values, isSwapping], index) => {
      setTimeout(() => {
        if (!isSwapping) {
          updateClassList(values, "bg-green-500", "bg-purple-500");
          setTimeout(() => {
            updateClassList(values, "bg-purple-500", "bg-green-500");
          }, inverseSpeed);
        } else {
          const [lineIndex, newHeight] = values;
          arrayOfLines[lineIndex].style.height = `${newHeight}px`;
        }
      }, index * inverseSpeed);
    });

    const finalAnimation = animation.length * inverseSpeed;
    setTimeout(() => {
      Array.from(arrayOfLines).forEach((line) => {
        line.classList.add("animate-pulse", "bg-green-500");
        line.classList.remove("bg-purple-500");
      });

      setTimeout(() => {
        Array.from(arrayOfLines).forEach((line) => {
          line.classList.remove("animate-pulse", "bg-green-500");
          line.classList.add("bg-purple-500");
        });
        setIsSorting(false);
        setIsAnimationComplete(true);
      }, 1000);
    }, finalAnimation);
  };

  const value = {
    arrayToSort,
    setArrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    resetArrayAndAnimation,
    startAnimation,
    requireReset,
  };
  return (
    <SortingAlgorithmContext.Provider value={value}>
      {children}
    </SortingAlgorithmContext.Provider>
  );
};

export const useSortingAlgorithmContext = () => {
  const context = useContext(SortingAlgorithmContext);
  if (!context) {
    throw new Error(
      "useSortingAlgorithmContext must be used within SortingAlgorithmProvider"
    );
  }
  return context;
};
