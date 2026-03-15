import styled from '@emotion/styled';

export const TaskCard = styled.div<{ $isDragging: boolean }>`
  background: ${({ theme }) => theme.colors.taskBg};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing(1.5)};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  cursor: grab;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ $isDragging }) =>
    $isDragging
      ? '0 2px 4px rgba(9, 30, 66, 0.25)'
      : '0 1px 1px rgba(9, 30, 66, 0.15)'};
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.taskHover};
  }
`;

export const TaskText = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;

