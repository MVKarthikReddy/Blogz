import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import '../Utils/editorStyles.css'

const BlogViewer = ({ data }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs-viewer',
        data: data,  // saved data to render
        tools: {
          header: Header,
          image: ImageTool,
        },
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
    <div>
      <div id="editorjs-viewer" className='bg-black bg-opacity-20 rounded' style={{  width:'800px' ,minHeight: '200px' }} />
    </div>
  );
};

export default BlogViewer;
