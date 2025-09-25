import { useState, useEffect, useRef } from 'react';

export default function NotepadWindow() {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('Untitled.txt');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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

  return (
    <div 
      className="h-full flex flex-col"
      style={{ minWidth: '400px', minHeight: '300px' }}
    >
      {/* Menu bar */}
      <div className="flex-shrink-0 bg-gray-50 border-b border-gray-300 p-1">
        <div className="flex space-x-1">
          <button
            onClick={handleNew}
            className="px-2 py-1 text-xs hover:bg-gray-200 rounded"
            title="New (Ctrl+N)"
          >
            New
          </button>
          <button
            onClick={handleOpen}
            className="px-2 py-1 text-xs hover:bg-gray-200 rounded"
            title="Open (Ctrl+O)"
          >
            Open
          </button>
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs hover:bg-gray-200 rounded"
            title="Save (Ctrl+S)"
          >
            Save
          </button>
        </div>
      </div>

      {/* File name and status */}
      <div className="flex-shrink-0 bg-gray-100 border-b border-gray-300 px-3 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
              setHasUnsavedChanges(true);
            }}
            className="bg-transparent border-none outline-none font-medium"
            style={{ width: `${fileName.length + 1}ch` }}
          />
          {hasUnsavedChanges && <span className="text-red-500">*</span>}
        </div>
        <div className="text-gray-600">
          Lines: {stats.lines} | Words: {stats.words} | Characters: {stats.chars}
        </div>
      </div>

      {/** Text editor area */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing..."
        className="flex-1 p-3 border-none outline-none resize-none font-mono text-sm leading-relaxed"
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