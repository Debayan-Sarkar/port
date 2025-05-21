"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(color)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(color)
  }, [color])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setInputValue(newColor)
    onChange(newColor)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Check if it's a valid hex color
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      onChange(value)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: color }} />
          <div className="flex-1">
            <Input value={inputValue} onChange={handleInputChange} className="h-8" onClick={() => setIsOpen(true)} />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-3">
          <div>
            <Input
              type="color"
              value={color}
              onChange={handleColorChange}
              ref={inputRef}
              className="w-full h-32 p-1 cursor-pointer"
            />
          </div>
          <div>
            <Input value={inputValue} onChange={handleInputChange} placeholder="#000000" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
