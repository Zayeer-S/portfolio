import { getThemeClasses } from '@/styles/themes';
import { Theme } from '@/contexts/ThemeContext';

interface Technology {
  name: string;
  category: string;
}

interface TechnologiesListProps {
  theme: Theme;
  technologies: Technology[];
  hasAttemptedQuiz: boolean;
  visibleTechs: Set<string>;
  flickeringTechs: Set<string>;
  onRetryQuiz: () => void;
}

export default function TechnologiesList({
  theme,
  technologies,
  hasAttemptedQuiz,
  visibleTechs,
  flickeringTechs,
  onRetryQuiz,
}: TechnologiesListProps) {
  const styles = getThemeClasses(theme);

  // Group technologies by category
  const groupedTechnologies = technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<string, Technology[]>
  );

  return (
    <div className="" role="main" aria-label="Technologies List">
      <div className={`border-b pb-3 ${styles.window.content.border}`}>
        <h2 className={`text-xl font-semibold ${styles.window.content.text}`}>
          Technologies Ive Used
        </h2>
      </div>

      {Object.entries(groupedTechnologies).map(([category, techs]) => (
        <div key={category} className="space-y-2">
          <h3 className={`font-semibold ${styles.window.content.text} text-sm`}>{category}</h3>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, index) => {
              const isVisible = !hasAttemptedQuiz || visibleTechs.has(tech.name);
              const isCurrentlyFlickering = flickeringTechs.has(tech.name);

              return (
                <div
                  key={index}
                  className={`px-3 py-1.5 rounded ${styles.technologies.tag.background} ${styles.technologies.tag.text} transition-opacity duration-100 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transition: isCurrentlyFlickering
                      ? 'opacity 50ms ease-in-out'
                      : 'opacity 100ms ease-in-out',
                  }}
                >
                  {tech.name}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className={`mt-4 pt-4 border-t ${styles.window.content.border}`}>
        <button
          onClick={onRetryQuiz}
          className={`text-sm ${styles.window.content.accent} hover:underline`}
        >
          {hasAttemptedQuiz ? 'Quiz again?' : 'Want to try the quiz?'}
        </button>
      </div>
    </div>
  );
}
