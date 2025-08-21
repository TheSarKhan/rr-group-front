import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const RichTextEditor = ({ value = "", onChange }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  // useEffect(() => {
  //   if (!editorRef.current || quillInstance.current) return; 
  
  //   const quill = new Quill(editorRef.current, {
  //     theme: "snow",
  //     modules: {
  //       toolbar: {
  //         container: "#toolbar",
  //         handlers: {
  //           image: function () {
  //             const input = document.createElement("input");
  //             input.setAttribute("type", "file");
  //             input.setAttribute("accept", "image/*");
  //             input.click();
  
  //             input.onchange = () => {
  //               const file = input.files[0];
  //               if (file) {
  //                 const reader = new FileReader();
  //                 reader.onload = () => {
  //                   const range = quill.getSelection();
  //                   quill.insertEmbed(range.index, "image", reader.result);
  //                 };
  //                 reader.readAsDataURL(file);
  //               }
  //             };
  //           }
  //         }
  //       },
  //       imageResize: {},
  //     },
  //   });
  
  //   quill.root.innerHTML = value;
  //   quill.on("text-change", () => {
  //     onChange(quill.root.innerHTML);
  //   });
  
  //   quillInstance.current = quill; // <-- save reference
  // }, []);
  useEffect(() => {
    if (!editorRef.current || quillInstance.current) return;
  
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: {
          container: "#toolbar",
          handlers: {
            image: function () {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.click();
  
              input.onchange = () => {
                const file = input.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const range = quill.getSelection();
                    quill.insertEmbed(range?.index || 0, "image", reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              };
            },
          },
        },
        imageResize: {},
      },
    });
  
    quill.root.innerHTML = value;
    quill.on("text-change", () => {
      onChange(quill.root.innerHTML);
    });
  
    quillInstance.current = quill;
  }, []);
  
  // ✅ NEW useEffect to respond to prop changes
  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.root.innerHTML = value;
    }
  }, [value]);
  
  
  return (
    <>
      <div id="toolbar">
        <select className="ql-header" defaultValue="">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value=""></option>
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-link" />
        <button className="ql-image" />
      </div>

      {/* <div ref={editorRef} style={{ minHeight: "100px", maxHeight:"150px" }} /> */}
      <div
  ref={editorRef}
  style={{
    minHeight: "150px",
    maxHeight: "200px",
    overflowY: "auto",
    whiteSpace: "normal",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "4px",
    width: "100%",       // add this
    maxWidth: "100%",    // add this
    boxSizing: "border-box",  
  }}
/>

    </>
  );
};

export default RichTextEditor;
