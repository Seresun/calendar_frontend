import { useState } from 'react';
import type { Task } from '../../types/Task';
import { TaskCard, TaskText } from './TaskItem.styles';
import { TaskInlineEditor } from './TaskInlineEditor';

interface TaskItemProps {
  task: Task;
  index: number;
  date: string;
  onUpdateText: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string, date: string, index: number) => void;
  onDragEnd: () => void;
}

export function TaskItem({
  task,
  index,
  date,
  onUpdateText,
  onDelete,
  onDragStart,
  onDragEnd,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleSave = (text: string) => {
    setIsEditing(false);
    if (text !== task.text) {
      onUpdateText(task.id, text);
    }
  };

  if (isEditing) {
    return (
      <TaskInlineEditor
        initialText={task.text}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <TaskCard
      draggable
      $isDragging={isDragging}
      onDoubleClick={() => setIsEditing(true)}
      onContextMenu={event => {
        event.preventDefault();
        onDelete(task.id);
      }}
      onDragStart={event => {
        event.dataTransfer.effectAllowed = 'move';
        const payload = `${task.id}:${date}:${index}`;
        event.dataTransfer.setData('text/plain', payload);
        setIsDragging(true);
        onDragStart(task.id, date, index);
      }}
      onDragEnd={() => {
        setIsDragging(false);
        onDragEnd();
      }}
    >
      <TaskText>{task.text}</TaskText>
    </TaskCard>
  );
}

