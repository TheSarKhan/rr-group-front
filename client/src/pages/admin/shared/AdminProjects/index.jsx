// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import RichTextEditor from "../../RichTextEditor";
// import Edit from "../../../../assets/edit.svg";
// import { createProject, deleteProject, getProjects, updateProject } from "@/http/projects";

// const AdminProjectss = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [aboutValues, setAboutValues] = useState([]);
//   const [content, setContent] = useState("");

//   const [newValue, setNewValue] = useState({
//     name: "",
//     desc: "",
//     imagePreviews: [],
//     imageFiles: [],
//   });
  

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     getProjects()
//       .then(res => {
//         const items = res.data; 
//         const normalized = items.map(item => ({
//           id: item.id,
//           name: item.name, // or item.title if used
//           desc: item.content, // your backend sends 'content' not 'paragraph'
//           images: item.images.map(img => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`),
//         }));
//         setAboutValues(normalized);
//       })
//       .catch(console.error);
//   }, []);
  
  
  

//   const handleDelete = (id) => {
//     deleteProject(id).then(() => {
//       setAboutValues((prev) => prev.filter((val) => val.id !== id));
//     });
//   };

//   const handleEdit = (val) => {
//     setIsEditing(true);
//     setEditId(val.id);
  
//     setNewValue({
//       name: val.name,
//       imageFiles: [],
//       imagePreviews: val.images, 
//     });
  
//     setContent(val.desc);
//     setModalOpen(true);
//   };
  
// //   const resetForm = () => {
// //     setNewValue({ name: "", desc: "", image: { url: "" } });
// //     setContent("");
// //     setModalOpen(false);
// //     setIsEditing(false);
// //     setEditId(null);
// //   };
// const resetForm = () => {
//     setNewValue({
//       name: "",
//       desc: "",
//       imagePreviews: [],
//       imageFiles: [],
//     });
//     setContent("");
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
  
// //     if (!newValue.name.trim() || !content.trim()) {
// //       alert("Zəhmət olmasa bütün xanaları doldurun.");
// //       return;
// //     }
  
// //     try {
// //       const formData = new FormData();
  
// //       const dto = {
// //         name: newValue.name.trim(),
// //         constructDate: "2025-06-24", // You can make this dynamic
// //         orderOwner: "Grotesk MMC",   // Same here if needed
// //         content: content.trim(),
// //       };
  
// //       formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  
// //       newValue.imageFiles.forEach((file) => {
// //         formData.append("images", file);
// //       });
  
// //       let response;
// //       if (isEditing) {
// //         response = await updateProject(editId, formData);
// //       } else {
// //         response = await createProject(formData);
// //       }
  
// //       const updated = await getProjects();
// //       setAboutValues(updated.data);
  
// //       resetForm();
// //     } catch (err) {
// //       console.error(err.response?.data || err.message);
// //       alert("Əməliyyat zamanı xəta baş verdi.");
// //     }
// //   };
// // const handleSubmit = async (e) => {
// //     e.preventDefault();
  
// //     if (!newValue.name.trim() || !content.trim()) {
// //       alert("Zəhmət olmasa bütün xanaları doldurun.");
// //       return;
// //     }
  
// //     try {
// //       const formData = new FormData();
  
// //       const dto = {
// //         name: newValue.name.trim(),
// //         constructDate: "2025-06-24",
// //         orderOwner: "Grotesk MMC",
// //         content: content.trim(),
// //       };
  
// //       formData.append("request", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  
// //       newValue.imageFiles.forEach((file) => {
// //         formData.append("images", file);
// //       });
  
// //       let response;
// //       if (isEditing) {
// //         response = await updateProject(editId, formData);
// //       } else {
// //         response = await createProject(formData);
// //       }
  
// //       const updated = await getProjects();
// //       setAboutValues(updated.data);
  
// //       resetForm();
// //     } catch (err) {
// //       console.error(err.response?.data || err.message);
// //       alert("Əməliyyat zamanı xəta baş verdi.");
// //     }
// //   };
  
  
// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!newValue.name.trim() || !content.trim()) {
//       alert("Zəhmət olmasa bütün xanaları doldurun.");
//       return;
//     }
  
//     try {
//       const formData = new FormData();
  
//       const dto = {
//         name: newValue.name.trim(),
//         constructDate: "2025-06-24", // Make this dynamic later
//         orderOwner: "Grotesk MMC",   // Also can be dynamic
//         content: content.trim(),
//       };
  
