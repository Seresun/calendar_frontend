import styled from '@emotion/styled';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const IconButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TodayButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 13px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface CalendarHeaderProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function CalendarHeader({ title, onPrev, onNext, onToday }: CalendarHeaderProps) {
  return (
    <Header>
      <Title>{title}</Title>
      <Controls>
        <IconButton onClick={onPrev} aria-label="Previous month">
          ‹
        </IconButton>
        <IconButton onClick={onNext} aria-label="Next month">
          ›
        </IconButton>
        <TodayButton onClick={onToday}>Today</TodayButton>
      </Controls>
    </Header>
  );
}

