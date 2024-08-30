import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code';
import { EDITOR_JS_TOOLS } from "./tools";
import '../Utils/editorjsViewer.css'


const BlogViewer = ({ data }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs-viewer',
        data: data,  // saved data to render
        tools: EDITOR_JS_TOOLS,
        readOnly: true,  // To Enable read-only mode
       
      });

      editorRef.current = editor;
     
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data]);

  return (
    <>

      <div id='editorjs-viewer' ref={editorRef.current}/> 
    </>
    
  );
};

export default BlogViewer;
