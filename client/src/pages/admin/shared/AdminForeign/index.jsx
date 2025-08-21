// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import RichTextEditor from "../../RichTextEditor";
// import Edit from "../../../../assets/edit.svg";
// import { createForeign, deleteForeign, getForeigns, updateForeign } from "@/http/foreign";

// const AdminForeign = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [aboutValues, setAboutValues] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newValue, setNewValue] = useState({
//     header: "",         
//     description: "",
//     content: "",       
//     iconFile: null,
//     iconPreview: null,
//     existingIcon: "",
//     imageFiles: [],
//     imagePreviews: [],
//     existingImages: [],
//   });
  

//   useEffect(() => {
//     getForeigns()
//       .then((res) => {
//         const items = Array.isArray(res?.data) ? res.data : [];
//         const normalized = items.map((item) => ({
//           id: item.id,
//           header: item.header,
//           description: item.description,
//           content: item.content?.contentWrite || "",
//           icon: item.icon,
//           iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
//           images: (item.content?.images || []).map((img) =>
//             img.startsWith("http")
//               ? img
//               : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//           ),
//         }));
//         setAboutValues(normalized);
//       })
//       .catch((err) => {
//         console.error("Failed to load foreigns:", err);
//         setAboutValues([]);
//       });
//   }, []);
  

//   const handleDelete = (id) => {
//     deleteForeign(id).then(() => {
//       setAboutValues((prev) => prev.filter((val) => val.id !== id));
//     });
//   };

//   const handleEdit = (val) => {
//     setIsEditing(true);
//     setEditId(val.id);
//     setNewValue({
//       header: val.header,
//       description: val.description,
//       content: val.content,

//       iconFile: null,
//       iconPreview: val.iconPreview,
//       existingIcon: val.icon,

//       imageFiles: [],
//       imagePreviews: val.images.map((url) => ({
//         url,
//         isExisting: true,
//       })),
//       existingImages: val.images.map((url) => url.split("/").pop()),
//     });
//     setModalOpen(true);
//   };

//   const resetForm = () => {
//     setNewValue({
//       header: "",
//       description: "",
//       content: "",
//       iconFile: null,
//       iconPreview: null,
//       existingIcon: "",

//       imageFiles: [],
//       imagePreviews: [],
//       existingImages: [],
//     });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };
  
// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (
//       !newValue.header.trim() ||
//       !newValue.description.trim() ||
//       !newValue.content.trim()
//     ) {
//       alert("Zəhmət olmasa bütün xanaları doldurun.");
//       return;
//     }
  
//     try {
//       const formData = new FormData();
  
//       const requestPayload = {
//         header: newValue.header.trim(),
//         description: newValue.description.trim(),
//         content: {
//           contentWrite: newValue.content.trim(),
//         },
//       };
  
//       formData.append(
//         "foreignMissionDto",
//         new Blob([JSON.stringify(requestPayload)], {
//           type: "application/json",
//         })
//       );
  
//       if (newValue.iconFile) {
//         formData.append("icon", newValue.iconFile);
//       } else if (newValue.existingIcon) {
//         const response = await fetch(
//           `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${newValue.existingIcon}`
//         );
//         const blob = await response.blob();
//         const filename = newValue.existingIcon.split("/").pop() || "icon.png";
//         const file = new File([blob], filename, { type: blob.type });
//         formData.append("icon", file);
//       } else {
//         alert("İkon faylı tələb olunur.");
//         return;
//       }
  
//       newValue.imageFiles.forEach((file) => {
//         formData.append("images", file);
//       });
  
//       const response = isEditing
//         ? await updateForeign(editId, formData)
//         : await createForeign(formData);
  
//         const updated = await getForeigns();
//         const updatedItems = Array.isArray(updated?.data) ? updated.data : [];
        
//         setAboutValues(
//           updatedItems.map((item) => ({
//             id: item.id,
//             header: item.header,
//             description: item.description,
//             content: item.content?.contentWrite || "",
//             icon: item.icon,
//             iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
//             images: (item.content?.images || []).map(
//               (img) => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//             ),
//           }))
//         );
        
  
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

