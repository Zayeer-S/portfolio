'use client';

import { useWindowManager } from '@/hooks/useWindowManager';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import Window from '@/components/desktop/Window';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import StartMenu from '@/components/desktop/StartMenu';
import Taskbar from '@/components/desktop/Taskbar';
import TypewriterIntro from '@/components/desktop/TypewriterIntro';
import SettingsWindow from '@/components/windows/SettingsWindow';

import ProjectsWindow from '@/components/windows/ProjectsWindow';
import TechnologiesWindow from '@/components/windows/TechnologiesWindow';
import ContactWindow from '@/components/windows/ContactWindow';

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
      
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
        <DesktopIcon
          icon="📄"
          label="CV"
          onClick={() => window.open('/Zayeer Sultan - CV.pdf')}
          hoverClass={styles.desktop.iconHover}
        />
        <DesktopIcon
          icon="📁"
          label="Projects"
          onClick={() => openWindow('projects')}
          hoverClass={styles.desktop.iconHover}
        />
        <DesktopIcon
          icon="⚙️"
          label="Technologies"
          onClick={() => openWindow('technologies')}
          hoverClass={styles.desktop.iconHover}
        />
        <DesktopIcon
          icon="👤"
          label="About Me"
          onClick={() => openWindow('about')}
          hoverClass={styles.desktop.iconHover}
        />
        <DesktopIcon
          icon="📧"
          label="Contact"
          onClick={() => openWindow('contact')}
          hoverClass={styles.desktop.iconHover}
        />
      </div>

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

      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen}
        onClose={closeStartMenu}
        onOpenWindow={openWindow}
      />

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