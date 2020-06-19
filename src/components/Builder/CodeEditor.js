import React, {Suspense, lazy} from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"

// const AceEditor = lazy(() => import('react-ace'));

const CodeEditor = ({json, onUpdate, onChange, onValidate}) => {
    return (<Suspense fallback="Loading editor..."><AceEditor
        value={JSON.stringify(json, null, '\t')}
        mode="json"
        theme="github"
        onChange={onChange}
        name="editor"
        onValidate={onValidate}
        style={{width: "100%"}}
    /></Suspense>);
}

export default CodeEditor;