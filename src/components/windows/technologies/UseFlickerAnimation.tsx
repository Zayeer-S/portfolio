import { useState, useCallback } from 'react';

export interface UseFlickerAnimationReturn {
  visibleTechs: Set<string>;
  flickeringTechs: Set<string>;
  flickerInTechnology: (techName: string, delay?: number) => void;
  flickerInMultipleTechnologies: (techNames: string[], delayIncrement?: number) => void;
  resetFlicker: () => void;
}

export const UseFlickerAnimation = (): UseFlickerAnimationReturn => {
  const [visibleTechs, setVisibleTechs] = useState<Set<string>>(new Set());
  const [flickeringTechs, setFlickeringTechs] = useState<Set<string>>(new Set());

  const flickerInTechnology = useCallback((techName: string, delay: number = 0) => {
    setTimeout(() => {
      setFlickeringTechs(prev => new Set(prev).add(techName));

      const flickerPattern = [
        { time: 0, visible: false },
        { time: 25, visible: true },
        { time: 50, visible: false },
        { time: 75, visible: true },
        { time: 100, visible: false },
        { time: 150, visible: true },
      ];

      flickerPattern.forEach(({ time, visible }) => {
        setTimeout(() => {
          if (visible) {
            setVisibleTechs(prev => new Set(prev).add(techName));
          } else {
            setVisibleTechs(prev => {
              const newSet = new Set(prev);
              newSet.delete(techName);
              return newSet;
            });
          }
        }, time);
      });

      setTimeout(() => {
        setFlickeringTechs(prev => {
          const newSet = new Set(prev);
          newSet.delete(techName);
          return newSet;
        });
      }, 500);
    }, delay);
  }, []);

  const flickerInMultipleTechnologies = useCallback(
    (technames: string[], delayIncrement: number = 100) => {
      technames.forEach((technames, index) => {
        flickerInTechnology(technames, index * delayIncrement);
      });
    },
    [flickerInTechnology]
  );

  const resetFlicker = useCallback(() => {
    setVisibleTechs(new Set());
    setFlickeringTechs(new Set());
  }, []);

  return {
    visibleTechs,
    flickeringTechs,
    flickerInTechnology,
    flickerInMultipleTechnologies,
    resetFlicker,
  };
};
