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
  hasSkippedQuiz: boolean;
  visibleTechs: Set<string>;
  flickeringTechs: Set<string>;
  correctlyAnsweredTechs: Set<string>;
  incorrectlyAnsweredTechs: Set<string>;
  onRetryQuiz: () => void;
}

export default function TechnologiesList({
  theme,
  technologies,
  hasAttemptedQuiz,
  hasSkippedQuiz,
  visibleTechs,
  flickeringTechs,
  correctlyAnsweredTechs,
  incorrectlyAnsweredTechs,
  onRetryQuiz,
}: TechnologiesListProps) {
  const styles = getThemeClasses(theme);

  // i see push and just think about dj jikstra's shunting yard -- this isnt even a stack 😭
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
      <div className={`pt-2`}>
        {Object.entries(groupedTechnologies).map(([category, techs]) => (
          <div key={category} className="space-y-1">
            <h3 className={`font-semibold ${styles.window.content.text} text-sm`}>{category}</h3>
            <div className="flex flex-wrap gap-2 pb-3">
              {techs.map((tech, index) => {
                const isVisible = hasAttemptedQuiz && visibleTechs.has(tech.name);
                const isCurrentlyFlickering = flickeringTechs.has(tech.name);
                const wasCorrect = correctlyAnsweredTechs.has(tech.name);
                const wasIncorrect = incorrectlyAnsweredTechs.has(tech.name);

                let outlineClass = '';
                if (wasCorrect) {
                  outlineClass = styles.technologies.tag.outlineCorrect;
                } else if (wasIncorrect) {
                  outlineClass = styles.technologies.tag.outlineIncorrect;
                }

                return (
                  <div
                    key={index}
                    className={`px-3 py-1 rounded ${styles.technologies.tag.background} ${styles.technologies.tag.text} ${outlineClass} transition-opacity duration-100 ${
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
      </div>

      <div className={`mt-4 pt-4 border-t ${styles.window.content.border}`}>
        <button
          onClick={onRetryQuiz}
          className={`text-sm ${styles.window.content.accent} hover:underline`}
        >
          {hasSkippedQuiz ? 'Wanna try it now?' : 'Retry quiz?'}
        </button>
      </div>
    </div>
  );
}
