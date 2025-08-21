// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import Searchimage from "../../../../assets/searchimage.svg";
// import RichTextEditor from "../../RichTextEditor";
// import Edit from "../../../../assets/edit.svg";
// import { createVacancy, deleteVacancy, getVacancies, updateVacancy } from "@/http/vacancy";

// const AdminVacancy = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [aboutValues, setAboutValues] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newValue, setNewValue] = useState({
//     title: "",
//     content: "",
//     imageFiles: [],
//     imagePreviews: [],
//     existingImages: [],
//   });

  
//     useEffect(() => {
//       getVacancies()
//         .then((res) => {
//           const items = Array.isArray(res?.data) ? res.data : [];
//           const normalized = items.map((item) => ({
//             id: item.id,
//             title: item.title,
//             content: item.content,
//             images: (item.images || []).map(img => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`),  // full URLs
//             imageFilenames: item.images || [], // raw filenames for backend
//           }));
          
//           setAboutValues(normalized);

//         })
//         .catch((err) => {
//           console.error("Failed to load KSMs:", err);
//           setAboutValues([]);
//         });
//     }, []);


//   const handleDelete = (id) => {
//     deleteVacancy(id).then(() => {
//       setAboutValues((prev) => prev.filter((val) => val.id !== id));
//     });
//   };

//   const handleEdit = (val) => {
//     setIsEditing(true);
//     setEditId(val.id);
  
//     const baseUrl = import.meta.env.VITE_API_BASE_URL;

//     setNewValue({
//       title: val.title,
//       content: val.content,
//       imageFiles: [],
//       imagePreviews: val.imageFilenames.map(filename => ({
//         url: `${baseUrl}/v1/files/view/${filename}`,
//         isExisting: true,
//       })),
//       existingImages: [...val.imageFilenames], // raw filenames only here
//     });
    
  
//     setModalOpen(true);
//   };
  
//   // const handleEdit = (val) => {
//   //   setIsEditing(true);
//   //   setEditId(val.id);
//   //   setNewValue({
//   //     header: val.header,
//   //     content: val.content,
//   //     content: val.content,

//   //     imageFile: null,
//   //     imagePreview: val.imagePreview,
//   //     existingImage: val.image,

//   //     imageFiles: [],
//   //     imagePreviews: val.images.map((url) => ({
//   //       url,
//   //       isExisting: true,
//   //     })),
//   //     existingImages: val.images.map((url) => url.split("/").pop()),
//   //   });
//   //   setModalOpen(true);
//   // };

//   const resetForm = () => {
//     setNewValue({
//       title: "",
//       content: "",
//       imageFiles: [],
//       imagePreviews: [],
//       existingImages: [],
//     });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!newValue.title.trim() || !newValue.content.trim()) {
//   //     alert("Zəhmət olmasa bütün xanaları doldurun.");
//   //     return;
//   //   }

//   //   try {
//   //     const formData = new FormData();

//   //     const requestPayload = {
//   //       title: newValue.title.trim(),
//   //       content: newValue.content.trim(),
//   //     };

//   //     formData.append(
//   //       "request",
//   //       new Blob([JSON.stringify(requestPayload)], {
//   //         type: "application/json",
//   //       })
//   //     );

//   //     newValue.imageFiles.forEach((file) => {
//   //       formData.append("images", file);
//   //     });

//   //     newValue.existingImages.forEach((filename) => {
//   //       formData.append("existingImages", filename);
//   //     });

//   //     const response = isEditing
//   //       ? await updateVacancy(editId, formData)
//   //       : await createVacancy(formData);

//   //     const updated = await getVacancies();
//   //     const normalized = updated.data.map((item) => ({
//   //       id: item.id,
//   //       slug: item.slug,
//   //       title: item.title,
//   //       content: item.content,
//   //       createdAt: new Date(item.createdAt).toLocaleString("az-AZ"),
//   //       images: (item.images || []).map((img) =>
//   //         `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
//   //       ),
//   //     }));
//   //     setAboutValues(normalized);

//   //     resetForm();
//   //   } catch (err) {
//   //     console.error("Submission error:", err.response?.data || err.message);
//   //     alert("Əməliyyat zamanı xəta baş verdi.");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newValue.title.trim() || !newValue.content.trim()) {
//       alert("Zəhmət olmasa bütün xanaları doldurun.");
//       return;
//     }
  
//     try {
//       const formData = new FormData();

//       const requestPayload = {
//         title: newValue.title.trim(),
//         content: newValue.content.trim(),
//       };
      
//       // Append JSON part (request)
//       formData.append(
//         "request",
//         new Blob([JSON.stringify(requestPayload)], { type: "application/json" })
//       );
      
//       // Append new uploaded image files
//       newValue.imageFiles.forEach(file => {
//         formData.append("images", file);
//       });
      
