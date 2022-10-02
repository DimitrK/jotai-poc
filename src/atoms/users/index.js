import { atom } from "jotai";
import { useAtomCollection } from "../../hooks";
import { userSelector } from "../../selectors";

export const usersAtom = atom([]);
export const useUsersCollection = () =>
  useAtomCollection(usersAtom, { selector: userSelector });
