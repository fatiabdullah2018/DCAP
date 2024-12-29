import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockContractCall = vi.fn()

describe('Tokenized Voting Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('vote', () => {
    it('should allow voting on a proposal', async () => {
      const proposalId = 1
      const amount = 100
      
      mockContractCall.mockResolvedValue({ value: true })
      
      const result = await mockContractCall('tokenized-voting', 'vote', [proposalId, amount])
      
      expect(result.value).toBe(true)
      expect(mockContractCall).toHaveBeenCalledWith('tokenized-voting', 'vote', [proposalId, amount])
    })
    
    it('should fail if token transfer fails', async () => {
      const proposalId = 1
      const amount = 1000000 // Assuming this is more than the user has
      
      mockContractCall.mockRejectedValue(new Error('Insufficient balance'))
      
      await expect(mockContractCall('tokenized-voting', 'vote', [proposalId, amount])).rejects.toThrow('Insufficient balance')
    })
  })
  
  describe('get-votes', () => {
    it('should return the number of votes for a proposal by a voter', async () => {
      const proposalId = 1
      const voter = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      
      mockContractCall.mockResolvedValue({ value: 100 })
      
      const result = await mockContractCall('tokenized-voting', 'get-votes', [proposalId, voter])
      
      expect(result.value).toBe(100)
      expect(mockContractCall).toHaveBeenCalledWith('tokenized-voting', 'get-votes', [proposalId, voter])
    })
  })
  
  describe('get-total-votes', () => {
    it('should return the total votes for a proposal', async () => {
      const proposalId = 1
      
      mockContractCall.mockResolvedValue({ value: 1000 })
      
      const result = await mockContractCall('tokenized-voting', 'get-total-votes', [proposalId])
      
      expect(result.value).toBe(1000)
      expect(mockContractCall).toHaveBeenCalledWith('tokenized-voting', 'get-total-votes', [proposalId])
    })
  })
})

