import { atom, useSetAtom, useAtomValue } from "jotai";
import { useMemo } from "react";

const incrementalIdAtom = atom(0);

export const useIncrementalId = () => {
  const increaseIdAtom = useMemo(
    () =>
      atom(null, (get, set) => {
        console.log("increasing id from :", Number(get(incrementalIdAtom)));
        set(incrementalIdAtom, Number(get(incrementalIdAtom)) + 1);
        console.log("increasing id to :", Number(get(incrementalIdAtom)));
      }),
    []
  );

  const makeNextIdCreator = useMemo(
    () => () => {
      const id = useAtomValue(incrementalIdAtom);
      const createNextId = useSetAtom(increaseIdAtom);

      return () => {
        const currentId = id;
        createNextId();
        return currentId;
      };
    },
    []
  );

  return makeNextIdCreator();
};