//       formData.append("request", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  
//       newValue.imageFiles.forEach((file) => {
//         formData.append("images", file);
//       });
  
//       let response;
//       if (isEditing) {
//         response = await updateProject(editId, formData);
//       } else {
//         response = await createProject(formData);
//       }
  
//       const updated = await getProjects();
//       setAboutValues(
//         updated.data.map(item => ({
//           id: item.id,
//           name: item.name,
//           desc: item.content,
//           images: item.images.map(img => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`)
//         }))
//       );
  
//       resetForm();
//     } catch (err) {
//       console.error(err.response?.data || err.message);
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

//             <div className={clsx(styles.cardname)}>Dəyərlərimiz</div>
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

//     setNewValue((prev) => ({
//       ...prev,
//       imageFiles: [...prev.imageFiles, ...files],
//       imagePreviews: [
//         ...prev.imagePreviews,
//         ...files.map((file) => URL.createObjectURL(file)),
//       ],
//     }));

//     // Reset input value to allow re-selecting same file
//     e.target.value = "";
//   }}
// />
//                  <div className="flex gap-2 flex-wrap">
//   {newValue.imagePreviews.map((url, index) => (
//     <div key={index} className="relative">
//       <img src={url} alt={`preview-${index}`} className="w-20 h-20 object-cover rounded" />
//       <button
//         type="button"
//         className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//         onClick={() => {
//           const updatedPreviews = [...newValue.imagePreviews];
//           const updatedFiles = [...newValue.imageFiles];
//           updatedPreviews.splice(index, 1);
//           updatedFiles.splice(index, 1);
//           setNewValue(prev => ({
//             ...prev,
//             imagePreviews: updatedPreviews,
//             imageFiles: updatedFiles
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
//               Layihələr
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

// export default AdminProjectss;

import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import RichTextEditor from "../../RichTextEditor";
import Edit from "../../../../assets/edit.svg";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/http/projects";

