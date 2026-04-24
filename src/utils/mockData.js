import { calculateFinalScore, getPriorityStatus } from './engine';

const firstNames = ["Arjun", "Priya", "Rahul", "Sneha", "Vikram", "Anjali", "Karan", "Riya", "Rohan", "Neha"];
const lastNames = ["Sharma", "Verma", "Patel", "Singh", "Kumar", "Gupta", "Desai", "Joshi", "Chawla", "Nair"];

export const generateCandidates = (count = 50) => {
  return Array.from({ length: count }, (_, i) => {
    // Real-world scenario: ATS and GitHub are auto-scraped. Assignment/Video require human review (start at 0).
    const scores = {
      assignment: 0, 
      video: 0,      
      ats: Math.floor(Math.random() * 40) + 60,        
      github: Math.floor(Math.random() * 40) + 60,     
      communication: 0 
    };
    
    const finalScore = calculateFinalScore(scores);
    
    return {
      id: `CAND-${1000 + i}`,
      name: `${firstNames[i % 10]} ${lastNames[Math.floor(i / 10) % 10]}`,
      college: "Christ University",
      role: "Frontend Intern",
      scores,
      finalScore,
      status: getPriorityStatus(finalScore).label,
      reviewStatus: "Pending" // Everyone starts in the Pending queue
    };
  });
};