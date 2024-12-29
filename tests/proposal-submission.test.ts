import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockContractCall = vi.fn()

describe('Proposal Submission Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('submit-proposal', () => {
    it('should submit a new proposal successfully', async () => {
      const title = 'Test Proposal'
      const description = 'This is a test proposal for geoengineering.'
      const dataUrl = 'https://example.com/test-proposal-data'
      
      mockContractCall.mockResolvedValue({ value: 1 })
      
      const result = await mockContractCall('proposal-submission', 'submit-proposal', [title, description, dataUrl])
      
      expect(result.value).toBe(1)
      expect(mockContractCall).toHaveBeenCalledWith('proposal-submission', 'submit-proposal', [title, description, dataUrl])
    })
  })
  
  describe('get-proposal', () => {
    it('should return a proposal by ID', async () => {
      const proposalId = 1
      const expectedProposal = {
        author: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        title: 'Test Proposal',
        description: 'This is a test proposal for geoengineering.',
        data_url: 'https://example.com/test-proposal-data',
        status: 'submitted'
      }
      
      mockContractCall.mockResolvedValue({ value: expectedProposal })
      
      const result = await mockContractCall('proposal-submission', 'get-proposal', [proposalId])
      
      expect(result.value).toEqual(expectedProposal)
      expect(mockContractCall).toHaveBeenCalledWith('proposal-submission', 'get-proposal', [proposalId])
    })
    
    it('should return null for non-existent proposal', async () => {
      const proposalId = 999
      
      mockContractCall.mockResolvedValue({ value: null })
      
      const result = await mockContractCall('proposal-submission', 'get-proposal', [proposalId])
      
      expect(result.value).toBeNull()
    })
  })
  
  describe('get-last-proposal-id', () => {
    it('should return the last proposal ID', async () => {
      mockContractCall.mockResolvedValue({ value: 5 })
      
      const result = await mockContractCall('proposal-submission', 'get-last-proposal-id', [])
      
      expect(result.value).toBe(5)
      expect(mockContractCall).toHaveBeenCalledWith('proposal-submission', 'get-last-proposal-id', [])
    })
  })
})

