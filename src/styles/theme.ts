export const theme = {
  colors: {
    bg: '#f4f5f7', // общая подложка, как в Trello
    surface: '#ffffff', // фон ячейки дня
    surfaceAlt: '#f4f5f7', // фон инпутов / вторичных областей
    border: '#dfe1e6', // светлые границы сетки
    text: '#172b4d',
    textMuted: '#6b778c',
    primary: '#0079bf', // синий акцент, Trello‑подобный
    holiday: '#d97a00', // тёплый акцент для праздников
    taskBg: '#ffffff',
    taskHover: '#f4f5f7',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  spacing: (n: number) => `${n * 4}px`,
} as const;

