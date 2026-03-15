import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Wrapper>
      <Input
        placeholder="Search tasks..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </Wrapper>
  );
}

