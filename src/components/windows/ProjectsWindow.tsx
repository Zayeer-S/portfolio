import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { useState } from 'react';

interface WriteupSection {
  heading?: string;
  paragraph?: string;
  bullets?: string[];
}

interface Project {
  name: string;
  description: string;
  details: string;
  tags: string[];
  writeup: WriteupSection[];
  learned: string;
  link: string;
}

export default function ProjectsWindow() {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      name: 'LuckyNest',
      description: 'Full-Stack Hotel and Guest Management System',
      details:
        'Led 5-person team. Integrated Stripe API and 2FA. Selected as best solution by client.',
      tags: ['PHP', 'JavaScript', 'MySQL', 'Stripe', 'Agile'],
      writeup: [
        {
          paragraph:
            'Implemented an Agile delivery model with daily standups and iterative client feedback, using a Kanban-style Trello workflow.',
        },
        {
          heading: 'Leadership Highlights',
          bullets: [
            'Chose to exclude frameworks to ensure all team members could contribute from day one given varied technical experience.',
            'Prevented potential API key exposure by guiding a teammate to apply secure environment configuration via .env.',
            'Introduced anonymous peer assessment to ensure fair contribution evaluation and improve accountability.',
          ],
        },
      ],
      learned:
        'Recognised the impact of poor code quality and researched industry standards, leading me to adopt configs, DAOs, Service Layers and CI/CD patterns in later projects such as EpochAI.',
      link: 'https://github.com/Zayeer-S/LuckyNest',
    },
    {
      name: 'EpochAI',
      description: 'ML-Based Election Prediction System',
      details:
        'Scalable data pipeline processing 1M+ words. XGBoost model with Monte Carlo simulations.',
      tags: ['Python', 'PostgreSQL', 'XGBoost', 'CI/CD'],
      writeup: [
        {
          paragraph:
            'Architected to apply industry-grade development practices at scale, directly informed by lessons from LuckyNest.',
        },
        {
          heading: 'Technical Achievements',
          bullets: [
            'Config-driven architecture validated via Pydantic, enabling single-point modification of critical variables.',
            'Built full CI/CD pipeline using GitHub Actions, Ruff linting, pre-commit hooks, and MyPy for type validation.',
            'Designed database layer using Alembic migrations, DAOs and a Service Layer for separation of concerns.',
            'Extensive PyTest suite covering both positive and negative test paths.',
            'Automated data ingest from CSV and Wikipedia API with rate limits.',
            'Selected XGBoost for its performance on structured datasets; extended via Monte Carlo simulations.',
            'Pluggable architecture using abstract base classes enabled new data collectors/cleaners to be added in under 1 hour.',
          ],
        },
        {
          heading: 'Major Issues Solved',
          bullets: [
            'Initially implemented dynamic JSON schema generation for storage — identified as unnecessary due to defined fields and refactored to static types to improve performance and complexity.',
            'Config allowed invalid types due to lack of type validation — introduced Pydantic validation and a constraints config file to guarantee type safety and prevent unreasonable parameters.',
            'Reduced code duplication by transitioning from standalone DAOs to a DAO Factory pattern with abstract base class support.',
          ],
        },
        {
          paragraph:
            'Provided hands-on experience with ML ops, scalable pipelines and enterprise-level code organisation.',
        },
      ],
      learned:
        'Applied professional engineering practices including OOP, CI/CD, unit testing, configuration management, ML integration and migration runners.',
      link: 'https://github.com/Zayeer-S/EpochAI',
    },
    {
      name: 'Portfolio Website',
      description: 'Interactive Windows-Inspired Portfolio UI',
      details: 'Draggable windows, custom themes, responsive design. E2E testing with Cypress.',
      tags: ['React', 'Next.js', 'TypeScript', 'Cypress', 'CI/CD'],
      writeup: [
        {
          paragraph:
            'Engineered to showcase my projects using senior-level web development principles through an interactive Windows-style UI.',
        },
        {
          heading: 'Technical Achievements',
          bullets: [
            'Implemented complex state management through custom React hooks handling window positioning, dragging and resizing.',
            'Integrated Evalr REST API as an external microservice, replacing native calculator logic.',
            'Ensured WCAG compliance using comprehensive ARIA labelling for screen reader support.',
            'Set up Husky for CI/CD pre-commit automation.',
            'Validated cross-platform behaviour using port forwarding, iOS/Android emulation and manual touch interaction testing.',
            'Optimised layout responsiveness for desktop, tablet and mobile viewports.',
          ],
        },
        {
          heading: 'Major Issues Solved',
          bullets: [
            'Window hydration mismatch caused desktop icon positions to reset — resolved by server-side default grid render followed by hydration-based position loading.',
            'Theme switching for light, dark and Windows 7 variants became hard to maintain — consolidated into a dedicated theme file for structured management.',
            'On mobile devices, windows initially rendered outside the viewport — fixed via viewport boundary calculations and position constraints.',
          ],
        },
        {
          paragraph:
            'Showcases full-stack execution, interaction design and accessibility awareness.',
        },
      ],
      learned:
        'Gained experience with complex React systems, accessibility-first development, external microservice integration and mobile interaction testing.',
      link: 'https://github.com/Zayeer-S/portfolio',
    },
    {
      name: 'Evalr',
      description: 'REST API for Expression Evaluation',
      details: 'API using Shunting Yard algorithm containerized and deployed to AWS Lambda.',
      tags: ['C#', 'AWS', 'Docker', 'API Gateway', 'CI/CD'],
      writeup: [
        {
          paragraph:
            'Refactored an academic prototype into a production-grade REST API supporting arithmetic, boolean and algebraic expression evaluation.',
        },
        {
          heading: 'Technical Achievements',
          bullets: [
            'Implemented the Shunting Yard algorithm for expression parsing.',
            'Containerised via Docker to ensure consistent deployment environments.',
            'Deployed to AWS Lambda via API Gateway using serverless architecture.',
            'Added rate limiting using AWS WAF for protection against abuse.',
            'Tested extensively using Postman for API validation.',
            'Built CI/CD pipeline using Husky and GitHub Actions.',
          ],
        },
        {
          heading: 'Major Issues Resolved',
          bullets: [
            'Solved image registry access failures from mcr.microsoft.com using VPN-based workarounds.',
            'Resolved IAM permission issues through targeted debugging and AWS documentation review.',
          ],
        },
        {
          paragraph:
            'Integrated as a live microservice within my portfolio site for real-time demonstration.',
        },
      ],
      learned:
        'Developed cloud-ready architecture, containerisation for deployment consistency and problem-solving experience with IAM/network debugging.',
      link: 'https://github.com/Zayeer-S/Evalr',
    },
  ];

  return (
    <div className="space-y-4" role="main" aria-label="Projects list">
      <div className="space-y-3">
        {projects.map((project, index) => (
          <article
            key={index}
            className={`border rounded-lg p-4 ${styles.projects.card.border} ${styles.projects.card.hover} transition-all ${
              expandedProject === index ? styles.projects.card.shadow : ''
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
                  className={`text-xs ${styles.projects.tag.background} px-2 py-0.5 rounded ${styles.projects.tag.text}`}
                  aria-label={`Technology: ${tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {expandedProject === index && (
              <div
                className={`mt-3 pt-3 border-t ${styles.projects.expandedSection.border} space-y-3`}
                role="region"
                aria-label={`Detailed information about ${project.name}`}
              >
                <div className={`text-xs ${styles.window.content.text} leading-relaxed space-y-3`}>
                  {project.writeup.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      {section.heading && (
                        <h4 className={`font-semibold ${styles.window.content.text} mb-1.5`}>
                          {section.heading}:
                        </h4>
                      )}
                      {section.paragraph && (
                        <p className={styles.window.content.textSecondary}>{section.paragraph}</p>
                      )}
                      {section.bullets && (
                        <ul
                          className={`list-disc list-inside space-y-1 ${styles.window.content.textSecondary}`}
                        >
                          {section.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="leading-relaxed">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                {project.learned && (
                  <div
                    className={`mt-3 p-2 rounded ${styles.projects.expandedSection.background} border ${styles.projects.expandedSection.border}`}
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
              className={`flex items-center justify-between mt-3 pt-2 border-t ${styles.projects.footer.border}`}
              role="group"
              aria-label={`Actions for ${project.name}`}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs ${styles.projects.link.text} ${styles.projects.link.hover}`}
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
        className={`text-xs ${styles.window.content.textSecondary} text-center pt-2 border-t ${styles.projects.footer.border}`}
        role="contentinfo"
      >
        View more on{' '}
        <a
          href="https://github.com/Zayeer-S"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.projects.link.text} ${styles.projects.link.hover}`}
          aria-label="View more projects on GitHub (opens in new tab)"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
