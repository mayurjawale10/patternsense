// Static company metadata and sample question bank.
export const COMPANIES = [
  { id: 'google', name: 'Google', tier: 'FAANG', avgSalary: '₹45-80 LPA' },
  { id: 'amazon', name: 'Amazon', tier: 'FAANG', avgSalary: '₹35-55 LPA' },
  { id: 'microsoft', name: 'Microsoft', tier: 'FAANG', avgSalary: '₹40-65 LPA' },
  { id: 'flipkart', name: 'Flipkart', tier: 'Unicorn', avgSalary: '₹30-50 LPA' },
  { id: 'razorpay', name: 'Razorpay', tier: 'Unicorn', avgSalary: '₹25-45 LPA' },
];

export const COMPANY_QUESTIONS = {
  Google: [
    { title: 'Merge K Sorted Lists', difficulty: 'Hard', patterns: ['heap', 'linkedList'], requiredPatterns: ['heap', 'linkedList'] },
    { title: 'Word Ladder', difficulty: 'Medium', patterns: ['graphs'], requiredPatterns: ['graphs'] },
  ],
  Amazon: [
    { title: 'LRU Cache', difficulty: 'Medium', patterns: ['linkedList'], requiredPatterns: ['linkedList'] },
  ],
  Microsoft: [
    { title: 'Serialize BST', difficulty: 'Medium', patterns: ['trees'], requiredPatterns: ['trees'] },
  ],
  Flipkart: [
    { title: 'Coin Change', difficulty: 'Medium', patterns: ['dp'], requiredPatterns: ['dp'] },
  ],
  Razorpay: [
    { title: 'Subarray Sum Equals K', difficulty: 'Medium', patterns: ['arrays'], requiredPatterns: ['arrays'] },
  ],
};

// Resolves URL slug or display name to company key in COMPANY_QUESTIONS.
export function resolveCompanyName(input) {
  const slug = (input || '').toLowerCase();
  const match = COMPANIES.find((c) => c.id === slug || c.name.toLowerCase() === slug);
  return match?.name || null;
}
