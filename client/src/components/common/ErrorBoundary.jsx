// Catches render errors so the app does not show a blank white screen.
import { Component } from 'react';
import { colors } from '../../constants/theme.js';

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown error' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: 24,
            background: colors.bgDark,
            color: colors.textPrimary,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <h1 style={{ color: colors.coral }}>Something went wrong</h1>
          <p style={{ color: colors.textMuted }}>{this.state.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: '10px 16px',
              background: colors.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
