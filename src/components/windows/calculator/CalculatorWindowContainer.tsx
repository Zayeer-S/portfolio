import { useState } from 'react';
import Window from '@/components/ui/window/Window';
import CalculatorWindow from './CalculatorWindow';
import CalculatorSidebar from './CalculatorSidebar';
import { CalculatorMode } from './shared/types';
import { WindowProps } from '@/types';

type CalculatorWindowContainerProps = Omit<WindowProps, 'children' | 'title'>;

export default function CalculatorWindowContainer(props: CalculatorWindowContainerProps) {
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('arithmetic');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleModeChange = (newMode: CalculatorMode) => {
    setCalculatorMode(newMode);
    setIsSidebarOpen(false);
  };

  return (
    <Window
      {...props}
      title="Calculator"
      minWidth={320}
      minHeight={495}
      overlay={
        <CalculatorSidebar
          isOpen={isSidebarOpen}
          currentMode={calculatorMode}
          onModeChange={handleModeChange}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      }
    >
      <CalculatorWindow mode={calculatorMode} setMode={setCalculatorMode} />
    </Window>
  );
}
