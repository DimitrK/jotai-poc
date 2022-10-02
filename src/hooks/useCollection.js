import { atom, useAtom, useSetAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
const defaultSelector = (i) => i;

export const useAtomCollection = (_atom, { selector = defaultSelector }) => {
  useEffect(() => {
    console.log("_atom changed");
  }, [_atom]);
  const readOnlyAtom = useMemo(
    () =>
      atom((get) => {
        console.log("GETreadOnlyAtom");
        return get(_atom);
      }),
    [_atom]
  );

  // Write functions
  const removeItemAtom = useMemo(
    () =>
      atom(null, (get, set, itemOrSelection) => {
        console.log("SETremoveItemAtom");
        set(
          _atom,
          get(_atom).filter(
            (item) =>
              selector(item) !== itemOrSelection &&
              selector(item) !== selector(itemOrSelection)
          )
        );
      }),
    [_atom]
  );

  const addItemAtom = useMemo(
    () =>
      atom(null, (get, set, item) => {
        console.log("SETaddItemAtom");
        set(_atom, [...get(_atom), item]);
      }),
    [_atom]
  );

  const emptyItemAtom = useMemo(
    () =>
      atom(null, (get, set) => {
        set(_atom, []);
      }),
    [_atom]
  );

  // Read function
  const countItemsAtom = useMemo(
    () =>
      atom((get) => {
        console.log("GETcountItemsAtom");
        return () => get(_atom).length;
      }),
    [_atom]
  );

  const actionsAtom = useMemo(() => atom({}), [_atom]);

  const useAtomCollectionActions = useMemo(
    () => (_atom) => {
      const [actions, setActions] = useAtom(actionsAtom);
      const removeItem = useSetAtom(removeItemAtom);
      const addItem = useSetAtom(addItemAtom);
      const countItems = useAtomValue(countItemsAtom);
      const emptyItems = useSetAtom(emptyItemAtom);

      useEffect(() => {
        console.log("setting actions", actions);
        setActions({
          removeItem,
          addItem,
          count: countItems,
          empty: emptyItems,
        });
        return () => {
          console.log("unmounting actions");
        };
      }, [_atom, setActions]);

      return actions;
    },
    [_atom]
  );

  const useValue = useMemo(
    () => (_atom) => {
      return useAtomValue(_atom);
    },
    [_atom]
  );

  return [useValue(readOnlyAtom), useAtomCollectionActions(readOnlyAtom)];
};
