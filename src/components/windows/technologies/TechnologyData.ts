export interface Technology {
  name: string;
  category: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAns: number;
  technology: string;
}

export const technologies: Technology[] = [
  { name: 'Python', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'C#', category: 'Languages' },
  { name: 'C++', category: 'Languages' },

  { name: 'React', category: 'Frameworks' },
  { name: 'Flask', category: 'Frameworks' },
  { name: 'Node.js', category: 'Frameworks' },
  { name: 'Next.js', category: 'Frameworks' },

  { name: 'XGBoost', category: 'AI' },

  { name: 'GitHub Actions', category: 'DevOps/Testing' },
  { name: 'Cypress', category: 'DevOps/Testing' },
  { name: 'Husky', category: 'DevOps/Testing' },

  { name: 'AWS', category: 'Cloud/Database' },
  { name: 'PostgreSQL', category: 'Cloud/Database' },
  { name: 'MySQL', category: 'Cloud/Database' },
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'What framework powers this portfolio website?',
    options: ['Jquery', 'Laravel', 'Svelte', 'React'],
    correctAns: 3,
    technology: 'React',
  },

  {
    question: 'Which tool did I use to perform end-to-end tests on this website?',
    options: ['Jest', 'Mocha', 'PyTest', 'Cypress'],
    correctAns: 3,
    technology: 'Cypress',
  },

  {
    question: 'Which of these tools is part of my automated CI/CD setup?',
    options: ['Husky', 'Terraform', 'CircleCI', 'Azure DevOps'],
    correctAns: 0,
    technology: 'Husky',
  },

  {
    question: 'EpochAI uses which ML model for prediction?',
    options: ['Random Forest', 'LSTM', 'XGBoost', 'Naive Bayes'],
    correctAns: 2,
    technology: 'XGBoost',
  },

  {
    question: 'Which database system does EpochAI use?',
    options: ['MongoDB', 'PostgreSQL', 'Redis', 'MySQL', 'Excel Spreadsheets'],
    correctAns: 1,
    technology: 'PostgreSQL',
  },

  {
    question: 'Evalr is deployed using which AWS service?',
    options: ['EC2', 'Lambda', 'S3', 'LightSail'],
    correctAns: 1,
    technology: 'AWS',
  },

  {
    question: 'Which CI/CD pipeline do I use?',
    options: ['GitLab CI/CD', 'Jenkins', 'GitHub Actions'],
    correctAns: 2,
    technology: 'GitHub Actions',
  },

  {
    question: 'Which language was used to build this websites state management?',
    options: ['TypeScript', 'SQL', 'C'],
    correctAns: 0,
    technology: 'TypeScript',
  },

  {
    question: 'Which language was used to build EpochAIs backend logic?',
    options: ['C++', 'TypeScript', 'SQL', 'Python'],
    correctAns: 3,
    technology: 'Python',
  },
];
