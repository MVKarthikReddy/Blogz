import React, { useState } from 'react';
import AlloyEditorComponent from './AlloyEditorComponent';

function TextEditor() {
  const [content, setContent] = useState('<p>Initial content</p>');

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="App">
      <h1>AlloyEditor in Vite React</h1>
      <AlloyEditorComponent value={content} onChange={handleEditorChange} />
      <div>
        <h2>Editor Output</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default TextEditor;
