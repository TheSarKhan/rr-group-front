
// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import {
//   getSubs,
//   deleteSub,
//   updateSub,
//   createSub,
//   getHeads,
// } from "@/http/service";

// const AdminSubCategories = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [headCategories, setHeadCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newSub, setNewSub] = useState({
//     name: "",
//     description: "",
//     headCategory: "",
//   });

//   useEffect(() => {
//     loadSubs();
//     loadHeads();
//   }, []);

//   const loadSubs = async () => {
//     try {
//       const res = await getSubs();
//       const items = Array.isArray(res?.data) ? res.data : [];
//       setSubCategories(items);
//     } catch (error) {
//       console.error("Failed to load sub categories:", error);
//       setSubCategories([]);
//     }
//   };

//   const loadHeads = async () => {
//     try {
//       const res = await getHeads();
//       setHeadCategories(res?.data || []);
//     } catch (error) {
//       console.error("Failed to load head categories:", error);
//     }
//   };

//   const resetForm = () => {
//     setNewSub({ name: "", description: "", headCategory: "" });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleEdit = (item) => {
//     const selectedHead = headCategories.find(
//       (head) => head.name === (typeof item.headCategory === "string" ? item.headCategory : item.headCategory?.name)
//     );
  
//     setIsEditing(true);
//     setEditId(item.id);
  
//     setNewSub({
//       name: typeof item.name === "string" ? item.name : item.name.name || "",
//       description: typeof item.description === "string" ? item.description : "",
//       headCategory: selectedHead || null,
//     });
  
//     setModalOpen(true);
//   };
  

//   const handleDelete = async (id) => {
//     try {
//       await deleteSub(id);
//       setSubCategories((prev) => prev.filter((h) => h.id !== id));
//     } catch (error) {
//       console.error("Failed to delete sub category:", error);
//       alert("Silərkən xəta baş verdi.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!newSub.name.trim() || !newSub.headCategory?.name) {
//       alert("Adı və kateqoriya seçin.");
//       return;
//     }
  
//     try {
//       const payload = {
//         name: newSub.name.trim(),
//         headCategory: newSub.headCategory.name,
//       };
  
//       const body = JSON.stringify(payload);
  
//       if (isEditing) {
//         await updateSub(editId, body);
//       } else {
//         await createSub(body);
//       }
  
//       await loadSubs();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to save sub category:", error);
//       alert("Əməliyyat zamanı xəta baş verdi.");
//     }
//   };
  
//   const getNameString = (name) => {
//     if (typeof name === "string") return name;
//     if (name && typeof name === "object" && typeof name.name === "string") {
//       return name.name;
//     }
//     return "";
//   };
  

//   return (
//     <div className="p-8 mx-auto">
//       {modalOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
//           onClick={resetForm}
//         >
//           <div className={clsx(styles.modal)} onClick={(e) => e.stopPropagation()}>
//             <button
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
//               onClick={resetForm}
//               aria-label="Close modal"
//             >
//               &times;
//             </button>

//             <div className={clsx(styles.cardname)}>
//               {isEditing ? "Sub-kateqoriyanı yenilə" : "Yeni sub-kateqoriya əlavə et"}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//   type="text"
//   placeholder="Ad"
//   value={getNameString(newSub.name)}
//   onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
//   className={clsx(styles.modalinput)}
//   required
// />

//               <select
//                 value={newSub.headCategory?.id || ""}
//                 onChange={(e) => {
//                   const selected = headCategories.find(
//                     (head) => head.id === Number(e.target.value)
//                   );
//                   setNewSub({
//                     ...newSub,
//                     headCategory: selected || "",
//                   });
//                 }}
//                 required
//                 className={clsx(styles.modalinput)}
//               >
//                 <option value="">Baş kateqoriya seçin</option>
//                 {headCategories.map((head) => (
//                   <option key={head.id} value={head.id}>
//                     {head.name}
//                   </option>
//                 ))}
//               </select>

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
//                 Sub <br /> Kateqoriyaları
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
//                     setIsEditing(false);
//                     setEditId(null);
//                     setModalOpen(true);
//                   }}
//                 >
//                   <Open />
//                 </button>
//               </td>
//             </tr>