//       // Append existing images as filenames (not URLs)
//       newValue.existingImages.forEach(filename => {
//         formData.append("images", filename);
//       });
      
//       const response = isEditing
//         ? await updateVacancy(editId, formData)
//         : await createVacancy(formData);
  
//       const updated = await getVacancies();
//       setAboutValues(
//         updated.data.map((item) => ({
//           id: item.id,
//           title: item.title,
//           content: item.content,
//           images: (item.images || []).map(
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

//             <div className={clsx(styles.cardname)}>Vakansiya</div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Başlıq"
//                 value={newValue.title}
//                 onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
//                 className={clsx(styles.modalinput)}
//               />

//               <RichTextEditor
//                 value={newValue.content}
//                 onChange={(value) => setNewValue({ ...newValue, content: value })}
//               />

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
//                           updatedExisting = updatedExisting.filter((name) => name !== filename);
//                         } else {
//                           updatedFiles = updatedFiles.filter((f) => f !== removed.file);
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
//                 Vakansiya
//                 <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="border-b border-gray-400 px-0 w-full text-sm outline-none"
//                     placeholder="Axtar..."
//                   />
//                   <Searchimage className="w-5 h-5 text-gray-500" />
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

// export default AdminVacancy;


import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
// import Searchimage from "../../../../assets/searchimage.svg";
import Edit from "../../../../assets/edit.svg";
import { createVacancy, deleteVacancy, getVacancies, updateVacancy } from "@/http/vacancy";
import RichTextEditor from "../../RichTextEditor";

const AdminVacancy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aboutValues, setAboutValues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newValue, setNewValue] = useState({
    title: "",
    content: "",
    imageFile: null,
    imagePreview: null,
    existingImage: "",
  });

  useEffect(() => {
    getVacancies()
      .then((res) => {
        const items = Array.isArray(res?.data) ? res.data : [res.data];
        const normalized = items.map((item) => ({
          id: item.id,
          title: item.title,
          content: item.content,
          image: item.image,
          imagePreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.image}`,
        }));
        setAboutValues(normalized);
      })
      .catch((err) => {
        console.error("Failed to load contacts:", err);
        setAboutValues([]);
      });
  }, []);
  

  const handleDelete = (id) => {
    deleteVacancy(id).then(() => {
      setAboutValues((prev) => prev.filter((val) => val.id !== id));
    });
  };

  const handleEdit = (val) => {
    setIsEditing(true);
    setEditId(val.id);
    setNewValue({
      title: val.title,
      content: val.content,
      imageFile: null,
      imagePreview: val.imagePreview,
      existingImage: val.image,
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewValue({
      title: "",
      content: "",
      imageFile: null,
      imagePreview: null,
      existingImage: "",
    });
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newValue.title.trim() || !newValue.content.trim()) {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }

    try {
      const formData = new FormData();

      const requestPayload = {
        title: newValue.title.trim(),
        content: newValue.content.trim(),
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
          type: "application/json",
        })
      );

      if (newValue.imageFile) {
        formData.append("image", newValue.imageFile);
      } else if (newValue.existingImage) {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${newValue.existingImage}`
        );
        const blob = await response.blob();
        const filename = newValue.existingImage.split("/").pop() || "image.png";
        const file = new File([blob], filename, { type: blob.type });
        formData.append("image", file);
      } else {
        alert("İkon faylı tələb olunur.");
        return;
      }

      const response = isEditing
        ? await updateVacancy(editId, formData)
        : await createVacancy(formData);

      const updated = await getVacancies();
      const updatedItems = Array.isArray(updated.data) ? updated.data : [updated.data];

        setAboutValues(
        updatedItems.map((item) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            image: item.image,
            imagePreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.image}`,
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
          <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={resetForm}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname)}>Yeni Vakansiya</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Başlıq"
                value={newValue.title}
                onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                className={clsx(styles.modalinput)}
              />

              {/* <input
                type="text"
                placeholder="Təsvir"
                value={newValue.content}
                onChange={(e) =>
                  setNewValue({ ...newValue, content: e.target.value })
                }
                className={clsx(styles.modalinput)}
              /> */}
            <RichTextEditor
  value={newValue.content}
  onChange={(val) => setNewValue((prev) => ({ ...prev, content: val }))}
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
                    imageFile: file,
                    imagePreview: URL.createObjectURL(file),
                  }));
                }}
              />

              {newValue.imagePreview && (
                <img
                  src={newValue.imagePreview}
                  alt="image preview"
                  className="w-10 h-10 object-contain rounded mt-2"
                />
              )}

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
              Vakansiya
                <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-b border-gray-400 px-0 w-full text-sm outline-none"
                    placeholder="Axtar..."
                  />
                  {/* <Searchimage className="w-5 h-5 text-gray-500" /> */}
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
                    {val.imagePreview && (
                      <img
                        src={val.imagePreview}
                        alt="image"
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

export default AdminVacancy;
