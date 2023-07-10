import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { atom } from "jotai";

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface TagsType {
  [key: string]: any | Checked[];
}

interface NoteType {
  id: number;
  title: string;
  tags: TagsType;
  view: string;
}

const notesAtom = atom<NoteType[]>([
  {
    id: 1, 
    title: "Two Sum",
    tags: {
      algorithms: [
        true, false, false, false, false
      ], 
      level: "Easy", 
    },
    view: "", 
  }, 
  {
    id: 2,
    title: "Coin Change",
    tags: {
      algorithms: [
        true, false, true, false, false
      ], 
      level: "Medium", 
    },
    view: "", 
  }, 
  {
    id: 3,
    title: "Partition Equal Subset Sum",
    tags: {
      algorithms: [
        false, true, false, true, true
      ], 
      level: "Hard", 
    },
    view: "", 
  }, 
  {
    id: 4,
    title: "Longest Substring Without Repeating Characters",
    tags: {
      algorithms: [
        false, true, false, true, false
      ], 
      level: "Medium", 
    },
    view: "", 
  }, 
])

export { notesAtom };
export type { NoteType };