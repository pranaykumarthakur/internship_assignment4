import { calculateFinalScore, getPriorityStatus } from './engine';

const firstNames = ["Arjun", "Priya", "Rahul", "Sneha", "Vikram", "Anjali", "Karan", "Riya", "Rohan", "Neha"];
const lastNames = ["Sharma", "Verma", "Patel", "Singh", "Kumar", "Gupta", "Desai", "Joshi", "Chawla", "Nair"];

export const generateCandidates = (count = 50) => {
  return Array.from({ length: count }, (_, i) => {
    const scores = {
      assignment: Math.floor(Math.random() * 40) + 60, // 60-100
      video: Math.floor(Math.random() * 50) + 50,      // 50-100
      ats: Math.floor(Math.random() * 60) + 40,        // 40-100
      github: Math.floor(Math.random() * 50) + 50,     // 50-100
      communication: Math.floor(Math.random() * 40) + 60 // 60-100
    };
    
    const finalScore = calculateFinalScore(scores);
    
    return {
      id: `CAND-${1000 + i}`,
      name: `${firstNames[i % 10]} ${lastNames[Math.floor(i / 10) % 10]}`,
      role: "Frontend Intern",
      scores,
      finalScore,
      status: getPriorityStatus(finalScore).label
    };
  });
};