//             {subCategories
//               .filter((val) =>
//                 val.name?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((val) => (
//                 <tr key={val.id}>
//                   <td className={clsx(styles.cardrow)}>
//                     <div className={clsx(styles.cardedit)} onClick={() => handleEdit(val)}>
//                       <Edit />
//                     </div>
//                     {val.name} <br />
//                     <span className="text-xs text-gray-500">
//                       ({val.headCategory || "No Head Category"})
//                     </span>
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

// export default AdminSubCategories;

import {  useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import Edit from "../../../../assets/edit.svg";
import {
  getSubs,
  deleteSub,
  updateSub,
  createSub,
  getHeads,
} from "@/http/service";

import { useQuery } from "@tanstack/react-query";

const AdminSubCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newSub, setNewSub] = useState({
    name: "",
    description: "",
    headCategory: null,
  });

  // Load subcategories with React Query
  const {
    data: subCategories = [],
    isLoading: isLoadingSubs,
    isError: isErrorSubs,
    error: errorSubs,
    refetch: refetchSubs,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: async () => {
      const res = await getSubs();
      return Array.isArray(res?.data) ? res.data : [];
    },
  });

  // Load head categories with React Query
  const {
    data: headCategories = [],
    isLoading: isLoadingHeads,
    isError: isErrorHeads,
    error: errorHeads,
    refetch: refetchHeads,
  } = useQuery({
    queryKey: ["headCategories"],
    queryFn: async () => {
      const res = await getHeads();
      return Array.isArray(res?.data) ? res.data : [];
    },
  });

  const resetForm = () => {
    setNewSub({ name: "", description: "", headCategory: null });
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    const selectedHead = headCategories.find(
      (head) =>
        head.name ===
        (typeof item.headCategory === "string"
          ? item.headCategory
          : item.headCategory?.name)
    );

    setIsEditing(true);
    setEditId(item.id);

    setNewSub({
      name: typeof item.name === "string" ? item.name : item.name?.name || "",
      description:
        typeof item.description === "string" ? item.description : "",
      headCategory: selectedHead || null,
    });

    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSub(id);
      await refetchSubs();
    } catch (error) {
      console.error("Failed to delete sub category:", error);
      alert("Silərkən xəta baş verdi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newSub.name.trim() || !newSub.headCategory?.name) {
      alert("Adı və kateqoriya seçin.");
      return;
    }

    try {
      const payload = {
        name: newSub.name.trim(),
        headCategory: newSub.headCategory.name,
      };

      const body = JSON.stringify(payload);

      if (isEditing) {
        await updateSub(editId, body);
      } else {
        await createSub(body);
      }

      await refetchSubs();
      resetForm();
    } catch (error) {
      console.error("Failed to save sub category:", error);
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };

  const getNameString = (name) => {
    if (typeof name === "string") return name;
    if (name && typeof name === "object" && typeof name.name === "string") {
      return name.name;
    }
    return "";
  };

  if (isLoadingSubs || isLoadingHeads) return <p>Loading...</p>;
  if (isErrorSubs)
    return <p>Error loading sub categories: {errorSubs.message}</p>;
  if (isErrorHeads)
    return <p>Error loading head categories: {errorHeads.message}</p>;

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

            <div className={clsx(styles.cardname)}>
              {isEditing ? "Sub-kateqoriyanı yenilə" : "Yeni sub-kateqoriya əlavə et"}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ad"
                value={getNameString(newSub.name)}
                onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                className={clsx(styles.modalinput)}
                required
              />

              <select
                value={newSub.headCategory?.id || ""}
                onChange={(e) => {
                  const selected = headCategories.find(
                    (head) => head.id === Number(e.target.value)
                  );
                  setNewSub({
                    ...newSub,
                    headCategory: selected || null,
                  });
                }}
                required
                className={clsx(styles.modalinput)}
              >
                <option value="">Baş kateqoriya seçin</option>
                {headCategories.map((head) => (
                  <option key={head.id} value={head.id}>
                    {head.name}
                  </option>
                ))}
              </select>

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
                Sub <br /> Kateqoriyaları
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

            {subCategories
              .filter((val) =>
                val.name?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((val) => (
                <tr key={val.id}>
                  <td className={clsx(styles.cardrow)}>
                    <div
                      className={clsx(styles.cardedit)}
                      onClick={() => handleEdit(val)}
                    >
                      <Edit />
                    </div>
                    {val.name} <br />
                    <span className="text-xs text-gray-500">
                      ({val.headCategory || "No Head Category"})
                    </span>
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

export default AdminSubCategories;
