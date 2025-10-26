'use client';

import { useWindowManager } from '@/hooks/useWindowManager';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

import Window from '@/components/desktop/window/Window';
import DesktopGrid from '@/components/desktop/grid/DesktopGrid';
import StartMenu from '@/components/desktop/menu/StartMenu';
import Taskbar from '@/components/desktop/taskbar/Taskbar';
import TypewriterIntro from '@/components/desktop/TypewriterIntro';

import SettingsWindow from '@/components/windows/SettingsWindow';
import CalculatorWindow from '@/components/windows/CalculatorWindow';
import NotepadWindow from '@/components/windows/NotepadWindow';
import ProjectsWindow from '@/components/windows/ProjectsWindow';
import TechnologiesWindow from '@/components/windows/TechnologiesWindow';
import ContactWindow from '@/components/windows/ContactWindow';
import CreditsWindow from '@/components/windows/CreditsWindow';

export default function Home() {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const {
    windows,
    startMenuOpen,
    currentTime,
    isClient,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    getWindowZIndex,
    toggleStartMenu,
    closeStartMenu,
  } = useWindowManager();

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Desktop Background */}
      <div className={`absolute inset-0 ${styles.desktop.background}`}></div>

      <TypewriterIntro theme={theme} />

      <DesktopGrid
        icons={[
          {
            id: 'cv',
            icon: 'PDF',
            iconKey: 'cv',
            label: 'CV',
            onClick: () => window.open('/zayeer-sultan-cv.pdf'),
          },
          {
            id: 'projects',
            icon: 'Folder',
            iconKey: 'projects',
            label: 'Projects',
            onClick: () => openWindow('projects'),
          },
          {
            id: 'technologies',
            icon: 'Desktop',
            iconKey: 'technologies',
            label: 'Technologies',
            onClick: () => openWindow('technologies'),
          },
          {
            id: 'contact',
            icon: 'Mail',
            iconKey: 'contact',
            label: 'Contact',
            onClick: () => openWindow('contact'),
          },
          {
            id: 'credits',
            icon: 'credits',
            iconKey: 'credits',
            label: 'Credits',
            onClick: () => openWindow('credits'),
          },
        ]}
        hoverClass={styles.desktop.iconHover}
      />

      <Window
        id="projects"
        title="Projects - Windows Explorer"
        isOpen={windows.projects.isOpen}
        isMinimized={windows.projects.isMinimized}
        isMaximized={windows.projects.isMaximized}
        onClose={() => closeWindow('projects')}
        onMinimize={() => minimizeWindow('projects')}
        onMaximize={() => maximizeWindow('projects')}
        zIndex={getWindowZIndex('projects')}
        onFocus={() => focusWindow('projects')}
        theme={theme}
      >
        <ProjectsWindow />
      </Window>

      <Window
        id="technologies"
        title="Technologies.exe - Control Panel"
        isOpen={windows.technologies.isOpen}
        isMinimized={windows.technologies.isMinimized}
        isMaximized={windows.technologies.isMaximized}
        onClose={() => closeWindow('technologies')}
        onMinimize={() => minimizeWindow('technologies')}
        onMaximize={() => maximizeWindow('technologies')}
        zIndex={getWindowZIndex('technologies')}
        onFocus={() => focusWindow('technologies')}
        theme={theme}
      >
        <TechnologiesWindow />
      </Window>

      <Window
        id="contact"
        title="Contact.exe"
        isOpen={windows.contact.isOpen}
        isMinimized={windows.contact.isMinimized}
        isMaximized={windows.contact.isMaximized}
        onClose={() => closeWindow('contact')}
        onMinimize={() => minimizeWindow('contact')}
        onMaximize={() => maximizeWindow('contact')}
        zIndex={getWindowZIndex('contact')}
        onFocus={() => focusWindow('contact')}
        theme={theme}
      >
        <ContactWindow />
      </Window>

      <Window
        id="settings"
        title="Settings"
        isOpen={windows.settings.isOpen}
        isMinimized={windows.settings.isMinimized}
        isMaximized={windows.settings.isMaximized}
        onClose={() => closeWindow('settings')}
        onMinimize={() => minimizeWindow('settings')}
        onMaximize={() => maximizeWindow('settings')}
        zIndex={getWindowZIndex('settings')}
        onFocus={() => focusWindow('settings')}
        theme={theme}
      >
        <SettingsWindow />
      </Window>

      <Window
        id="calculator"
        title="Calculator"
        isOpen={windows.calculator.isOpen}
        isMinimized={windows.calculator.isMinimized}
        isMaximized={windows.calculator.isMaximized}
        onClose={() => closeWindow('calculator')}
        onMinimize={() => minimizeWindow('calculator')}
        onMaximize={() => maximizeWindow('calculator')}
        zIndex={getWindowZIndex('calculator')}
        onFocus={() => focusWindow('calculator')}
        theme={theme}
      >
        <CalculatorWindow />
      </Window>

      <Window
        id="notepad"
        title="Notepad"
        isOpen={windows.notepad.isOpen}
        isMinimized={windows.notepad.isMinimized}
        isMaximized={windows.notepad.isMaximized}
        onClose={() => closeWindow('notepad')}
        onMinimize={() => minimizeWindow('notepad')}
        onMaximize={() => maximizeWindow('notepad')}
        zIndex={getWindowZIndex('notepad')}
        onFocus={() => focusWindow('notepad')}
        theme={theme}
      >
        <NotepadWindow />
      </Window>

      <Window
        id="credits"
        title="Credits & Attributions"
        isOpen={windows.credits.isOpen}
        isMinimized={windows.credits.isMinimized}
        isMaximized={windows.credits.isMaximized}
        onClose={() => closeWindow('credits')}
        onMinimize={() => minimizeWindow('credits')}
        onMaximize={() => maximizeWindow('credits')}
        zIndex={getWindowZIndex('credits')}
        onFocus={() => focusWindow('credits')}
        theme={theme}
      >
        <CreditsWindow />
      </Window>

      {/* Start Menu */}
      <StartMenu isOpen={startMenuOpen} onClose={closeStartMenu} onOpenWindow={openWindow} />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onToggleStartMenu={toggleStartMenu}
        onMinimizeWindow={minimizeWindow}
        startMenuOpen={startMenuOpen}
        currentTime={currentTime}
        isClient={isClient}
      />
    </div>
  );
}
