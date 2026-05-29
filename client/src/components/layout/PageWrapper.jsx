// Page shell with sidebar, top bar, and animated content area.
import { motion } from 'framer-motion';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import BottomNav from './BottomNav.jsx';
import { colors } from '../../constants/theme.js';
import { useUserStore } from '../../store/userStore.js';

export default function PageWrapper({ title, children }) {
  const theme = useUserStore((s) => s.theme);
  const isDark = theme === 'dark';

  return (
    <div
      className="flex min-h-screen"
      style={{ background: isDark ? colors.bgDark : '#F8FAFC', color: isDark ? colors.textPrimary : '#18181B' }}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col pb-20 md:pb-0">
        <TopBar title={title} />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 overflow-auto p-4 md:p-6"
        >
          {children}
        </motion.main>
      </div>
      <BottomNav />
    </div>
  );
}
