import { useState, useEffect } from 'react';
import { LAYOUT_CONSTANTS } from '@/constants/layout';
import DesktopIcon from './DesktopIcon';

interface DesktopGridProps {
  icons: Array<{
    id: string;
    icon: string;
    label: string;
    onClick: () => void;
  }>;
  hoverClass?: string;
}

export default function DesktopGrid({ 
  icons, 
  hoverClass
}: DesktopGridProps) {
  const STORAGE_KEY = 'desktop-icon-positions';
  
  // Track hydration to prevent the SSR mismatch
  const [isClient, setIsClient] = useState(false);
  
  // Grid dimensions based on viewport size
  const [gridDimensions, setGridDimensions] = useState({ cols: 8, rows: 10 });
  
  // Tracks responsive top padding and cell size with proper typing
  const [topPadding, setTopPadding] = useState<number>(5);
  const [cellSize, setCellSize] = useState<number>(LAYOUT_CONSTANTS.DESKTOP_CELL_SIZE);
  
  const loadSavedPositions = () => {
    if (!isClient) return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to load icon positions:', error);
      return null;
    }
  };
  
  const savePositions = (gridState: (string | null)[][]) => {
    if (!isClient) return; // Only access localStorage on client side to prevent the server side error
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gridState));
    } catch (error) {
      console.error('Failed to save icon positions:', error);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    const updateGridDimensions = () => {
      const cellSize = window.innerWidth < LAYOUT_CONSTANTS.MOBILE_BREAKPOINT 
        ? LAYOUT_CONSTANTS.DESKTOP_CELL_SIZE_MOBILE 
        : LAYOUT_CONSTANTS.DESKTOP_CELL_SIZE;
        
      const cols = Math.floor(window.innerWidth / cellSize);
      const topPadding = window.innerWidth < LAYOUT_CONSTANTS.MOBILE_BREAKPOINT ? 15 : 5;
      const availableHeight = window.innerHeight - LAYOUT_CONSTANTS.TASKBAR_HEIGHT - topPadding;
      const rows = Math.floor(availableHeight / cellSize);
      setGridDimensions({ cols, rows });
      
      setTopPadding(topPadding);
      setCellSize(cellSize);
    };
    
    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, []);

  // Track icons; note how we load with a default grid for SSR then load saved positions after hydration
  const [gridState, setGridState] = useState<(string | null)[][]>(() => {
    return Array(10).fill(null).map(() => Array(8).fill(null));
  });

  useEffect(() => {
    if (isClient) {
      const savedPositions = loadSavedPositions();
      if (savedPositions && savedPositions.length > 0) {
        setGridState(savedPositions);
      }
    }
  }, [isClient]);

  // Update grid state when dimensions change
  useEffect(() => {
    setGridState(prevGrid => {
      const newGrid = Array(gridDimensions.rows).fill(null).map(() => Array(gridDimensions.cols).fill(null));
      
      const validIconIds = new Set(icons.map(icon => icon.id));
      
      for (let r = 0; r < Math.min(prevGrid.length, gridDimensions.rows); r++) {
        for (let c = 0; c < Math.min(prevGrid[0]?.length || 0, gridDimensions.cols); c++) {
          const iconId = prevGrid[r] && prevGrid[r][c];
          if (iconId && validIconIds.has(iconId)) {
            newGrid[r][c] = iconId;
          }
        }
      }
      
      // Place any icons that don't have positions yet
      const placedIcons = new Set();
      newGrid.forEach(row => row.forEach(cell => {
        if (cell) placedIcons.add(cell);
      }));
      
      const unplacedIcons = icons.filter(icon => !placedIcons.has(icon.id));
      let currentRow = 0, currentCol = 0;
      
      for (const icon of unplacedIcons) {
        while (currentRow < gridDimensions.rows && newGrid[currentRow][currentCol] !== null) {
          currentRow++;
          if (currentRow >= gridDimensions.rows) {
            currentRow = 0;
            currentCol++;
          }
        }
        
        if (currentCol < gridDimensions.cols && currentRow < gridDimensions.rows) {
          newGrid[currentRow][currentCol] = icon.id;
        }
      }
      
      savePositions(newGrid);
      return newGrid;
    });
  }, [gridDimensions, icons]);

  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    setHoveredCell(null);
    const data = e.dataTransfer.getData('text/plain');
    const [draggedIconEmoji, draggedLabel] = data.split('|');
    
    const draggedIconObj = icons.find(icon => 
      icon.icon === draggedIconEmoji && icon.label === draggedLabel
    );
    
    if (!draggedIconObj) return;

    setGridState(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      
      // Remove icon from its current position
      for (let r = 0; r < gridDimensions.rows; r++) {
        for (let c = 0; c < gridDimensions.cols; c++) {
          if (newGrid[r][c] === draggedIconObj.id) {
            newGrid[r][c] = null;
          }
        }
      }
      
      // Place icon in new position (if empty)
      if (newGrid[row][col] === null) {
        newGrid[row][col] = draggedIconObj.id;
      }
      
      savePositions(newGrid);
      return newGrid;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const handleDragEnter = (e: React.DragEvent, row: number, col: number) => {
    e.preventDefault();
    setHoveredCell(`${row}-${col}`);
  };

  // Remove hover if we're leaving this cell but not entering a child
  const handleDragLeave = (e: React.DragEvent, row: number, col: number) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setHoveredCell(null);
    }
  };

  const getIconById = (id: string) => {
    return icons.find(icon => icon.id === id);
  };

  return (
    <div 
      className="fixed inset-0 grid gap-0"
      style={{
        gridTemplateColumns: `repeat(${gridDimensions.cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${gridDimensions.rows}, ${cellSize}px)`,
        paddingBottom: `${LAYOUT_CONSTANTS.TASKBAR_HEIGHT}px`,
        paddingTop: `${topPadding}px`,
      }}
    >
      {/* Render grid cells as drop zones */}
      {Array(gridDimensions.rows).fill(null).map((_, row) =>
        Array(gridDimensions.cols).fill(null).map((_, col) => {
          // Safety check to prevent undefined access
          const iconId = gridState[row] && gridState[row][col] ? gridState[row][col] : null;
          const icon = iconId ? getIconById(iconId) : null;
          
          return (
            <div
              key={`${row}-${col}`}
              className={`border border-transparent rounded transition-colors ${
                hoveredCell === `${row}-${col}` ? 'bg-white/20' : ''
              }`}
              style={{ 
                width: `${cellSize}px`, 
                height: `${cellSize}px` 
              }}
              onDrop={(e) => handleDrop(e, row, col)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, row, col)}
              onDragLeave={(e) => handleDragLeave(e, row, col)}
            >
              {icon && (
                <DesktopIcon
                  icon={icon.icon}
                  label={icon.label}
                  onClick={icon.onClick}
                  hoverClass={hoverClass}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}