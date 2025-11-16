import { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  language?: "html" | "css" | "javascript";
}

const CodeEditor = ({ value, onChange, language = "javascript" }: Props) => {
  // useMemo to avoid re-creating extensions on every render
  const extensions = useMemo(() => {
    switch (language) {
      case "html":
        return [html()];
      case "css":
        return [css()];
      default:
        return [javascript({ jsx: true })];
    }
  }, [language]);

  return (
    <div style={{ height: "100%", background: "#1e1e1e" }}>
      <CodeMirror
        value={value}
        height="100%"
        theme="dark"
        extensions={extensions}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;