import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { useState } from 'react';

export default function ProjectsWindow() {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      name: 'LuckyNest',
      description: 'Full-Stack Hotel and Guest Management System',
      details:
        'Led 5-person team. Integrated Stripe API and 2FA. Selected as best solution by client.',
      writeup: [
        'I implemented an Agile approach with daily standups and a Kanban-style Trello board. We followed an iterative development cycle, receiving frequent feedback from the client.',
        '',
        'Critical Decisions:',
        '1. Due to varying technical expertise, certain team members had never used frameworks before. I decided not to use frameworks so everyone could collaborate from day one.',
        '2. During a code review, one team member nearly exposed our API keys. I taught him why this was wrong and we pair-programmed together to move the API keys to our .env file.',
        "3. We were required to peer assess each other for accurate grading. I initially filled out the form myself and sent it to the team. One member disagreed with his marks, so we hopped on a call. I realized I shouldn't have filled it out alone. We held an anonymous vote - ironically, this member received fewer marks, but he accepted the transparent process.",
        '4. One team member was assigned the login system but struggled to meet deadlines. I communicated with him, realized he lacked confidence, and we pair-programmed it together.',
      ],
      tags: ['PHP', 'MySQL', 'Stripe', '2FA'],
      learned:
        'Due to poor code quality, I researched professional practices, learning what DAOs, Service Layers, and CI/CD are. This directly led to EpochAI.',
      link: 'https://github.com/Zayeer-S/LuckyNest',
    },
    {
      name: 'EpochAI',
      description: 'ML-Based Election Prediction System',
      details:
        'Scalable data pipeline processing 1M+ words. XGBoost model with Monte Carlo simulations.',
      writeup: [
        'Built to learn industry practices and apply lessons from LuckyNest. First time implementing professional development standards at scale.',
        '',
        'Technical Achievements:',
        '• Config-driven design validated with Pydantic - one place to change crucial variables',
        '• Full CI/CD pipeline with GitHub Actions, pre-commit hooks, Ruff linting, and MyPy type checking',
        '• Database architecture with Alembic migrations, DAOs, and Service Layer for separation of concerns',
        '• Comprehensive PyTest unit tests covering happy and negative paths',
        '• Automated data collection from CSV and Wikipedia API with rate limiting',
        '• XGBoost model chosen for superior performance on large structured datasets',
        '• Extensive OOP using abstract base classes - adding new collectors/cleaners takes <1 hour',
        '',
        'The model accurately predicted the US elections, and I gained hands-on experience with ML, migration runners, and enterprise-level code organization.',
      ],
      tags: ['Python', 'PostgreSQL', 'XGBoost', 'CI/CD'],
      learned:
        'Learned OOP, CI/CD, Unit Testing, Config Implementation, ML, and Migration Runners. Applied professional standards from industry research.',
      link: 'https://github.com/Zayeer-S/EpochAI',
    },
    {
      name: 'Portfolio Website',
      description: 'Interactive Windows-Inspired Portfolio UI',
      details:
        'Draggable windows, custom themes, responsive design. Full E2E testing with Cypress.',
      writeup: [
        'Built to showcase my projects while implementing senior-level web development practices. Windows-inspired UI with complex interactions.',
        '',
        'Technical Achievements:',
        '• Complex state management with custom React hooks for window positioning, dragging, and resizing',
        '• Microservice architecture - integrated Evalr REST API to replace native TypeScript calculator',
        '• WCAG compliance with comprehensive ARIA labels for screen reader accessibility',
        '• Implemented Husky for CI/CD pre-commit hooks',
        '• Cross-platform testing using port forwarding and iOS/Android debugging tools',
        '• Ensured touch interactions worked seamlessly across mobile devices',
        '• Responsive grid layout adapting to mobile, tablet, and desktop viewports',
        '',
        'The project demonstrates full-stack capabilities and attention to accessibility and user experience.',
      ],
      tags: ['React', 'Next.js', 'TypeScript', 'Cypress'],
      learned:
        'First time with complex React development, microservice integration, Husky, and comprehensive mobile testing workflows.',
      link: 'https://github.com/Zayeer-S/portfolio',
    },
    {
      name: 'Evalr',
      description: 'REST API for Expression Evaluation',
      details:
        'Modular API using Shunting Yard algorithm. Containerized and deployed to AWS Lambda.',
      writeup: [
        'Refactored university coursework into a production-ready REST API handling arithmetic, boolean, and algebraic calculations.',
        '',
        'Technical Achievements:',
        '• Implemented Shunting Yard algorithm for expression parsing',
        '• Containerized with Docker for consistent deployment',
        '• Deployed to AWS Lambda with API Gateway for serverless architecture',
        '• Implemented rate limiting using AWS WAF',
        '• Tested thoroughly with Postman for API validation',
        '• Set up CI/CD pipeline with Husky and GitHub Actions',
        '',
        'Major Bugs Solved:',
        '• MCR deployment issues - resolved using VPNs',
        '• IAM permissions - solved by reading AWS documentation and error messages',
        '',
        'Successfully integrated as a microservice into my portfolio for live API demonstrations.',
      ],
      tags: ['C#', 'AWS', 'Docker', 'API Gateway'],
      learned:
        'First experience with cloud deployment, containerization, AWS Lambda, and API Gateway. Learned to debug IAM and networking issues.',
      link: 'https://github.com/Zayeer-S/Evalr',
    },
  ];

  return (
    <div className="space-y-4" role="main" aria-label="Projects list">
      <div className="space-y-3 pr-2">
        {projects.map((project, index) => (
          <article
            key={index}
            className={`border rounded-lg p-4 ${styles.window.content.border} ${styles.window.content.hover} transition-all ${
              expandedProject === index ? 'shadow-lg' : ''
            }`}
            aria-labelledby={`project-${index}-name`}
            aria-describedby={`project-${index}-description`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3
                  id={`project-${index}-name`}
                  className={`font-semibold text-base ${styles.window.content.text}`}
                >
                  {project.name}
                </h3>
                <p
                  id={`project-${index}-description`}
                  className={`text-sm ${styles.window.content.textSecondary} mt-0.5`}
                >
                  {project.description}
                </p>
              </div>
            </div>

            <p className={`text-xs ${styles.window.content.textSecondary} mb-3 leading-relaxed`}>
              {project.details}
            </p>

            <div
              className="flex flex-wrap gap-1.5 mb-3"
              role="list"
              aria-label={`Technologies used in ${project.name}`}
            >
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  role="listitem"
                  className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded text-blue-800 dark:text-blue-200"
                  aria-label={`Technology: ${tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {expandedProject === index && (
              <div
                className={`mt-3 pt-3 border-t ${styles.window.content.border} space-y-2`}
                role="region"
                aria-label={`Detailed information about ${project.name}`}
              >
                <div className={`text-xs ${styles.window.content.text} leading-relaxed space-y-2`}>
                  {project.writeup.map((paragraph, pIndex) => (
                    <p key={pIndex} className={paragraph === '' ? 'h-2' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                {project.learned && (
                  <div
                    className={`mt-3 p-2 rounded bg-blue-50 dark:bg-blue-950 border ${styles.window.content.border}`}
                    role="complementary"
                    aria-label="Key learnings from this project"
                  >
                    <p className={`text-xs ${styles.window.content.text} font-medium`}>
                      What I Learned:
                    </p>
                    <p className={`text-xs ${styles.window.content.textSecondary} mt-1`}>
                      {project.learned}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div
              className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-700"
              role="group"
              aria-label={`Actions for ${project.name}`}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                onClick={e => e.stopPropagation()}
                aria-label={`View ${project.name} on GitHub (opens in new tab)`}
              >
                View on GitHub
              </a>
              <button
                onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                className={`text-xs px-2 py-1 rounded ${styles.window.content.hover} ${styles.window.content.text}`}
                aria-expanded={expandedProject === index}
                aria-controls={`project-${index}-details`}
                aria-label={
                  expandedProject === index
                    ? `Collapse details for ${project.name}`
                    : `Expand details for ${project.name}`
                }
              >
                {expandedProject === index ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer
        className={`text-xs ${styles.window.content.textSecondary} text-center pt-2 border-t ${styles.window.content.border}`}
        role="contentinfo"
      >
        View more on{' '}
        <a
          href="https://github.com/Zayeer-S"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          aria-label="View more projects on GitHub (opens in new tab)"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
