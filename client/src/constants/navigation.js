// Sidebar and bottom nav route definitions.
import {
  LayoutDashboard, ScanSearch, Lightbulb, Boxes, GitCompare,
  Grid3x3, Sparkles, Building2, Eye, Map, Mic, StickyNote,
  Swords, User,
} from 'lucide-react';

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/analyse', label: 'Analyse', icon: ScanSearch },
  { path: '/patterns', label: 'Patterns', icon: Grid3x3 },
  { path: '/generate', label: 'Generate', icon: Sparkles },
  { path: '/companies', label: 'Companies', icon: Building2 },
  { path: '/hints', label: 'Hints', icon: Lightbulb },
  { path: '/visualiser', label: 'Visualiser', icon: Boxes },
  { path: '/compare', label: 'Compare', icon: GitCompare },
  { path: '/blindspots', label: 'Blind Spots', icon: Eye },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/interview', label: 'Interview', icon: Mic },
  { path: '/notes', label: 'Notes', icon: StickyNote },
  { path: '/battle', label: 'Battle', icon: Swords },
  { path: '/profile', label: 'Profile', icon: User },
];

export const MOBILE_NAV_ITEMS = NAV_ITEMS.slice(0, 5);
