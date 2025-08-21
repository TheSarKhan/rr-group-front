// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import RichTextEditor from "../../RichTextEditor";
// import Edit from "../../../../assets/edit.svg";
// import { createKsm, deleteKsm, getKsms, updateKsm } from "@/http/ksm";

// const AdminKsms = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [aboutValues, setAboutValues] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newValue, setNewValue] = useState({
//     title: "",
//     description: "",
//     paragraph: "",
//     iconFile: null,          
//     iconPreview: null,       
//     existingIcon: "",        

//     imageFiles: [],          
//     imagePreviews: [],       
//     existingImages: [],     
//   });

//   useEffect(() => {
//     getKsms()
//       .then((res) => {
//         const items = Array.isArray(res?.data) ? res.data : [];
//         const normalized = items.map((item) => ({
//           id: item.id,
//           title: item.title,
//           description: item.description,
//           paragraph: item.paragraph,
//           icon: item.icon,
//           iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
//           images: (item.images || []).map((img) =>
//             img.startsWith("http")
//               ? img
//               : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//           ),
//         }));
//         setAboutValues(normalized);
//       })
//       .catch((err) => {
//         console.error("Failed to load KSMs:", err);
//         setAboutValues([]);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     deleteKsm(id).then(() => {
//       setAboutValues((prev) => prev.filter((val) => val.id !== id));
//     });
//   };

//   const handleEdit = (val) => {
//     setIsEditing(true);
//     setEditId(val.id);
//     setNewValue({
//       title: val.title,
//       description: val.description,
//       paragraph: val.paragraph,

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
//       title: "",
//       description: "",
//       paragraph: "",
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
  
//     if (
//       !newValue.title.trim() ||
//       !newValue.description.trim() ||
//       !newValue.paragraph.trim()
//     ) {
//       alert("Zəhmət olmasa bütün xanaları doldurun.");
//       return;
//     }
  
//     try {
//       const formData = new FormData();
  
//       const requestPayload = {
//         title: newValue.title.trim(),
//         description: newValue.description.trim(),
//         paragraph: newValue.paragraph.trim(),
//       };
  
//       formData.append(
//         "request",
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
//         ? await updateKsm(editId, formData)
//         : await createKsm(formData);
  
//       const updated = await getKsms();
//       setAboutValues(
//         updated.data.map((item) => ({
//           id: item.id,
//           title: item.title,
//           description: item.description,
//           paragraph: item.paragraph,
//           icon: item.icon,
//           iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
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

//             <div className={clsx(styles.cardname)}>KSM Dəyərləri</div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Başlıq"
//                 value={newValue.title}
//                 onChange={(e) =>
//                   setNewValue({ ...newValue, title: e.target.value })
//                 }
//                 className={clsx(styles.modalinput)}
//               />

//               <input
//                 type="text"
//                 placeholder="Təsvir"
//                 value={newValue.description}
//                 onChange={(e) =>
//                   setNewValue({ ...newValue, description: e.target.value })
//                 }
//                 className={clsx(styles.modalinput)}
//               />
//               <RichTextEditor
//                 value={newValue.paragraph}
//                 onChange={(value) =>
//                   setNewValue({ ...newValue, paragraph: value })
//                 }
//               />
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
//                 KSM
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
//                 if (!val?.title || typeof val.title !== "string") return false;
//                 return val.title.toLowerCase().includes(searchTerm.toLowerCase());
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
//                     {val.title}
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

// export default AdminKsms;

import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import RichTextEditor from "../../RichTextEditor";
import Edit from "../../../../assets/edit.svg";
import { createKsm, deleteKsm, getKsms, updateKsm } from "@/http/ksm";