//             <div className={clsx(styles.cardname)}>Xarici 
//               nümayəndəliklər</div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//   type="text"
//   placeholder="Başlıq"
//   value={newValue.header}
//   onChange={(e) =>
//     setNewValue({ ...newValue, header: e.target.value })
//   }
//   className={clsx(styles.modalinput)}
// />

// <input
//   type="text"
//   placeholder="Təsvir"
//   value={newValue.description}
//   onChange={(e) =>
//     setNewValue({ ...newValue, description: e.target.value })
//   }
//   className={clsx(styles.modalinput)}
// />

// <RichTextEditor
//   value={newValue.content}
//   onChange={(value) =>
//     setNewValue({ ...newValue, content: value })
//   }
// />

//               <label className="block font-semibold">İkon yüklə (tək):</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;
//                   setNewValue((prev) => ({
//                     ...prev,
//                     iconFile: file,
//                     iconPreview: URL.createObjectURL(file),
//                   }));
//                 }}
//               />

//               {newValue.iconPreview && (
//                 <img
//                   src={newValue.iconPreview}
//                   alt="icon preview"
//                   className="w-10 h-10 object-contain rounded mt-2"
//                 />
//               )}
//               <label className="block font-semibold mt-4">
//                 Şəkillər yüklə (birdən çox):
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="border p-2 w-full"
//                 onChange={(e) => {
//                   const files = Array.from(e.target.files);
//                   setNewValue((prev) => ({
//                     ...prev,
//                     imageFiles: [...prev.imageFiles, ...files],
//                     imagePreviews: [
//                       ...prev.imagePreviews,
//                       ...files.map((file) => ({
//                         url: URL.createObjectURL(file),
//                         isExisting: false,
//                         file,
//                       })),
//                     ],
//                   }));
//                   e.target.value = "";
//                 }}
//               />
//               <div className="flex gap-2 flex-wrap mt-2">
//                 {newValue.imagePreviews.map(({ url, isExisting, file }, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={url}
//                       alt={`preview-${index}`}
//                       className="w-10 h-10 object-cover rounded"
//                     />
//                     <button
//                       type="button"
//                       className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                       onClick={() => {
//                         const updatedPreviews = [...newValue.imagePreviews];
//                         const removed = updatedPreviews.splice(index, 1)[0];

//                         let updatedFiles = [...newValue.imageFiles];
//                         let updatedExisting = [...newValue.existingImages];

//                         if (removed.isExisting) {
//                           const filename = removed.url.split("/").pop();
//                           updatedExisting = updatedExisting.filter(
//                             (name) => name !== filename
//                           );
//                         } else {
//                           updatedFiles = updatedFiles.filter(
//                             (f) => f !== removed.file
//                           );
//                         }

//                         setNewValue((prev) => ({
//                           ...prev,
//                           imagePreviews: updatedPreviews,
//                           imageFiles: updatedFiles,
//                           existingImages: updatedExisting,
//                         }));
//                       }}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>

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
//               Xarici 
//               <br />
//               nümayəndəliklər
//                 <div
//                   className={clsx(styles.cardsearch, "flex items-center gap-2")}
//                 >
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border-b border-gray-400 px-0 w-full text-sm outline-none"
//                     placeholder="Axtar..."
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
//               .filter((val) => {
//                 if (!val?.header || typeof val.header !== "string") return false;
//                 return val.header.toLowerCase().includes(searchTerm.toLowerCase());
//               })
//               .map((val) => (
//                 <tr key={val.id}>
//                   <td className="w-16">
//                     {val.iconPreview && (
//                       <img
//                         src={val.iconPreview}
//                         alt="icon"
//                         className="w-12 h-12 object-contain rounded"
//                       />
//                     )}
//                   </td>

//                   <td className={clsx(styles.cardrow)}>
//                     <div
//                       className={clsx(styles.cardedit)}
//                       onClick={() => handleEdit(val)}
//                     >
//                       <Edit />
//                     </div>
//                     {val.header}
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

// export default AdminForeign;


// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import RichTextEditor from "../../RichTextEditor";
// import Edit from "../../../../assets/edit.svg";
// import {
//   createForeign,
//   deleteForeign,
//   getForeigns,
//   updateForeign,
// } from "@/http/foreign";

