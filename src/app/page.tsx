'use client';

import { useWindowManager } from '@/hooks/useWindowManager';
import Window from '@/components/desktop/Window';
import DesktopIcon from '@/components/desktop/DesktopIcon';
import StartMenu from '@/components/desktop/StartMenu';
import Taskbar from '@/components/desktop/Taskbar';
import TypewriterIntro from '@/components/desktop/TypewriterIntro';

import ProjectsWindow from '@/components/windows/ProjectsWindow';
import TechnologiesWindow from '@/components/windows/TechnologiesWindow';
import ContactWindow from '@/components/windows/ContactWindow';

export default function Home() {
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
    <div className="h-screen w-screen overflow-hidden relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      {/* Desktop Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-800"></div>

      <TypewriterIntro/>
      
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
        <DesktopIcon
          icon="📄"
          label="CV"
          onClick={() => window.open('/Zayeer Sultan - CV.pdf')}
        />
        <DesktopIcon
          icon="📁"
          label="Projects"
          onClick={() => openWindow('projects')}
        />
        <DesktopIcon
          icon="⚙️"
          label="Technologies"
          onClick={() => openWindow('technologies')}
        />
        <DesktopIcon
          icon="👤"
          label="About Me"
          onClick={() => openWindow('about')}
        />
        <DesktopIcon
          icon="📧"
          label="Contact"
          onClick={() => openWindow('contact')}
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
      >
        <ContactWindow />
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