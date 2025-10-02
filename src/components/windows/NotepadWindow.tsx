import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function NotepadWindow() {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('Untitled.txt');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);
  
  const STORAGE_KEY = 'notepad-content';
  const FILENAME_KEY = 'notepad-filename';

  // Loads saved content on mount
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem(STORAGE_KEY);
      const savedFilename = localStorage.getItem(FILENAME_KEY);
      
      if (savedContent) {
        setContent(savedContent);
        setHasUnsavedChanges(false);
      }
      if (savedFilename) {
        setFileName(savedFilename);
      }
    } catch (error) {
      console.error('Failed to load notepad content:', error);
    }
  }, []);

  // Autosaves content changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, content);
        localStorage.setItem(FILENAME_KEY, fileName);
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error('Failed to save notepad content:', error);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [content, fileName]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleNew = () => {
    if (hasUnsavedChanges) {
      const confirmNew = window.confirm('You have unsaved changes. Create a new file anyway?');
      if (!confirmNew) return;
    }
    setContent('');
    setFileName('Untitled.txt');
    setHasUnsavedChanges(false);
    textareaRef.current?.focus();
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setHasUnsavedChanges(false);
  };

  const handleOpen = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.md,.js,.css,.html,.json,.xml';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setContent(text);
          setFileName(file.name);
          setHasUnsavedChanges(false);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const getStats = () => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const chars = content.length;
    const lines = content.split('\n').length;
    return { words, chars, lines };
  };

  const stats = getStats();

  const menuBarBg = theme === 'modern-dark' ? 'bg-neutral-800' : 'bg-gray-50';
  const statusBarBg = theme === 'modern-dark' ? 'bg-neutral-800' : 'bg-gray-100';
  const textAreaBg = theme === 'modern-dark' ? 'bg-neutral-900' : 'bg-white';

  return (
    <div 
      className="h-full flex flex-col"
      style={{ minWidth: '400px', minHeight: '300px' }}
      role="application"
    >
      {/* Menu bar */}
      <div role="menubar" aria-label='File Menu'
      className={`flex-shrink-0 ${menuBarBg} border-b ${styles.window.content.border} p-1`}>
        <div className="flex space-x-1">
          <button
            onClick={handleNew}
            aria-label='Create new text file'
            className={`px-2 py-1 text-xs ${styles.window.content.hover} rounded ${styles.window.content.text}`}
            title="New (Ctrl+N)"
          >
            New
          </button>
          <button
            onClick={handleOpen}
            aria-label='Open text file'
            className={`px-2 py-1 text-xs ${styles.window.content.hover} rounded ${styles.window.content.text}`}
            title="Open (Ctrl+O)"
          >
            Open
          </button>
          <button
            onClick={handleSave}
            aria-label='Save text file'
            className={`px-2 py-1 text-xs ${styles.window.content.hover} rounded ${styles.window.content.text}`}
            title="Save (Ctrl+S)"
          >
            Save
          </button>
        </div>
      </div>

      {/* File name and status */}
      <div role="status" aria-label='Document'
      className={`flex-shrink-0 ${statusBarBg} border-b ${styles.window.content.border} px-3 py-1 flex items-center justify-between text-xs`}>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
              setHasUnsavedChanges(true);
            }}
            aria-label='File name'
            className={`bg-transparent border-none outline-none font-medium ${styles.window.content.text}`}
            style={{ width: `${fileName.length + 1}ch` }}
          />
          {hasUnsavedChanges && <span className="text-red-500">*</span>}
        </div>
        <div className={styles.window.content.textSecondary}>
          Lines: {stats.lines} | Words: {stats.words} | Characters: {stats.chars}
        </div>
      </div>

      {/* Text editor area */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing..."
        aria-label='Typing area'
        className={`flex-1 p-3 border-none outline-none resize-none font-mono text-sm leading-relaxed ${textAreaBg} ${styles.window.content.text}`}
        style={{
          fontFamily: 'Consolas, "Courier New", monospace',
          tabSize: 4,
        }}
        onKeyDown={(e) => {
          if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
              case 'n':
                e.preventDefault();
                handleNew();
                break;
              case 'o':
                e.preventDefault();
                handleOpen();
                break;
              case 's':
                e.preventDefault();
                handleSave();
                break;
            }
          }
        }}
      />
    </div>
  );
}