// const AdminForeign = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [aboutValues, setAboutValues] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newValue, setNewValue] = useState({
//     header: "",
//     description: "",
//     content: "",
//     iconFile: null,
//     iconPreview: null,
//     existingIcon: "",
//     imageFiles: [],
//     imagePreviews: [],
//     existingImages: [],
//   });

//   const handleInputChange = (field, value) => {
//     setNewValue((prev) => ({ ...prev, [field]: value }));
//   };

//   useEffect(() => {
//     getForeigns()
//       .then((res) => {
//         const items = Array.isArray(res?.data) ? res.data : [];
//         const normalized = items.map((item) => ({
//           id: item.id,
//           header: item.header,
//           description: item.description,
//           content: item.content?.contentWrite || item.content || "",
//           icon: item.icon,
//           iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
//           images:
//             item.content?.images?.map((img) =>
//               img.startsWith("http")
//                 ? img
//                 : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//             ) || [],
//         }));
//         setAboutValues(normalized);
//       })
//       .catch((err) => {
//         console.error("Failed to load foreigns:", err);
//         setAboutValues([]);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     deleteForeign(id).then(() => {
//       setAboutValues((prev) => prev.filter((val) => val.id !== id));
//     });
//   };

//   const handleEdit = (val) => {
//     console.log("Editing this one:", val);
  
//     setIsEditing(true);
//     setEditId(val.id);
  
//     setNewValue({
//       header: val.header || "",
//       description: val.description || "",
//       content: val.content || "",
//       iconFile: null,
//       iconPreview: val.iconPreview || null,
//       existingIcon: val.icon || "",
//       imageFiles: [],
//       imagePreviews: val.images?.map((url) => ({
//         url, // full image URL
//         isExisting: true,
//         file: null, // doesn't matter for existing
//       })) || [],
//       existingImages: val.images?.map((url) => {
//         const segments = url.split("/"); // get filename from URL
//         return segments[segments.length - 1];
//       }) || [],
//     });
  
//     setModalOpen(true);
//   };
  
  

//   const resetForm = () => {
//     setNewValue({
//       header: "",
//       description: "",
//       content: "",
//       iconFile: null,
//       iconPreview: null,
//       existingIcon: "",
//       imageFiles: [],
//       imagePreviews: [],
//       existingImages: [],
//     });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newValue.header.trim() || !newValue.description.trim() || !newValue.content.trim()) {
//       alert("Zəhmət olmasa bütün xanaları doldurun.");
//       return;
//     }

//     try {
//       const formData = new FormData();

//       const dtoPayload = {
//         header: newValue.header.trim(),
//         description: newValue.description.trim(),
//         content: newValue.content.trim(),
//         ...(isEditing && { images: newValue.existingImages }),
//       };

//       formData.append(
//         isEditing ? "foreignMissionUpdateDto" : "foreignMissionDto",
//         new Blob([JSON.stringify(dtoPayload)], { type: "application/json" })
//       );

//       if (newValue.iconFile) {
//         formData.append("icon", newValue.iconFile);
//       } else if (newValue.existingIcon) {
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${newValue.existingIcon}`);
//         const blob = await response.blob();
//         const filename = newValue.existingIcon.split("/").pop();
//         const file = new File([blob], filename, { type: blob.type });
//         formData.append("icon", file);
//       } else {
//         alert("İkon faylı tələb olunur.");
//         return;
//       }

//       newValue.imageFiles.forEach((file) => {
//         formData.append("images", file);
//       });

//       const response = isEditing
//         ? await updateForeign(editId, formData)
//         : await createForeign(formData);

//       const updated = await getForeigns();
//       const normalized = updated.data.map((item) => ({
//         id: item.id,
//         header: item.header,
//         description: item.description,
//         content: item.content?.contentWrite || item.content || "",
//         icon: item.icon,
//         iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
//         images:
//           item.content?.images?.map((img) =>
//             `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//           ) || [],
//       }));
//       setAboutValues(normalized);

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
//           <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
//             <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold" onClick={resetForm}>
//               &times;
//             </button>
//             <div className={clsx(styles.cardname)}>Xarici nümayəndəliklər</div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input type="text" placeholder="Başlıq" value={newValue.header} onChange={(e) => handleInputChange("header", e.target.value)} className={clsx(styles.modalinput)} />
//               <input type="text" placeholder="Təsvir" value={newValue.description} onChange={(e) => handleInputChange("description", e.target.value)} className={clsx(styles.modalinput)} />
//               <RichTextEditor value={newValue.content} onChange={(value) => handleInputChange("content", value)} />

