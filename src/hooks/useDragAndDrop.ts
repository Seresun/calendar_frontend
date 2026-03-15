import { useCallback, useState } from 'react';

export interface DragState {
  taskId: string | null;
  sourceDate: string | null;
}

export function useDragAndDrop() {
  const [dragState, setDragState] = useState<DragState>({
    taskId: null,
    sourceDate: null,
  });

  const startDrag = useCallback((taskId: string, date: string) => {
    setDragState({ taskId, sourceDate: date });
  }, []);

  const endDrag = useCallback(() => {
    setDragState({ taskId: null, sourceDate: null });
  }, []);

  return {
    dragState,
    startDrag,
    endDrag,
  };
}

