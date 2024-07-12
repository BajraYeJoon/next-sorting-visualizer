"use client";

import { generateRandomNumber, MAX_ANIMATION_SPEED } from "@/lib/constant";
import { SortingAlgorithmType } from "@/lib/types";
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
  startAnimaiton: () => void;
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
  };

  //to start the sorting
  const startAnimaiton = () => {};

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
    startAnimaiton,
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
