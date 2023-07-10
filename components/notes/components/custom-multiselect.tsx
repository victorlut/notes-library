import { useEffect, useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { ChevronDown, X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  noteIdAtom,
  notesAtom,
  propertiesOfTagsAtom,
  tagsAtom,
} from "../providers"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function CustomMultiSelect(props: any) {
  // Property Name ( like algorithms and level, etc... )
  const { property, index } = props
  const tags = useAtomValue(tagsAtom)
  const tag = tags.names[index]

  // Note Id
  const noteId = useAtomValue(noteIdAtom)

  // Notes
  const [notes, setNotes] = useAtom(notesAtom)

  const properties = useAtomValue(propertiesOfTagsAtom)

  const [selectCheck, setSelectCheck] = useState<Checked[]>(
    notes[noteId || 0].tags[property]
  )

  useEffect(() => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes]
      updatedNotes[noteId || 0] = {
        ...updatedNotes[noteId || 0],
        tags: {
          ...updatedNotes[noteId || 0].tags,
          [property]: selectCheck,
        },
      }
      return updatedNotes
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCheck])

  const handleSelectCheck = (index: number) => {
    setSelectCheck((prevState) => {
      const updatedSelectCheck = [...prevState]
      updatedSelectCheck[index] = !prevState[index]
      return updatedSelectCheck
    })
  }
  return (
    <div className="mb-[3px] flex items-center">
      <DropdownMenu>
        <div className="mr-2.5 w-20 text-base lg:w-36">{tag}</div>
        <DropdownMenuTrigger asChild>
          <div className="relative flex min-h-[32px] flex-1 border border-dashed px-2 py-1 data-[state=open]:border data-[state=open]:border-blue-300">
            {Array.isArray(properties[property]) ? (
              (properties[property] as string[]).map(
                (p: string, index: number) => {
                  if (selectCheck[index] === false) {
                    return
                  }
                  return (
                    <div
                      key={property + p}
                      className="mx-0.5 flex w-max items-center rounded-md bg-gray-100 p-1 text-xs"
                      onClick={(e) => {
                        alert("Delete")
                        e.stopPropagation()
                        handleSelectCheck(index)
                      }}
                    >
                      {p}
                      <X className="ml-1 h-3 w-3 text-gray-700" />
                    </div>
                  )
                }
              )
            ) : (
              <></> // or any other fallback UI if needed
            )}
            <ChevronDown className="absolute bottom-1/2 right-2 h-4 w-4 translate-y-1/2 text-slate-400" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          {Array.isArray(properties[property]) ? (
            (properties[property] as string[]).map(
              (p: string, index: number) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={p}
                    checked={selectCheck[index]}
                    onCheckedChange={() => handleSelectCheck(index)}
                  >
                    {p}
                  </DropdownMenuCheckboxItem>
                )
              }
            )
          ) : (
            <></> // or any other fallback UI if needed
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
