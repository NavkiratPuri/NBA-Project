import { comparePlayers } from "@/components/RandomCategory"
import { it, expect, describe } from 'vitest'
import axios from "axios"



describe('Group for testing randomCategory', () => {
  //Create some variables for the function to compare
  const player1 = 
  
  it('should give a point for equal stat', () => {
    expect(comparePlayers(20, 20)).toBe("Stats are equal.")
  })
})