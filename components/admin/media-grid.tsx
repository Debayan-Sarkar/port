"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Trash2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MediaGridProps {
  media: any[]
  viewMode: "grid" | "list"
  onDelete: (id: string) => void
}

export function MediaGrid({ media, viewMode, onDelete }: MediaGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copied",
      description: "The file URL has been copied to your clipboard.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (viewMode === "grid") {
    return (
      <>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {media.map((file) => (
            <motion.div key={file.id} variants={item}>
              <div className="group relative bg-gray-800 rounded-md overflow-hidden border border-gray-700 hover:border-gray-600 transition-all">
                <div className="aspect-square relative">
                  <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                </div>
                <div className="p-2">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                </div>
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => handleCopyUrl(file.url)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy URL</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            setSelectedMedia(file)
                            setIsDetailsOpen(true)
                          }}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" onClick={() => onDelete(file.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          {selectedMedia && (
            <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle>File Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video relative rounded-md overflow-hidden">
                  <Image
                    src={selectedMedia.url || "/placeholder.svg"}
                    alt={selectedMedia.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Name:</span>
                    <span className="text-sm font-medium">{selectedMedia.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Type:</span>
                    <span className="text-sm font-medium capitalize">{selectedMedia.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Size:</span>
                    <span className="text-sm font-medium">{formatFileSize(selectedMedia.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Dimensions:</span>
                    <span className="text-sm font-medium">{selectedMedia.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Uploaded:</span>
                    <span className="text-sm font-medium">{formatDate(selectedMedia.uploadedAt)}</span>
                  </div>
                  <div className="pt-2">
                    <div className="text-sm text-gray-400 mb-1">URL:</div>
                    <div className="flex">
                      <input
                        type="text"
                        value={selectedMedia.url}
                        readOnly
                        className="flex-1 text-xs bg-gray-800 border-gray-700 rounded-l-md"
                      />
                      <Button className="rounded-l-none" onClick={() => handleCopyUrl(selectedMedia.url)}>
                        <Copy className="h-4 w-4 mr-2" /> Copy
                      </Button>
                    </div>
                  </div>
                  {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                    <div className="pt-2">
                      <div className="text-sm text-gray-400 mb-1">Tags:</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedia.tags.map((tag: string) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-gray-800 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </>
    )
  }

  // List view
  return (
    <>
      <motion.div className="space-y-2" variants={container} initial="hidden" animate="show">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-400 border-b border-gray-800">
          <div className="col-span-5">Name</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Uploaded</div>
          <div className="col-span-1">Actions</div>
        </div>
        {media.map((file) => (
          <motion.div
            key={file.id}
            variants={item}
            className="grid grid-cols-12 gap-4 px-4 py-3 items-center bg-gray-800 rounded-md hover:bg-gray-750 transition-colors"
          >
            <div className="col-span-5 flex items-center space-x-3">
              <div className="h-10 w-10 relative rounded overflow-hidden bg-gray-700 flex-shrink-0">
                <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
              </div>
              <span className="truncate">{file.name}</span>
            </div>
            <div className="col-span-2 capitalize">{file.type}</div>
            <div className="col-span-2">{formatFileSize(file.size)}</div>
            <div className="col-span-2 text-sm text-gray-400">{new Date(file.uploadedAt).toLocaleDateString()}</div>
            <div className="col-span-1 flex justify-end space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" onClick={() => handleCopyUrl(file.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy URL</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedMedia(file)
                        setIsDetailsOpen(true)
                      }}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" onClick={() => onDelete(file.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedMedia && (
          <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle>File Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <Image
                  src={selectedMedia.url || "/placeholder.svg"}
                  alt={selectedMedia.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Name:</span>
                  <span className="text-sm font-medium">{selectedMedia.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Type:</span>
                  <span className="text-sm font-medium capitalize">{selectedMedia.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Size:</span>
                  <span className="text-sm font-medium">{formatFileSize(selectedMedia.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Dimensions:</span>
                  <span className="text-sm font-medium">{selectedMedia.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Uploaded:</span>
                  <span className="text-sm font-medium">{formatDate(selectedMedia.uploadedAt)}</span>
                </div>
                <div className="pt-2">
                  <div className="text-sm text-gray-400 mb-1">URL:</div>
                  <div className="flex">
                    <input
                      type="text"
                      value={selectedMedia.url}
                      readOnly
                      className="flex-1 text-xs bg-gray-800 border-gray-700 rounded-l-md"
                    />
                    <Button className="rounded-l-none" onClick={() => handleCopyUrl(selectedMedia.url)}>
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  </div>
                </div>
                {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                  <div className="pt-2">
                    <div className="text-sm text-gray-400 mb-1">Tags:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedia.tags.map((tag: string) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-800 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
