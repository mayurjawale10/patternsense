// Wrapped Monaco editor — defaults to vs-dark theme.
import Editor from '@monaco-editor/react';

export default function MonacoEditor({ code = '', language = 'javascript', readOnly = false, onChange, height = 300 }) {
  return (
    <Editor
      height={height}
      language={language}
      value={code}
      theme="vs-dark"
      onChange={onChange}
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 13,
        scrollBeyondLastLine: false,
        padding: { top: 12 },
      }}
    />
  );
}
