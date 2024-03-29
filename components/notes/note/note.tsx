import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useAtom } from "jotai"
import { Trash } from "lucide-react"

import { Input } from "../components/ui/input"
import { notesAtom } from "../providers"
import { NoteTags } from "./note-tags"

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface TagsType {
  [key: string]: any | Checked[]
}

interface NoteType {
  id: number | string
  title: string
  tags: TagsType
  view: string
  dateCreatedAt: string
}

export function Note({
  note,
  onDelete,
}: {
  note: NoteType
  onDelete: () => void
}) {
  const [notes, setNotes] = useAtom(notesAtom)
  const [dateCreatedAt, setDateCreatedAt] = useState<string>(note.dateCreatedAt)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDelete = (event: any) => {
    event.stopPropagation()
    onDelete()
  }

  const dateChange = (e: any) => {
    let index: number = 0
    for (let i = 0; i < notes.length; i++) {
      if (note.id === notes[i].id) {
        index = i
        break
      }
    }

    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes]
      updatedNotes[index].dateCreatedAt = e.target.value
      return updatedNotes
    })

    setDateCreatedAt(e.target.value)
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} aria-describedby="">
      <div className="relative min-h-[39px] select-none border-b border-gray-300">
        <div
          className="flex flex-wrap items-center gap-4 break-all py-2 pl-4 pr-8"
          {...listeners}
        >
          <div className="mr-auto text-sm">{note.title}</div>

          <NoteTags note={note} />

          <div className="px-5 text-sm">
            <Input type="date" value={dateCreatedAt} onChange={dateChange} />
          </div>
        </div>
        <Trash
          className="absolute right-2 top-[20px] h-4 w-4 cursor-pointer select-none"
          onClick={(e) => handleDelete(e)}
        />
      </div>
    </div>
  )
}
