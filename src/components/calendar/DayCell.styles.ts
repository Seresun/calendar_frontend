import styled from '@emotion/styled';

export const Cell = styled.div<{ $isToday: boolean; $isCurrentMonth: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  opacity: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 1 : 0.4)};
  position: relative;

  ${({ $isToday, theme }) =>
    $isToday
      ? `box-shadow: inset 0 0 0 2px ${theme.colors.primary};`
      : 'box-shadow: none;'}
`;

export const DayHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const DayNumber = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const HolidayLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.holiday};
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

export const TasksContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  max-height: 100%;
  overflow-y: auto;
`;

export const AddButton = styled.button`
  margin-top: auto;
  align-self: flex-start;
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 11px;
  cursor: pointer;

  &:hover {
    border-style: solid;
    color: ${({ theme }) => theme.colors.text};
  }
`;

