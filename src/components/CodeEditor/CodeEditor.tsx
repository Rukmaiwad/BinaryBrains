import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

import { monokai } from '@uiw/codemirror-theme-monokai';

interface Props {
    value: string;
    onChange: (value: string) => void;
    language?: 'html' | 'css' | 'javascript';
    theme?: any;
}

const CodeEditor = ({
    value,
    onChange,
    language = 'javascript',
    theme = monokai,
}: Props) => {
    const extensions = useMemo(() => {
        switch (language) {
            case 'html':
                return [html()];
            case 'css':
                return [css()];
            default:
                return [javascript({ jsx: true })];
        }
    }, [language]);

    return (
        <div style={{ height: '100%', background: '#1e1e1e' }}>
            <CodeMirror
                value={value}
                height="100vh"
                theme={theme}
                extensions={extensions}
                onChange={onChange}
            />
        </div>
    );
};

export default CodeEditor;
