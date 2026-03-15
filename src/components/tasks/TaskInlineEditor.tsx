import { useEffect, useRef, useState } from 'react';
import { Input } from './TaskInlineEditor.styles';

interface TaskInlineEditorProps {
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

export function TaskInlineEditor({
  initialText,
  onSave,
  onCancel,
}: TaskInlineEditorProps) {
  const [value, setValue] = useState(initialText);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, []);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      onCancel();
      return;
    }
    onSave(trimmed);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      onCancel();
    }
  };

  return (
    <Input
      ref={ref}
      rows={2}
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={handleSubmit}
      onKeyDown={handleKeyDown}
    />
  );
}

