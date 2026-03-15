import styled from '@emotion/styled';

const Root = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
`;

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <Root>
      <Container>{children}</Container>
    </Root>
  );
}

