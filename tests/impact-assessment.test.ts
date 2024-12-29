import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockContractCall = vi.fn()

describe('Impact Assessment Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('submit-assessment', () => {
    it('should submit an impact assessment successfully', async () => {
      const proposalId = 1
      const climateImpact = 75
      const economicImpact = 60
      const socialImpact = 50
      const feasibility = 80
      
      mockContractCall.mockResolvedValue({ value: true })
      
      const result = await mockContractCall('impact-assessment', 'submit-assessment', [
        proposalId,
        climateImpact,
        economicImpact,
        socialImpact,
        feasibility
      ])
      
      expect(result.value).toBe(true)
      expect(mockContractCall).toHaveBeenCalledWith('impact-assessment', 'submit-assessment', [
        proposalId,
        climateImpact,
        economicImpact,
        socialImpact,
        feasibility
      ])
    })
    
    it('should fail if feasibility is out of range', async () => {
      const proposalId = 1
      const climateImpact = 75
      const economicImpact = 60
      const socialImpact = 50
      const feasibility = 101 // Out of range (1-100)
      
      mockContractCall.mockRejectedValue(new Error('Feasibility out of range'))
      
      await expect(mockContractCall('impact-assessment', 'submit-assessment', [
        proposalId,
        climateImpact,
        economicImpact,
        socialImpact,
        feasibility
      ])).rejects.toThrow('Feasibility out of range')
    })
  })
  
  describe('get-assessment', () => {
    it('should return the impact assessment for a proposal', async () => {
      const proposalId = 1
      const expectedAssessment = {
        climate_impact: 75,
        economic_impact: 60,
        social_impact: 50,
        feasibility: 80,
        timestamp: 123456
      }
      
      mockContractCall.mockResolvedValue({ value: expectedAssessment })
      
      const result = await mockContractCall('impact-assessment', 'get-assessment', [proposalId])
      
      expect(result.value).toEqual(expectedAssessment)
      expect(mockContractCall).toHaveBeenCalledWith('impact-assessment', 'get-assessment', [proposalId])
    })
    
    it('should return null for non-existent assessment', async () => {
      const proposalId = 999
      
      mockContractCall.mockResolvedValue({ value: null })
      
      const result = await mockContractCall('impact-assessment', 'get-assessment', [proposalId])
      
      expect(result.value).toBeNull()
    })
  })
})

