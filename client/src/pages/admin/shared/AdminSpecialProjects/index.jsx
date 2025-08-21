// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import RichTextEditor from "../../RichTextEditor";
// import Edit from "../../../../assets/edit.svg";
// import { createSpecialProject, deleteSpecialProject, getSpecialProjects, updateSpecialProject } from "@/http/specialprojects";

// const AdminSpecialProjects = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [aboutValues, setAboutValues] = useState([]);
//   const [content, setContent] = useState("");
//   const [newValue, setNewValue] = useState({
//     name: "",
//     desc: "",
//     imagePreviews: [],
//     imageFiles: [],
//     existingImages: [], 
//   });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     getSpecialProjects()
//       .then(res => {
//         if (!res?.data) throw new Error("No data received");
//         const items = Array.isArray(res.data) ? res.data : [];
//         const normalized = items.map(item => ({
//           id: item.id,
//           name: item.name || "", 
//           desc: item.content || "",
//           images: (item.images || []).map(img => 
//             img.startsWith('http') ? img : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//           ),
//         }));
//         setAboutValues(normalized);
//       })
//       .catch(err => {
//         console.error("Failed to load projects:", err);
//         setAboutValues([]);
//       });
//   }, []);
  
  

//   const handleDelete = (id) => {
//     deleteSpecialProject(id).then(() => {
//       setAboutValues((prev) => prev.filter((val) => val.id !== id));
//     });
//   };
//   const handleEdit = (val) => {
//     setIsEditing(true);
//     setEditId(val.id);
  
//     setNewValue({
//       name: val.name,
//       imageFiles: [],
//       imagePreviews: val.images.map((url) => ({
//         url,
//         isExisting: true,
//       })),
//       existingImages: val.images.map((url) => {
//         const parts = url.split("/");
//         return parts[parts.length - 1].split("?")[0]; // <- FIXED: strips query params
//       }),
//     });
  
