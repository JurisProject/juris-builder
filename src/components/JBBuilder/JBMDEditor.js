import React, {Suspense, lazy} from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools"

// const AceEditor = lazy(() => import('react-ace'));

const CodeEditor = ({mdTemplate, onUpdate, onChange, onValidate}) => {
    return (<Suspense fallback="Loading editor..."><AceEditor
        value={mdTemplate}
        mode="markdown"
        theme="chrome"
        onChange={onChange}
        name="editor"
        onValidate={onValidate}
        style={{width: "100%"}}
    /></Suspense>);
}

export default CodeEditor;