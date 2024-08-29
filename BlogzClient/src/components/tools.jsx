import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import ImageTool from '@editorjs/image'
import { imageDb } from "../Utils/FireBaseImageStore"
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';



export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    tunes: ['anyTuneName']
  },
  image: {
      class: ImageTool,
      config: {
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByFile(file){
            return new Promise((resolve, reject) => {

                const fileName = new Date().getTime() + file.name;
                const storageref = ref(imageDb, fileName);
                const uploadTask = uploadBytesResumable(storageref, file);

                uploadTask.on(
                  'state_changed',
                  (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded.
                    // Observe when the download is "complete"
                    const progress =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log(`Upload is ${progress}% done`);
                  },
                  (error) => reject(error),
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      resolve({
                        success: 1,
                        file: {
                          url: downloadURL,
                        },
                      });
                    });
                  }
                );
              });              
          },
          uploadByUrl(url){
            // your ajax request for uploading
            return new Promise((resolve) => {
                resolve({
                  success: 1,
                  file: {
                    url: url,
                  },
                });
              });
          },
          actions: [
            {
              name: 'resize',
              icon: '<svg>...</svg>',
              title: 'Resize',
              action: (block, event) => {
                const imageElement = block.querySelector('img');
                imageElement.classList.add('resizable');
              },
            },
          ],
        },
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      },
      tunes: ['anyTuneName'],
    },
  anyTuneName: {
      class:AlignmentTuneTool,
      config:{
        default: "left",
        blocks: {
          header: 'center',
          list: 'left'
        }
      },
    },

  checkList: {
    class: CheckList,
    tunes: ['anyTuneName'],
  },
  list: {
    class: List,
    tunes: ['anyTuneName'],
  },
  header: {
      class: Header,
      inlineToolbar: true,
      tunes: ['anyTuneName'],
      config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3,
            },
    },
  delimiter: Delimiter,
  link: {
    class: Link,
    tunes: ['anyTuneName'],
  },
};