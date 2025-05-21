"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Unlock, Plus, Check, X } from "lucide-react"

type Block = {
  id: number
  timestamp: Date
  data: string
  previousHash: string
  hash: string
  nonce: number
  isValid: boolean
}

export default function BlockchainDemo() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [newBlockData, setNewBlockData] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Initialize blockchain with genesis block
  useEffect(() => {
    const genesisBlock: Block = {
      id: 0,
      timestamp: new Date(),
      data: "Genesis Block",
      previousHash: "0",
      hash: calculateHash(0, new Date(), "Genesis Block", "0", 0),
      nonce: 0,
      isValid: true,
    }
    setBlocks([genesisBlock])
  }, [])

  // Simple hash function (in a real blockchain this would be a cryptographic hash)
  function calculateHash(id: number, timestamp: Date, data: string, previousHash: string, nonce: number): string {
    const hashInput = `${id}${timestamp.toISOString()}${data}${previousHash}${nonce}`
    let hash = 0
    for (let i = 0; i < hashInput.length; i++) {
      const char = hashInput.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, "0")
  }

  // Mine a new block (find a hash with a specific pattern)
  function mineBlock(id: number, timestamp: Date, data: string, previousHash: string): { hash: string; nonce: number } {
    let nonce = 0
    let hash = ""

    // In a real blockchain, this would look for a hash with specific properties
    // For demo purposes, we're just looking for a hash that ends with "00"
    while (!hash.endsWith("00")) {
      nonce++
      hash = calculateHash(id, timestamp, data, previousHash, nonce)
    }

    return { hash, nonce }
  }

  // Add a new block to the chain
  const addBlock = async () => {
    if (!newBlockData.trim()) return

    setIsLoading(true)

    // Get the previous block
    const previousBlock = blocks[blocks.length - 1]
    const newBlockId = previousBlock.id + 1
    const timestamp = new Date()

    // Simulate mining delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mine the new block
    const { hash, nonce } = mineBlock(newBlockId, timestamp, newBlockData, previousBlock.hash)

    // Create the new block
    const newBlock: Block = {
      id: newBlockId,
      timestamp,
      data: newBlockData,
      previousHash: previousBlock.hash,
      hash,
      nonce,
      isValid: true,
    }

    // Add to blockchain
    setBlocks([...blocks, newBlock])
    setNewBlockData("")
    setIsLoading(false)
  }

  // Tamper with a block's data
  const tamperWithBlock = (id: number, newData: string) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === id) {
          // Change the data but don't recalculate the hash (this creates an invalid block)
          return { ...block, data: newData, isValid: false }
        }
        return block
      }),
    )

    // Validate the chain after tampering
    validateChain()
  }

  // Validate the entire blockchain
  const validateChain = () => {
    const updatedBlocks = [...blocks]

    // Start from the second block (index 1)
    for (let i = 1; i < updatedBlocks.length; i++) {
      const currentBlock = updatedBlocks[i]
      const previousBlock = updatedBlocks[i - 1]

      // Recalculate the current block's hash
      const recalculatedHash = calculateHash(
        currentBlock.id,
        currentBlock.timestamp,
        currentBlock.data,
        currentBlock.previousHash,
        currentBlock.nonce,
      )

      // Check if the hash is still valid
      const isHashValid = recalculatedHash === currentBlock.hash

      // Check if the previous hash reference is valid
      const isPrevHashValid = currentBlock.previousHash === previousBlock.hash

      // Update the block's validity
      updatedBlocks[i] = {
        ...currentBlock,
        isValid: isHashValid && isPrevHashValid,
      }

      // If this block is invalid, all subsequent blocks become invalid
      if (!isHashValid || !isPrevHashValid) {
        for (let j = i + 1; j < updatedBlocks.length; j++) {
          updatedBlocks[j] = { ...updatedBlocks[j], isValid: false }
        }
        break
      }
    }

    setBlocks(updatedBlocks)
  }

  // Fix the blockchain by recalculating hashes
  const fixChain = () => {
    const updatedBlocks = [...blocks]

    // Start from the genesis block
    for (let i = 1; i < updatedBlocks.length; i++) {
      const previousBlock = updatedBlocks[i - 1]
      const currentBlock = updatedBlocks[i]

      // Update previous hash reference
      currentBlock.previousHash = previousBlock.hash

      // Remine the block
      const { hash, nonce } = mineBlock(
        currentBlock.id,
        currentBlock.timestamp,
        currentBlock.data,
        currentBlock.previousHash,
      )

      // Update the block
      updatedBlocks[i] = {
        ...currentBlock,
        hash,
        nonce,
        isValid: true,
      }
    }

    setBlocks(updatedBlocks)
  }

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#ff4d4d]">Blockchain</span> Demo
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Experience how blockchain technology works with this interactive demo. Add blocks, tamper with data, and see
            how the chain maintains its integrity.
          </p>
        </div>

        {/* Add new block form */}
        <div className="max-w-md mx-auto mb-12 p-6 bg-[#151515] rounded-lg">
          <h3 className="text-xl font-bold mb-4">Add New Block</h3>
          <div className="flex gap-2">
            <Input
              value={newBlockData}
              onChange={(e) => setNewBlockData(e.target.value)}
              placeholder="Enter block data..."
              className="bg-[#222] border-[#444] focus-visible:ring-[#ff4d4d] text-white"
            />
            <Button
              onClick={addBlock}
              disabled={isLoading || !newBlockData.trim()}
              className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white"
            >
              {isLoading ? "Mining..." : <Plus size={18} />}
            </Button>
          </div>
        </div>

        {/* Blockchain visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-8">
            {blocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-lg border ${
                  block.isValid ? "bg-[#151515] border-green-500/30" : "bg-[#251515] border-red-500/50"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold flex items-center gap-2">
                      Block #{block.id}
                      {block.isValid ? (
                        <Lock size={16} className="text-green-500" />
                      ) : (
                        <Unlock size={16} className="text-red-500" />
                      )}
                    </h4>
                    <p className="text-xs text-white/50">{block.timestamp.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center">
                    {block.isValid ? (
                      <span className="text-green-500 flex items-center text-sm">
                        <Check size={14} className="mr-1" /> Valid
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center text-sm">
                        <X size={14} className="mr-1" /> Invalid
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Data:</p>
                    <Input
                      value={block.data}
                      onChange={(e) => tamperWithBlock(block.id, e.target.value)}
                      className="bg-[#222] border-[#444] focus-visible:ring-[#ff4d4d] text-white"
                      disabled={block.id === 0} // Can't tamper with genesis block
                    />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Hash:</p>
                    <p className="font-mono text-sm bg-[#222] p-2 rounded overflow-x-auto">{block.hash}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/50 mb-1">Previous Hash:</p>
                    <p className="font-mono text-sm bg-[#222] p-2 rounded overflow-x-auto">{block.previousHash}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1">Nonce: {block.nonce}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-center gap-4">
            <Button onClick={validateChain} className="bg-[#333] hover:bg-[#444] text-white">
              Validate Chain
            </Button>
            <Button onClick={fixChain} className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white">
              Fix Chain
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
