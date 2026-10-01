export type Recommendation = {
  id: string;
  name: string;
  role: string;
  relationship: string;
  quote: string;
};

// Add only recommendations reviewed and approved for public display.
// Submission emails never appear on the public site automatically.
export const recommendations: Recommendation[] = [];
