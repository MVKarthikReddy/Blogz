import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 
import { EDITOR_JS_TOOLS } from "./tools";
import '../Utils/editorStyles.css'

const DEFAULT_INITIAL_DATA =  {
      "time": new Date().getTime(),
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "Start writing your blog content ...",
            "level": 2
          }
        },
      ]
  }


const EditorComponent = (props) => {
  const ejInstance = useRef(null);
  const [turnEditor,setTurnEditor] = useState(false)

    const initEditor = () => {
       const editor = new EditorJS({
          holder: 'editorjs',
          onReady: () => {
            ejInstance.current = editor;
          },
          autofocus: true,
          data: props.data,
          onChange: async () => {
            let content = await editor.saver.save();
            if(props.blog){
              props.setBlog({ ...props.blog, description: content })
              console.log('Blog Data :',props.blog);
            }
            props.setFormData({ ...props.formData, description: content })
            
            // console.log('Form Data :',props.formData);
          },
          tools: EDITOR_JS_TOOLS,
        });
      };

      // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

    return(
        <div id="editorjs"  />
    );;
}

export default EditorComponent;










// import React, { memo, useEffect, useRef } from "react";
// import EditorJS from "@editorjs/editorjs";
// import { EDITOR_JS_TOOLS } from "./tools";

// const EditorComponent = ({ data, onChange, editorblock }) => {
//   const ref = useRef();
//   //Initialize editorjs
//   useEffect(() => {
//     //Initialize editorjs if we don't have a reference
//     if (!ref.current) {
//       const editor = new EditorJS({
//         autofocus: true,
//         holder: editorblock,
//         tools: EDITOR_JS_TOOLS,
//         data: data,
//         async onChange(api, event) {
//           const data = await api.saver.save();
//           onChange(data);
//         },
//       });
//       ref.current = editor;
//     }

//     //Add a return function to handle cleanup
//     return () => {
//       if (ref.current && ref.current.destroy) {
//         ref.current.destroy();
//       }
//     };
//   }, []);
//   return <div id={editorblock} />;
// };

// export default memo(EditorComponent);