// Invisible component that applies theme class to document root.
import { useThemeSync } from '../../hooks/useThemeSync.js';

export default function ThemeSync() {
  useThemeSync();
  return null;
}
