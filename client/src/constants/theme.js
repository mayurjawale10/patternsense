// All design tokens — never hardcode colors in components.
export const colors = {
  primary: '#7F77DD',
  teal: '#1D9E75',
  amber: '#EF9F27',
  coral: '#D85A30',
  bgDark: '#0B0D12',
  bgCard: 'rgba(255,255,255,0.04)',
  borderGlass: 'rgba(255,255,255,0.08)',
  textPrimary: '#F4F4F5',
  textMuted: '#A1A1AA',
  success: '#1D9E75',
  danger: '#D85A30',
};

export const gradients = {
  primary: 'linear-gradient(135deg, #7F77DD 0%, #5B54B8 100%)',
  card: 'linear-gradient(145deg, rgba(127,119,221,0.08) 0%, rgba(255,255,255,0.02) 100%)',
};

export const layout = {
  sidebarWidth: '260px',
  topBarHeight: '64px',
  mobileBreakpoint: 768,
};

export const motion = {
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  fade: { duration: 0.25 },
};
