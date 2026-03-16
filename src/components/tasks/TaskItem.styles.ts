import styled from '@emotion/styled';

export const TaskCard = styled.div<{ $isDragging: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.taskBg};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.spacing(1.25)} ${({ theme }) => theme.spacing(2)}
    ${({ theme }) => theme.spacing(1.25)} ${({ theme }) => theme.spacing(1.25)};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  cursor: grab;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ $isDragging }) =>
    $isDragging
      ? '0 3px 6px rgba(9, 30, 66, 0.35)'
      : '0 1px 2px rgba(9, 30, 66, 0.25)'};
  transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.taskHover};
  }
`;

export const TaskText = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 20px;
  min-height: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(9, 30, 66, 0.08);
    color: ${({ theme }) => theme.colors.text};
  }
`;