const AdminKsms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aboutValues, setAboutValues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newValue, setNewValue] = useState({
    title: "",
    description: "",
    paragraph: "",
    iconFile: null,
    iconPreview: null,
    existingIcon: "",

    imageFiles: [],
    imagePreviews: [],
    existingImages: [],
  });

  useEffect(() => {
    getKsms()
      .then((res) => {
        const items = Array.isArray(res?.data) ? res.data : [];
        const normalized = items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          paragraph: item.paragraph,
          icon: item.icon,
          iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
          images: (item.images || []).map((img) =>
            img.startsWith("http")
              ? img
              : `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
          ),
        }));
        setAboutValues(normalized);
      })
      .catch((err) => {
        console.error("Failed to load KSMs:", err);
        setAboutValues([]);
      });
  }, []);

  const handleDelete = (id) => {
    deleteKsm(id).then(() => {
      setAboutValues((prev) => prev.filter((val) => val.id !== id));
    });
  };

  const handleEdit = (val) => {
    setIsEditing(true);
    setEditId(val.id);
    setNewValue({
      title: val.title,
      description: val.description,
      paragraph: val.paragraph,

      iconFile: null,
      iconPreview: val.iconPreview,
      existingIcon: val.icon,

      imageFiles: [],
      imagePreviews: val.images.map((url) => ({
        url,
        isExisting: true,
      })),
      existingImages: val.images.map((url) => url.split("/").pop()),
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewValue({
      title: "",
      description: "",
      paragraph: "",
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     !newValue.title.trim() ||
  //     !newValue.description.trim() ||
  //     !newValue.paragraph.trim()
  //   ) {
  //     alert("Zəhmət olmasa bütün xanaları doldurun.");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();

  //     const requestPayload = {
  //       title: newValue.title.trim(),
  //       description: newValue.description.trim(),
  //       paragraph: newValue.paragraph.trim(),
  //     };

  //     formData.append(
  //       "request",
  //       new Blob([JSON.stringify(requestPayload)], {
  //         type: "application/json",
  //       })
  //     );

  //     if (newValue.iconFile) {
  //       formData.append("icon", newValue.iconFile);
  //     } else if (newValue.existingIcon) {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${newValue.existingIcon}`
  //       );
  //       const blob = await response.blob();
  //       const filename = newValue.existingIcon.split("/").pop() || "icon.png";
  //       const file = new File([blob], filename, { type: blob.type });
  //       formData.append("icon", file);
  //     } else {
  //       alert("İkon faylı tələb olunur.");
  //       return;
  //     }

  //     newValue.imageFiles.forEach((file) => {
  //       formData.append("images", file);
  //     });

  //     const response = isEditing
  //       ? await updateKsm(editId, formData)
  //       : await createKsm(formData);

  //     const updated = await getKsms();
  //     setAboutValues(
  //       updated.data.map((item) => ({
  //         id: item.id,
  //         title: item.title,
  //         description: item.description,
  //         paragraph: item.paragraph,
  //         icon: item.icon,
  //         iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
  //         images: item.images.map(
  //           (img) =>
  //             `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
  //         ),
  //       }))
  //     );

  //     resetForm();
  //   } catch (err) {
  //     console.error("Submission error:", err.response?.data || err.message);
  //     alert("Əməliyyat zamanı xəta baş verdi.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !newValue.title.trim() ||
      !newValue.description.trim() ||
      !newValue.paragraph.trim()
    ) {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      const requestPayload = {
        title: newValue.title.trim(),
        description: newValue.description.trim(),
        paragraph: newValue.paragraph.trim(),
      };
  
      // ✅ Only in PUT (edit) mode: include existing image names
      if (isEditing) {
        requestPayload.images = [...newValue.existingImages];
      }
  
      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
          type: "application/json",
        })
      );
  
      // ✅ Append icon only if a new one is uploaded
      if (newValue.iconFile) {
        formData.append("icon", newValue.iconFile);
      }
  
      // ✅ Append only newly added images
      newValue.imageFiles.forEach((file) => {
        formData.append("images", file);
      });
  
      const response = isEditing
        ? await updateKsm(editId, formData)
        : await createKsm(formData);
  
      const updated = await getKsms();
      setAboutValues(
        updated.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          paragraph: item.paragraph,
          icon: item.icon,
          iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
          images: item.images.map(
            (img) =>
              `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
          ),
        }))
      );
  
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
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname)}>KSM Dəyərləri</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Başlıq"
                value={newValue.title}
                onChange={(e) =>
                  setNewValue((prev) => ({ ...prev, title: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />

              <input
                type="text"
                placeholder="Təsvir"
                value={newValue.description}
                onChange={(e) =>
                  setNewValue((prev) => ({ ...prev, description: e.target.value }))
                }
                className={clsx(styles.modalinput)}
              />

              <RichTextEditor
                value={newValue.paragraph}
                onChange={(value) =>
                  setNewValue((prev) => ({ ...prev, paragraph: value }))
                }
              />

              <label className="block font-semibold">İkon yüklə (tək):</label>
              <input
                type="file"
                accept="image/*"
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
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      onClick={() => {
                        const updatedPreviews = [...newValue.imagePreviews];
                        const removed = updatedPreviews.splice(index, 1)[0];

                        let updatedFiles = [...newValue.imageFiles];
                        let updatedExisting = [...newValue.existingImages];

                        if (removed.isExisting) {
                          const filename = removed.url.split("/").pop();
                          updatedExisting = updatedExisting.filter(
                            (name) => name !== filename
                          );
                        } else {
                          updatedFiles = updatedFiles.filter(
                            (f) => f !== removed.file
                          );
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
                KSM
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
              .filter((val) => {
                if (!val?.title || typeof val.title !== "string") return false;
                return val.title.toLowerCase().includes(searchTerm.toLowerCase());
              })
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
                    {val.title}
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

export default AdminKsms;

