// Left-side branding copy on the auth screen.
import { Sparkles, Target, Zap } from 'lucide-react';
import { colors, gradients } from '../../constants/theme.js';

const features = [
  { icon: Target, text: 'New accounts are created with Gmail' },
  { icon: Zap, text: 'Returning users sign in with email and password' },
];

export default function AuthHero() {
  return (
    <div style={{ maxWidth: '24rem', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', width: '3rem', height: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: '0.875rem', background: gradients.primary }}>
          <Sparkles size={20} color="#fff" />
        </div>
        <span style={{ fontSize: '1.625rem', fontWeight: 700, color: '#fff' }}>PatternSense</span>
      </div>
      <h1 style={{ margin: 0, fontSize: '2.125rem', fontWeight: 700, lineHeight: 1.2, color: '#fff' }}>
        Master DSA patterns.<br />
        <span style={{ color: colors.primary }}>Land your dream role.</span>
      </h1>
      <p style={{ marginTop: '0.875rem', color: '#a1a1aa', fontSize: '0.9375rem', lineHeight: 1.65 }}>
        AI-powered prep for FAANG and top Indian product companies.
      </p>
      <ul style={{ marginTop: '1.75rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {features.map(({ icon: Icon, text }) => (
          <li key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem', color: '#d4d4d8' }}>
            <Icon size={14} color={colors.teal} />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