//               <label className="block font-semibold">Icon yüklə (tək):</label>
//               <input type="file" accept="image/*" onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (!file) return;
//                 setNewValue((prev) => ({ ...prev, iconFile: file, iconPreview: URL.createObjectURL(file) }));
//               }} />
//               {newValue.iconPreview && <img src={newValue.iconPreview} alt="icon preview" className="w-10 h-10 object-contain rounded mt-2" />}

//               <label className="block font-semibold mt-4">Şəkillər yüklə (birdən çox):</label>
//               <input type="file" accept="image/*" multiple className="border p-2 w-full" onChange={(e) => {
//                 const files = Array.from(e.target.files);
//                 setNewValue((prev) => ({
//                   ...prev,
//                   imageFiles: [...prev.imageFiles, ...files],
//                   imagePreviews: [
//                     ...prev.imagePreviews,
//                     ...files.map((file) => ({ url: URL.createObjectURL(file), isExisting: false, file })),
//                   ],
//                 }));
//                 e.target.value = "";
//               }} />
//      <div className="flex gap-2 flex-wrap mt-2">
//   {newValue.imagePreviews.map(({ url, isExisting, file }, index) => (
//     <div key={index} className="relative">
//       <img
//         src={url}
//         alt={`preview-${index}`}
//         className="w-10 h-10 object-cover rounded"
//       />
//       <button
//         type="button"
//         className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//         onClick={() => {
//           const updatedPreviews = [...newValue.imagePreviews];
//           const removed = updatedPreviews.splice(index, 1)[0];

//           let updatedFiles = [...newValue.imageFiles];
//           let updatedExisting = [...newValue.existingImages];

//           if (removed.isExisting) {
//             const filename = removed.url.split("/").pop();
//             updatedExisting = updatedExisting.filter(
//               (name) => name !== filename
//             );
//           } else {
//             updatedFiles = updatedFiles.filter((f) => f !== removed.file);
//           }

//           setNewValue((prev) => ({
//             ...prev,
//             imagePreviews: updatedPreviews,
//             imageFiles: updatedFiles,
//             existingImages: updatedExisting,
//           }));
//         }}
//       >
//         ×
//       </button>
//     </div>
//   ))}
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
//                 Xarici <br /> nümayəndəliklər
//                 <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>...
//                   <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-b border-gray-400 px-0 w-full text-sm outline-none" placeholder="Axtar..." />
//                   <SearchIcon className="w-5 h-5 text-gray-500" />
//                 </div>
//                 <button className={clsx(styles.cardopen)} onClick={() => { setIsEditing(false); setEditId(null); setModalOpen(true); }}>
//                   <Open />
//                 </button>
//               </td>
//             </tr>
//             {aboutValues.filter((val) => val?.header?.toLowerCase().includes(searchTerm.toLowerCase())).map((val) => (
//               <tr key={val.id}>
//                 <td className="w-16">
//                   {val.iconPreview && <img src={val.iconPreview} alt="icon" className="w-12 h-12 object-contain rounded" />}
//                 </td>
//                 <td className={clsx(styles.cardrow)}>
//                   <div className={clsx(styles.cardedit)} onClick={() => handleEdit(val)}>
//                     <Edit />
//                   </div>
//                   {val.header}
//                 </td>
//                 <td>
//                   <button onClick={() => handleDelete(val.id)} className="text-red-500 hover:underline">
//                     <Trash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminForeign;

import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import RichTextEditor from "../../RichTextEditor";
import Edit from "../../../../assets/edit.svg";
import {
  createForeign,
  deleteForeign,
  getForeigns,
  updateForeign,
} from "@/http/foreign";