const AdminProjectss = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aboutValues, setAboutValues] = useState([]);
  const [content, setContent] = useState("");

  const [newValue, setNewValue] = useState({
    name: "",
    constructDate: "",
    orderOwner: "",
    imagePreviews: [],
    imageFiles: [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getProjects()
      .then((res) => {
        const items = res.data;
        const normalized = items.map((item) => ({
          id: item.id,
          name: item.name,
          constructDate: item.constructDate,
          orderOwner: item.orderOwner,
          desc: item.content,
          images: item.images.map(
            (img) => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
          ),
        }));
        setAboutValues(normalized);
      })
      .catch(console.error);
  }, []);

  const handleDelete = (id) => {
    deleteProject(id).then(() => {
      setAboutValues((prev) => prev.filter((val) => val.id !== id));
    });
  };

  // const handleEdit = (val) => {
  //   setIsEditing(true);
  //   setEditId(val.id);

  //   setNewValue({
  //     name: val.name,
  //     constructDate: val.constructDate || "",
  //     orderOwner: val.orderOwner || "",
  //     imageFiles: [],
  //     imagePreviews: val.images || [],
  //   });

  //   setContent(val.desc || "");
  //   setModalOpen(true);
  // };
  const handleEdit = (val) => {
    setIsEditing(true);
    setEditId(val.id);
  
    setNewValue({
      name: val.name,
      constructDate: val.constructDate || "",
      orderOwner: val.orderOwner || "",
      imageFiles: [],
      imagePreviews: val.images || [],
    });
  
    setContent(val.desc || "");
    setModalOpen(true);
  };
  
  const resetForm = () => {
    setNewValue({
      name: "",
      constructDate: "",
      orderOwner: "",
      imagePreviews: [],
      imageFiles: [],
    });
    setContent("");
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     !newValue.name.trim() ||
  //     !newValue.constructDate.trim() ||
  //     !newValue.orderOwner.trim() ||
  //     !content.trim()
  //   ) {
  //     alert("Zəhmət olmasa bütün xanaları doldurun.");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();

  //     const dto = {
  //       name: newValue.name.trim(),
  //       contructDate: newValue.constructDate.trim(),
  //       orderOwner: newValue.orderOwner.trim(),
  //       content: content.trim(),
  //     };

  //     formData.append("request", new Blob([JSON.stringify(dto)], { type: "application/json" }));

  //     newValue.imageFiles.forEach((file) => {
  //       formData.append("images", file);
  //     });

  //     if (isEditing) {
  //       await updateProject(editId, formData);
  //     } else {
  //       await createProject(formData);
  //     }

  //     // Reload projects after submit
  //     const updated = await getProjects();
  //     setAboutValues(
  //       updated.data.map((item) => ({
  //         id: item.id,
  //         name: item.name,
  //         constructDate: item.constructDate,
  //         orderOwner: item.orderOwner,
  //         desc: item.content,
  //         images: item.images.map(
  //           (img) => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
  //         ),
  //       }))
  //     );

  //     resetForm();
  //   } catch (err) {
  //     console.error(err.response?.data || err.message);
  //     alert("Əməliyyat zamanı xəta baş verdi.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !newValue.name.trim() ||
      !newValue.constructDate.trim() ||
      !newValue.orderOwner.trim() ||
      !content.trim()
    ) {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      const dto = {
        name: newValue.name.trim(),
        constructDate: newValue.constructDate.trim(),
        orderOwner: newValue.orderOwner.trim(),
        content: content.trim(),
      };
  
      // ✅ If editing, send existing image filenames in `request.images`
      if (isEditing) {
        const existingImageFilenames = newValue.imagePreviews
          .filter((url) => url.startsWith(import.meta.env.VITE_API_BASE_URL))
          .map((url) => url.split("/").pop());
  
        dto.images = existingImageFilenames;
      }
  
      formData.append("request", new Blob([JSON.stringify(dto)], { type: "application/json" }));
  
      // ✅ Always append only newly uploaded images
      newValue.imageFiles.forEach((file) => {
        formData.append("images", file);
      });
  
      if (isEditing) {
        await updateProject(editId, formData);
      } else {
        await createProject(formData);
      }
  
      const updated = await getProjects();
      setAboutValues(
        updated.data.map((item) => ({
          id: item.id,
          name: item.name,
          constructDate: item.constructDate,
          orderOwner: item.orderOwner,
          desc: item.content,
          images: item.images.map(
            (img) => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
          ),
        }))
      );
  
      resetForm();
    } catch (err) {
      console.error(err.response?.data || err.message);
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
          <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={resetForm}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname)}>Layihələr</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className={clsx(styles.modalinput)}
                value={newValue.name}
                onChange={(e) => setNewValue({ ...newValue, name: e.target.value })}
              />

              <input
                type="date"
                placeholder="Construct Date"
                className={clsx(styles.modalinput)}
                value={newValue.constructDate}
                onChange={(e) => setNewValue({ ...newValue, constructDate: e.target.value })}
              />

              <input
                type="text"
                placeholder="Order Owner"
                className={clsx(styles.modalinput)}
                value={newValue.orderOwner}
                onChange={(e) => setNewValue({ ...newValue, orderOwner: e.target.value })}
              />

              <RichTextEditor value={content} onChange={setContent} />

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
                      ...files.map((file) => URL.createObjectURL(file)),
                    ],
                  }));

                  // Reset input value to allow re-selecting same file
                  e.target.value = "";
                }}
              />

              <div className="flex gap-2 flex-wrap">
                {newValue.imagePreviews.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={() => {
                        const updatedPreviews = [...newValue.imagePreviews];
                        const updatedFiles = [...newValue.imageFiles];
                        updatedPreviews.splice(index, 1);
                        updatedFiles.splice(index, 1);
                        setNewValue((prev) => ({
                          ...prev,
                          imagePreviews: updatedPreviews,
                          imageFiles: updatedFiles,
                        }));
                      }}
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
                Layihələr
                <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-b border-gray-400 px-0 w-full text-sm outline-none"
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
              .filter((val) => {
                if (!val?.name || typeof val.name !== "string") return false;
                return val.name.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map((val) => (
                <tr key={val.id}>
                  <td className="w-15">
                    {val.images && val.images.length > 0 && (
                      <img
                        src={val.images[0]}
                        alt="preview"
                        className="w-12 h-12 object-contain"
                      />
                    )}
                  </td>

                  <td className={clsx(styles.cardrow)}>
                    <div
                      className={clsx(styles.cardedit)}
                      onClick={() => handleEdit(val)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleEdit(val)}
                    >
                      <Edit />
                    </div>
                    {val.name}
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(val.id)}
                      className="text-red-500 hover:underline"
                      aria-label={`Delete ${val.name}`}
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

export default AdminProjectss;
