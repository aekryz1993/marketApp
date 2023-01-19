import { useEffect, useRef } from "react";

interface TObjectInArray {
  id: string;
  updatedAt: string;
  [key: string]: any;
}

function useDeepMemo(next: any, compare: (prev: any, next: any) => boolean) {
  const previousRef = useRef();
  const isEqual = compare(previousRef.current, next);
  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  }, [isEqual, next]);
  return isEqual ? previousRef.current : next;
}

const compareIdCallback = (prev: any[], next: any[]) => {
  if (prev?.length !== next?.length) return false;
  return next.every((nextItem: any) =>
    prev.find((prevItem: any) => nextItem.id === prevItem.id)
  );
};

const compareObjectIdCallback = (
  prev: { id: string; [key: string]: any } | null,
  next: { id: string; [key: string]: any } | null
) => {
  if (!prev || !next) return false;
  return prev?.id === next?.id;
};

const compareObjectProps: (
  prev: { [key: string]: any },
  next: { [key: string]: any }
) => any = (prev, next) => {
  if (
    !prev ||
    Object.keys(prev).length === 0 ||
    !next ||
    Object.keys(next).length === 0
  )
    return;
  if (Object.keys(prev).length !== Object.keys(next).length) return false;
  return Object.entries(next).every((item) => next[item[0]] === prev[item[0]]);
};

const compareDate = (prev: Date, next: Date) =>
  prev?.toString() === next?.toString();

const compareArrPrimitiveValues = (prev: any[], next: any[]) => {
  if (!prev || !next) return false;
  if (prev?.length !== next?.length) return false;
  return prev.every((elem) => next.includes(elem));
};

const compareArrayOfObjects = (
  prev: TObjectInArray[],
  next: TObjectInArray[]
) => {
  if (!Array.isArray(prev) || !Array.isArray(next)) return false;
  if (prev.length === 0 || next.length === 0) return false;

  return prev.every((prevItem) => {
    const id = prevItem.id;
    const updatedAt = prevItem.updatedAt;
    return next.every((nextItem) => {
      if (nextItem.id === id && nextItem.updatedAt === updatedAt) return true;
      else return false;
    });
  });
};

export {
  useDeepMemo,
  compareIdCallback,
  compareObjectIdCallback,
  compareObjectProps,
  compareDate,
  compareArrPrimitiveValues,
  compareArrayOfObjects,
};
