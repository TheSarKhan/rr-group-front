// import { useEffect, useState, useRef } from "react";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Open from "../../../../assets/open.svg";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import RichTextEditor from "../../RichTextEditor";
// import {
//   getCards,
//   createCard,
//   deleteCard,
//   getHeads,
//   getSubs,
//   updateCard,
// } from "@/http/service";

// const AdminServiceCard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cards, setCards] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [headCategories, setHeadCategories] = useState([]);
//   const [allSubCategories, setAllSubCategories] = useState([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);

 

//   const [formData, setFormData] = useState({
//     headCategory: "",
//     subCategory: "",
//     header: "",
//     description: "",
//     content: "",
//     mainImageFile: null,
//     mainImagePreview: null,
//     imageFiles: [],
//     imagePreviews: [],
//     existingImages: [],  // add this here
//   });
  

//   const formRef = useRef();

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [cardsRes, headsRes, subsRes] = await Promise.all([
//         getCards(),
//         getHeads(),
//         getSubs(),
//       ]);
//       setCards(cardsRes.data);
//       setHeadCategories(headsRes.data);
//       setAllSubCategories(subsRes.data);
//     } catch (error) {
//       console.error("Failed to load data:", error);
//     }
//   };

//   const handleEdit = (card) => {
//     const filteredSubs = allSubCategories.filter(
//       (sub) => sub.headCategory === card.headCategory
//     );
  
//     setFilteredSubCategories(filteredSubs);
//     setIsEditing(true);
//     setEditId(card.id);
//     setFormData({
//       headCategory: card.headCategory,
//       subCategory: card.subCategory,
//       header: card.header,
//       description: card.description,
//       content: card.content.contentWrite,
//       mainImageFile: null,
//       mainImagePreview: card.content.mainImage
//         ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`
//         : null,
//       imageFiles: [],
//       imagePreviews: card.content.images.map((img) => ({
//         url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
//         isExisting: true,
//       })),
//       existingImages: card.content.images,  // add this line
//     });
//     setModalOpen(true);
//   };
  
//   const resetForm = () => {
//     setFormData({
//       headCategory: "",
//       subCategory: "",
//       header: "",
//       description: "",
//       content: "",
//       mainImageFile: null,
//       mainImagePreview: null,
//       imageFiles: [],
//       imagePreviews: [],
//     });
//     setFilteredSubCategories([]);
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };
//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!formData.header.trim() || !formData.headCategory.trim()) {
//       alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
//       return;
//     }
  
//     const cardDto = {
//       headCategory: formData.headCategory,
//       subCategory: formData.subCategory,
//       header: formData.header,
//       description: formData.description,
//       content: {
//         contentWrite: formData.content,
//       },
//     };
  
//     // Only in editing mode add existingImages to the DTO
//     if (isEditing) {
//       cardDto.images = [...formData.existingImages];
//     }
  
//     const payload = new FormData();
//     payload.append(
//       "cardDto",
//       new Blob([JSON.stringify(cardDto)], { type: "application/json" })
//     );
  
//     if (formData.mainImageFile) {
//       payload.append("mainImage", formData.mainImageFile);
//     } else if (formData.mainImagePreview) {
//       try {
//         const existingImageName = formData.mainImagePreview.split("/").pop();
//         const response = await fetch(formData.mainImagePreview);
//         const blob = await response.blob();
//         const file = new File([blob], existingImageName || "mainImage.png", {
//           type: blob.type,
//         });
//         payload.append("mainImage", file);
//       } catch (err) {
//         console.error("Failed to reuse existing main image:", err);
//         alert("Main şəkil yüklənə bilmədi.");
//         return;
//       }
//     } else {
//       alert("Zəhmət olmasa əsas şəkil yükləyin.");
//       return;
//     }
  
//     formData.imageFiles.forEach((file) => {
//       payload.append("images", file);
//     });
  
//     try {
//       if (isEditing) {
//         await updateCard(editId, payload);
//       } else {
//         await createCard(payload);
//       }
  
//       await loadData();
//       resetForm();
//     } catch (err) {
//       console.error("Submit error:", err.response?.data || err.message);
//       alert("Xəta baş verdi");
//     }
//   };
  
  
//   const handleHeadCategoryChange = (value) => {
//     const filteredSubs = allSubCategories.filter(
//       (sub) => sub.headCategory === value
//     );
//     setFilteredSubCategories(filteredSubs);
//     setFormData({ ...formData, headCategory: value, subCategory: "" });
//   };

//   return (
//     <div className="p-8 mx-auto">
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-y-auto"
//           onClick={resetForm}
//         >
//           <div
//             className={clsx(styles.modal)}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button onClick={resetForm} className="absolute top-2 right-2 text-xl font-bold">
//               ×
//             </button>
//             <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
//               {/* Form Fields */}
//               <select
//                 value={formData.headCategory}
//                 onChange={(e) => handleHeadCategoryChange(e.target.value)}
//                 required
//               >
//                 <option value="">Baş kateqoriya seçin</option>
//                 {headCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={formData.subCategory}
//                 onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
//               >
//                 <option value="">Alt kateqoriya seçin</option>
//                 {filteredSubCategories.map((cat) => (
//                   <option key={cat.id} value={cat.name}>
//                     {cat.name}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 placeholder="Başlıq"
//                 value={formData.header}
//                 onChange={(e) => setFormData({ ...formData, header: e.target.value })}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Təsvir"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               />
//               <RichTextEditor
//                 value={formData.content}
//                 onChange={(val) => setFormData((prev) => ({ ...prev, content: val }))}
//               />

// <label className="block font-semibold">İkon yüklə (tək):</label>
//              <div className="border border-gray-300 p-3 my-3 rounded-md">
//              <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (file) {
//                     handleInputChange("mainImageFile", file);
//                     handleInputChange("mainImagePreview", URL.createObjectURL(file));
//                   }
//                 }}
//               />
//              </div>
//               {formData.mainImagePreview && (
//                 <img
//                   src={formData.mainImagePreview}
//                   alt="Main preview"
//                   className="w-10 h-10 object-cover rounded"
//                 />
//               )}
//               <label className="block font-semibold">Şəkillər yüklə (birdən çox):</label>
//              <div className="border border-gray-300 p-3 my-3 rounded-md">
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={(e) => {
//                   const files = Array.from(e.target.files);
//                   setFormData((prev) => ({
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
//                 }}
//                 className="w-full"
//               />
//               </div>
//               <div className="flex gap-2 flex-wrap mt-2">
//   {formData.imagePreviews.map(({ url, isExisting, file }, index) => (
//     <div key={index} className="relative w-12 h-12 rounded overflow-hidden">
//       <img
//         src={url}
//         alt={`preview-${index}`}
//         className="w-10 h-10 object-cover rounded"
//       />
//       <button
//         type="button"
//         className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
//         onClick={() => {
//           const updatedPreviews = [...formData.imagePreviews];
//           const removed = updatedPreviews.splice(index, 1)[0];

//           let updatedFiles = [...formData.imageFiles];
//           let updatedExisting = [...formData.existingImages];

//           if (removed.isExisting) {
//             updatedExisting = updatedExisting.filter((name) => {
//               // Remove matching filename from existingImages
//               // The filenames in existingImages are just strings like "file.jpg"
//               // Extract filename from url for matching:
//               const filename = removed.url.split("/").pop();
//               return name !== filename;
//             });
//           } else {
//             updatedFiles = updatedFiles.filter((f) => f !== removed.file);
//           }

//           setFormData((prev) => ({
//             ...prev,
//             imagePreviews: updatedPreviews,
//             imageFiles: updatedFiles,
//             existingImages: updatedExisting,
//           }));
//         }}
//         aria-label="Remove image"
//       >
//         ×
//       </button>
//     </div>
//   ))}
// </div>

//               <button type="submit" className={clsx(styles.modalbtn)} >
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
//                 Servis Kartları
//                 <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>
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
//                     resetForm();
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>
//             {cards
//               .filter((c) =>
//                 c.header?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((card) => (
//                 <tr key={card.id}>
//                   <td>{card.header}
//                   <span className="text-xs text-gray-500">
//                       ({card.headCategory || "No Head Category"})
//                     </span>

//                   </td>
                  
//                   <td>
//                     <button onClick={() => handleEdit(card)}>
//                       <Edit />
//                     </button>
//                     <button
//                       onClick={async () => {
//                         if (window.confirm("Silinsin?")) {
//                           await deleteCard(card.id);
//                           loadData();
//                         }
//                       }}
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

// export default AdminServiceCard;

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Open from "../../../../assets/open.svg";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import Edit from "../../../../assets/edit.svg";
import RichTextEditor from "../../RichTextEditor";

import {
  getCards,
  createCard,
  deleteCard,
  getHeads,
  getSubs,
  updateCard,
} from "@/http/service";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AdminServiceCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const formRef = useRef();

  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState({
    headCategory: "",
    subCategory: "",
    header: "",
    description: "",
    content: "",
    mainImageFile: null,
    mainImagePreview: null,
    imageFiles: [],
    imagePreviews: [],
    existingImages: [],
  });

  // React Query: Fetch cards
  const {
    data: cards = [],
    isLoading: loadingCards,
    isError: errorCards,
    error: cardsError,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await getCards();
      return res.data || [];
    },
  });

  // React Query: Fetch head categories
  const {
    data: headCategories = [],
    isLoading: loadingHeads,
    isError: errorHeads,
    error: headsError,
  } = useQuery({
    queryKey: ["headCategories"],
    queryFn: async () => {
      const res = await getHeads();
      return res.data || [];
    },
  });

  // React Query: Fetch sub categories
  const {
    data: allSubCategories = [],
    isLoading: loadingSubs,
    isError: errorSubs,
    error: subsError,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: async () => {
      const res = await getSubs();
      return res.data || [];
    },
  });

  // Filter subcategories when headCategory changes
  useEffect(() => {
    if (formData.headCategory) {
      const filtered = allSubCategories.filter(
        (sub) => sub.headCategory === formData.headCategory
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.headCategory, allSubCategories]);

  // Reset form function
  const resetForm = () => {
    setFormData({
      headCategory: "",
      subCategory: "",
      header: "",
      description: "",
      content: "",
      mainImageFile: null,
      mainImagePreview: null,
      imageFiles: [],
      imagePreviews: [],
      existingImages: [],
    });
    setFilteredSubCategories([]);
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  // Handle edit: populate form with card data
  const handleEdit = (card) => {
    const filteredSubs = allSubCategories.filter(
      (sub) => sub.headCategory === card.headCategory
    );
    setFilteredSubCategories(filteredSubs);

    setIsEditing(true);
    setEditId(card.id);

    setFormData({
      headCategory: card.headCategory || "",
      subCategory: card.subCategory || "",
      header: card.header || "",
      description: card.description || "",
      content: card.content?.contentWrite || "",
      mainImageFile: null,
      mainImagePreview: card.content?.mainImage
        ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`
        : null,
      imageFiles: [],
      imagePreviews: (card.content?.images || []).map((img) => ({
        url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
        isExisting: true,
      })),
      existingImages: card.content?.images || [],
    });

    setModalOpen(true);
  };

  // Handle input change helper
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Mutations
  const queryKeyCards = ["cards"];

  const createMutation = useMutation({
    mutationFn: (payload) => createCard(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyCards);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateCard(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyCards);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyCards);
    },
  });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.header.trim() || !formData.headCategory.trim()) {
      alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
      return;
    }

    const cardDto = {
      headCategory: formData.headCategory,
      subCategory: formData.subCategory,
      header: formData.header,
      description: formData.description,
      content: {
        contentWrite: formData.content,
      },
    };

    // Only in editing mode add existingImages to the DTO
    if (isEditing) {
      cardDto.images = [...formData.existingImages];
    }

    const payload = new FormData();
    payload.append(
      "cardDto",
      new Blob([JSON.stringify(cardDto)], { type: "application/json" })
    );

    if (formData.mainImageFile) {
      payload.append("mainImage", formData.mainImageFile);
    } else if (formData.mainImagePreview) {
      try {
        const existingImageName = formData.mainImagePreview.split("/").pop();
        const response = await fetch(formData.mainImagePreview);
        const blob = await response.blob();
        const file = new File([blob], existingImageName || "mainImage.png", {
          type: blob.type,
        });
        payload.append("mainImage", file);
      } catch (err) {
        console.error("Failed to reuse existing main image:", err);
        alert("Main şəkil yüklənə bilmədi.");
        return;
      }
    } else {
      alert("Zəhmət olmasa əsas şəkil yükləyin.");
      return;
    }

    formData.imageFiles.forEach((file) => {
      payload.append("images", file);
    });

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: editId, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("Xəta baş verdi");
    }
  };

  // Loading and error states
  if (loadingCards || loadingHeads || loadingSubs) return <p>Loading...</p>;
  if (errorCards) return <p>Failed to load cards: {cardsError.message}</p>;
  if (errorHeads) return <p>Failed to load heads: {headsError.message}</p>;
  if (errorSubs) return <p>Failed to load subs: {subsError.message}</p>;

  return (
    <div className="p-8 mx-auto">
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-y-auto"
          onClick={resetForm}
        >
          <div
            className={clsx(styles.modal)}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={resetForm}
              className="absolute top-2 right-2 text-xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
              {/* Head category select */}
              <select
                value={formData.headCategory}
                onChange={(e) =>
                  handleInputChange("headCategory", e.target.value)
                }
                required
              >
                <option value="">Baş kateqoriya seçin</option>
                {headCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Subcategory select */}
              <select
                value={formData.subCategory}
                onChange={(e) => handleInputChange("subCategory", e.target.value)}
              >
                <option value="">Alt kateqoriya seçin</option>
                {filteredSubCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Header input */}
              <input
                type="text"
                placeholder="Başlıq"
                value={formData.header}
                onChange={(e) => handleInputChange("header", e.target.value)}
                required
              />

              {/* Description input */}
              <input
                type="text"
                placeholder="Təsvir"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />

              {/* RichTextEditor */}
              <RichTextEditor
                value={formData.content}
                onChange={(val) => handleInputChange("content", val)}
              />

              {/* Main image upload */}
              <label className="block font-semibold">İkon yüklə (tək):</label>
              <div className="border border-gray-300 p-3 my-3 rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleInputChange("mainImageFile", file);
                      handleInputChange("mainImagePreview", URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
              {formData.mainImagePreview && (
                <img
                  src={formData.mainImagePreview}
                  alt="Main preview"
                  className="w-10 h-10 object-cover rounded"
                />
              )}

              {/* Multiple images upload */}
              <label className="block font-semibold">Şəkillər yüklə (birdən çox):</label>
              <div className="border border-gray-300 p-3 my-3 rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setFormData((prev) => ({
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
                  }}
                  className="w-full"
                />
              </div>

              {/* Preview images with remove */}
              <div className="flex gap-2 flex-wrap mt-2">
                {formData.imagePreviews.map(({ url, isExisting, file }, index) => (
                  <div
                    key={index}
                    className="relative w-12 h-12 rounded overflow-hidden"
                  >
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                      onClick={() => {
                        const updatedPreviews = [...formData.imagePreviews];
                        const removed = updatedPreviews.splice(index, 1)[0];

                        let updatedFiles = [...formData.imageFiles];
                        let updatedExisting = [...formData.existingImages];

                        if (removed.isExisting) {
                          // Remove matching filename from existingImages
                          const filename = removed.url.split("/").pop();
                          updatedExisting = updatedExisting.filter(
                            (name) => name !== filename
                          );
                        } else {
                          updatedFiles = updatedFiles.filter((f) => f !== removed.file);
                        }

                        setFormData((prev) => ({
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

              <button type="submit" className={clsx(styles.modalbtn)}>
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
                Servis Kartları
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
                    resetForm();
                    setModalOpen(true);
                  }}
                >
                  <Open />
                </button>
              </td>
            </tr>

            {cards
              .filter((c) =>
                c.header?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((card) => (
                <tr key={card.id}>
                  <td>
                    {card.header}{" "}
                    <span className="text-xs text-gray-500">
                      ({card.headCategory || "No Head Category"})
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(card)}>
                      <Edit />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Silinsin?")) {
                          deleteMutation.mutate(card.id);
                        }
                      }}
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

export default AdminServiceCard;