//     setContent(val.desc);
//     setModalOpen(true);
//   };
  
  
//   const resetForm = () => {
//     setNewValue({
//       name: "",
//       desc: "",
//       imagePreviews: [],
//       imageFiles: [],
//       existingImages: [],
//     });
//     setContent("");
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

  
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   if (!newValue.name.trim() || !content.trim()) {
//   //     alert("Zəhmət olmasa bütün xanaları doldurun.");
//   //     return;
//   //   }
  
//   //   try {
//   //     const formData = new FormData();
//   //     const payload = {
//   //       name: newValue.name.trim(),
//   //       content: content.trim(),
//   //       images: newValue.existingImages,
//   //     };
//   //     formData.append("specialDto", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      
      
//   //     newValue.imageFiles.forEach((file) => {
//   //       formData.append("images", file);
//   //     });
//   //     const response = isEditing
//   //       ? await updateSpecialProject(editId, formData)
//   //       : await createSpecialProject(formData);
  
//   //     // Refresh the list after successful operation
//   //     const updated = await getSpecialProjects();
//   //     setAboutValues(
//   //       updated.data.map((item) => ({
//   //         id: item.id,
//   //         name: item.name,
//   //         desc: item.content,
//   //         images: item.images.map(
//   //           (img) => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//   //         ),
//   //       }))
//   //     );
  
//   //     resetForm();
//   //   } catch (err) {
//   //     console.error("Submission error:", err.response?.data || err.message);
//   //     alert("Əməliyyat zamanı xəta baş verdi.");
//   //   }
//   // };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!newValue.name.trim() || !content.trim()) {
//       alert("Zəhmət olmasa bütün xanaları doldurun.");
//       return;
//     }
  
//     try {
//       const formData = new FormData();
  
//       const payload = {
//         name: newValue.name.trim(),
//         content: content.trim(),
//       };
  
//       // ✅ Add existing images if editing
//       if (isEditing) {
//         payload.images = [...newValue.existingImages];
//       }
  
//       formData.append(
//         isEditing ? "request" : "specialDto",
//         new Blob([JSON.stringify(payload)], { type: "application/json" })
//       );
      
  
//       // ✅ Append only new images
//       newValue.imageFiles.forEach((file) => {
//         formData.append("images", file);
//       });
  
//       if (isEditing) {
//         await updateSpecialProject(editId, formData);
//       } else {
//         await createSpecialProject(formData);
//       }
  
//       const updated = await getSpecialProjects();
//       setAboutValues(
//         updated.data.map((item) => ({
//           id: item.id,
//           name: item.name,
//           desc: item.content,
//           images: item.images.map(
//             (img) =>
//               `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//           ),
//         }))
//       );
  
//       resetForm();
//     } catch (err) {
//       console.error("Submission error:", err.response?.data || err.message);
//       alert("Əməliyyat zamanı xəta baş verdi.");
//     }
//   };
  
  
//   return (
//     <div className="p-8 mx-auto">
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
//           onClick={resetForm}
//         >
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
//               onClick={resetForm}
//               aria-label="Close modal"
//             >
//               &times;
//             </button>

//             <div className={clsx(styles.cardname)}> Özəl layihələr</div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className={clsx(styles.modalinput)}
//                 value={newValue.name}
//                 onChange={(e) =>
//                   setNewValue({ ...newValue, name: e.target.value })
//                 }
//               />

//               <RichTextEditor value={content} onChange={setContent} />
//               <input
//   type="file"
//   accept="image/*"
//   multiple
//   className="border p-2 w-full"
//   onChange={(e) => {
//     const files = Array.from(e.target.files);
  
//     setNewValue(prev => ({
//       ...prev,
//       imageFiles: [...prev.imageFiles, ...files],
//       imagePreviews: [
//         ...prev.imagePreviews,
//         ...files.map(file => ({ url: URL.createObjectURL(file), isExisting: false, file })),
//       ],
//     }));
  
//     e.target.value = "";
//   }}
  
// />
//                  <div className="flex gap-2 flex-wrap">
//                  {newValue.imagePreviews.map(({ url, isExisting, file }, index) => (
//   <div key={index} className="relative">
//     <img
//       src={url}
//       alt={`preview-${index}`}
//       className="w-20 h-20 object-cover rounded"
//     />
//     <button
//       type="button"
//       className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//       onClick={() => {
//         const updatedPreviews = [...newValue.imagePreviews];
//         const removed = updatedPreviews.splice(index, 1)[0];
        
//         let updatedFiles = [...newValue.imageFiles];
//         let updatedExisting = [...newValue.existingImages];
        
//         if (removed.isExisting) {
//           // Extract filename safely
//           const urlParts = removed.url.split("/");
//           const filename = urlParts[urlParts.length - 1];
//           updatedExisting = updatedExisting.filter(name => name !== filename);
//         } else {
//           updatedFiles = updatedFiles.filter(f => f !== removed.file);
//         }
        
//         setNewValue(prev => ({
//           ...prev,
//           imagePreviews: updatedPreviews,
//           imageFiles: updatedFiles,
//           existingImages: updatedExisting,
//         }));
//       }}
      
//     >
//       ×
//     </button>
//   </div>
// ))}

// </div>



//               <button className={clsx(styles.modalbtn)} type="submit">
//                 {isEditing ? "Yenilə" : "Yadda saxla"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className={clsx(styles.card)}>
//         <table className="w-full table-auto border-collapse">
//           <tbody>
//             <tr>
//               <td className={clsx(styles.cardname)}>
//               Özəl layihələr
//                 <div
//                   className={clsx(
//                     styles.cardsearch,
//                     "flex items-center gap-2"
//                   )}
//                 >
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border-b border-gray-400 px-0 w-full text-sm outline-none"
//                   />
//                   <SearchIcon className="w-5 h-5 text-gray-500" />
//                 </div>
//                 <button
//                   className={clsx(styles.cardopen)}
//                   onClick={() => {
//                     setIsEditing(false);
//                     setEditId(null);
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>

//             {aboutValues
//             .filter(val => {
//               if (!val?.name || typeof val.name !== 'string') return false;
//               return val.name.toLowerCase().includes(searchTerm.toLowerCase());
//             })
//               .map(val => (
//                 <tr key={val.id}>
//                   <td className="w-15">
//                   {val.images && val.images.length > 0 && (
//                 <img
//                     src={val.images[0]}
//                     alt="preview"
//                     className="w-12 h-12 object-contain"
//                 />
//                 )}

//                   </td>

//                   <td className={clsx(styles.cardrow)}>
//                     <div
//                       className={clsx(styles.cardedit)}
//                       onClick={() => handleEdit(val)}
//                     >
//                       <Edit />
//                     </div>
//                     {val.name}
//                   </td>

//                   <td>
//                     <button
//                       onClick={() => handleDelete(val.id)}
//                       className="text-red-500 hover:underline"
//                     >
//                       <Trash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminSpecialProjects;
