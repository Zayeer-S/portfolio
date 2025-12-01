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
  { name: 'React', category: 'Frameworks' },
  { name: 'C#', category: 'Languages' },
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: 'What framework powers this portfolio website?',
    options: ['Vue.js', 'Angular', 'Laravel', 'Svelte', 'React'],
    correctAns: 4,
    technology: 'React',
  },
];