const AdminForeign = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aboutValues, setAboutValues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newValue, setNewValue] = useState({
    header: "",
    description: "",
    content: "",
    iconFile: null,
    iconPreview: null,
    existingIcon: "",
    imageFiles: [],
    imagePreviews: [],
    existingImages: [],
  });

  const handleInputChange = (field, value) => {
    setNewValue((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    getForeigns()
      .then((res) => {
        const items = Array.isArray(res?.data) ? res.data : [];
        const normalized = items.map((item) => ({
          id: item.id,
          header: item.header,
          description: item.description,
          content: item.content || "",
          icon: item.icon,
          iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
          images:
            item.images?.map((img) =>
              img.startsWith("http")
                ? img
                : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
            ) || [],
        }));
        setAboutValues(normalized);
      })
      .catch((err) => {
        console.error("Failed to load foreigns:", err);
        setAboutValues([]);
      });
  }, []);

  const handleDelete = (id) => {
    deleteForeign(id).then(() => {
      setAboutValues((prev) => prev.filter((val) => val.id !== id));
    });
  };

  const handleEdit = (val) => {
    setIsEditing(true);
    setEditId(val.id);
    setNewValue({
      header: val.header || "",
      description: val.description || "",
      content: val.content || "",
      iconFile: null,
      iconPreview: val.iconPreview || null,
      existingIcon: val.icon || "",
      imageFiles: [],
      imagePreviews:
        val.images?.map((url) => ({
          url,
          isExisting: true,
          file: null,
        })) || [],
      existingImages:
        val.images?.map((url) => {
          const segments = url.split("/");
          return segments[segments.length - 1].split("?")[0]; // remove query params if any
        }) || [],
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewValue({
      header: "",
      description: "",
      content: "",
      iconFile: null,
      iconPreview: null,
      existingIcon: "",
      imageFiles: [],
      imagePreviews: [],
      existingImages: [],
    });
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newValue.header.trim() ||
      !newValue.description.trim() ||
      !newValue.content.trim()
    ) {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }

    try {
      const formData = new FormData();

      const dtoPayload = {
        header: newValue.header.trim(),
        description: newValue.description.trim(),
        content: newValue.content.trim(),
        ...(isEditing && { images: newValue.existingImages }),
      };

      formData.append(
        isEditing ? "foreignMissionUpdateDto" : "foreignMissionDto",
        new Blob([JSON.stringify(dtoPayload)], { type: "application/json" })
      );

      if (newValue.iconFile) {
        formData.append("icon", newValue.iconFile);
      } else if (newValue.existingIcon) {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${newValue.existingIcon}`
        );
        const blob = await response.blob();
        const filename = newValue.existingIcon.split("/").pop();
        const file = new File([blob], filename, { type: blob.type });
        formData.append("icon", file);
      } else {
        alert("İkon faylı tələb olunur.");
        return;
      }

      newValue.imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      if (isEditing) {
        await updateForeign(editId, formData);
      } else {
        await createForeign(formData);
      }

      // Refresh the list
      const updated = await getForeigns();
      const normalized = updated.data.map((item) => ({
        id: item.id,
        header: item.header,
        description: item.description,
        content: item.content || "",
        icon: item.icon,
        iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
        images:
          item.images?.map((img) =>
            img.startsWith("http")
              ? img
              : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
          ) || [],
      }));
      setAboutValues(normalized);

      resetForm();
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };

  return (
    <div className="p-8 mx-auto">
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
          onClick={resetForm}
        >
          <div
            className={clsx(styles.modal)}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={resetForm}
              type="button"
            >
              &times;
            </button>
            <div className={clsx(styles.cardname)}>Xarici nümayəndəliklər</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Başlıq"
                value={newValue.header}
                onChange={(e) =>
                  handleInputChange("header", e.target.value)
                }
                className={clsx(styles.modalinput)}
              />
              <input
                type="text"
                placeholder="Təsvir"
                value={newValue.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={clsx(styles.modalinput)}
              />
              <RichTextEditor
                value={newValue.content}
                onChange={(value) => handleInputChange("content", value)}
              />

              <label className="block font-semibold">Icon yüklə (tək):</label>
              <input
                type="file"
                accept="image/*"
                 className="border p-2 w-full"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setNewValue((prev) => ({
                    ...prev,
                    iconFile: file,
                    iconPreview: URL.createObjectURL(file),
                  }));
                }}
              />
              {newValue.iconPreview && (
                <img
                  src={newValue.iconPreview}
                  alt="icon preview"
                  className="w-10 h-10 object-contain rounded mt-2"
                />
              )}

              <label className="block font-semibold mt-4">
                Şəkillər yüklə (birdən çox):
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="border p-2 w-full"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setNewValue((prev) => ({
                    ...prev,
                    imageFiles: [...prev.imageFiles, ...files],
                    imagePreviews: [
                      ...prev.imagePreviews,
                      ...files.map((file) => ({
                        url: URL.createObjectURL(file),
                        isExisting: false,
                        file,
                      })),
                    ],
                  }));
                  e.target.value = "";
                }}
              />
              <div className="flex gap-2 flex-wrap mt-2">
                {newValue.imagePreviews.map(({ url, isExisting, file }, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-10 h-10 object-cover rounded"
                    />
                    {/* <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={() => {
                        const updatedPreviews = [...newValue.imagePreviews];
                        const removed = updatedPreviews.splice(index, 1)[0];
                        let updatedFiles = [...newValue.imageFiles];
                        let updatedExisting = [...newValue.existingImages];

                        if (removed.isExisting) {
                          // Extract filename without query params
                          const url = removed.url;
                          const lastSegment = url.split("/").pop();
                          const filename = lastSegment.split("?")[0];

                          console.log("Deleting filename:", filename);
                          console.log("Before deletion existingImages:", updatedExisting);

                          updatedExisting = updatedExisting.filter(
                            (name) => name !== filename
                          );

                          console.log("After deletion existingImages:", updatedExisting);
                        } else {
                          updatedFiles = updatedFiles.filter((f) => f !== removed.file);
                        }

                        setNewValue((prev) => ({
                          ...prev,
                          imagePreviews: updatedPreviews,
                          imageFiles: updatedFiles,
                          existingImages: updatedExisting,
                        }));
                      }}
                    >
                      ×
                    </button> */}
                      <button
        type="button"
        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
        onClick={() => {
          const updatedPreviews = [...newValue.imagePreviews];
          const removed = updatedPreviews.splice(index, 1)[0];

          let updatedFiles = [...newValue.imageFiles];
          let updatedExisting = [...newValue.existingImages];
          if (removed.isExisting) {
            const filename = removed.url.split("/").pop().split("?")[0]; // remove query params here!
            updatedExisting = updatedExisting.filter((name) => name !== filename);
          } else {
            updatedFiles = updatedFiles.filter((f) => f !== removed.file);
          }
          

          setNewValue((prev) => ({
            ...prev,
            imagePreviews: updatedPreviews,
            imageFiles: updatedFiles,
            existingImages: updatedExisting,
          }));
        }}
        aria-label="Remove image"
      >
        ×
      </button>
                  </div>
                ))}
              </div>

              <button className={clsx(styles.modalbtn)} type="submit">
                {isEditing ? "Yenilə" : "Yadda saxla"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={clsx(styles.card)}>
        <table className="w-full table-auto border-collapse">
          <tbody>
            <tr>
              <td className={clsx(styles.cardname)}>
                Xarici <br /> nümayəndəliklər
                <div
                  className={clsx(styles.cardsearch, "flex items-center gap-2")}
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-b border-gray-400 px-0 w-full text-sm outline-none"
                    placeholder="Axtar..."
                  />
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                </div>
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => {
                    setIsEditing(false);
                    setEditId(null);
                    setModalOpen(true);
                  }}
                >
                  <Open />
                </button>
              </td>
            </tr>
            {aboutValues
              .filter((val) =>
                val?.header?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((val) => (
                <tr key={val.id}>
                  <td className="w-16">
                    {val.iconPreview && (
                      <img
                        src={val.iconPreview}
                        alt="icon"
                        className="w-12 h-12 object-contain rounded"
                      />
                    )}
                  </td>
                  <td className={clsx(styles.cardrow)}>
                    <div
                      className={clsx(styles.cardedit)}
                      onClick={() => handleEdit(val)}
                    >
                      <Edit />
                    </div>
                    {val.header}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(val.id)}
                      className="text-red-500 hover:underline"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminForeign;


