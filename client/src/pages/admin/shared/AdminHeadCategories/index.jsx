// import { useEffect, useState } from "react";
// import Open from "../../../../assets/open.svg";
// import clsx from "clsx";
// import styles from "./style.module.scss";
// import Trash from "../../../../assets/trash.svg";
// import SearchIcon from "../../../../assets/searchicon.svg";
// import Edit from "../../../../assets/edit.svg";
// import {
//   getHeads,
//   createHead,
//   updateHead,
//   deleteHead,
// } from "@/http/service"; // Adjust import path if needed

// const AdminHeadCategories = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [headCategories, setHeadCategories] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [newHead, setNewHead] = useState({
//     name: "",
//     description: "",
//   });

//   useEffect(() => {
//     loadHeads();
//   }, []);

//   const loadHeads = async () => {
//     try {
//       const res = await getHeads();
//       const items = Array.isArray(res?.data) ? res.data : [];
//       setHeadCategories(items);
//     } catch (error) {
//       console.error("Failed to load head categories:", error);
//       setHeadCategories([]);
//     }
//   };

//   const resetForm = () => {
//     setNewHead({ name: "", description: "" });
//     setModalOpen(false);
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleEdit = (item) => {
//     setIsEditing(true);
//     setEditId(item.id);
//     setNewHead({
//       name: item.name || "",
//       description: item.description || "",
//     });
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Silinsin?")) return;
//     try {
//       await deleteHead(id);
//       setHeadCategories((prev) => prev.filter((h) => h.id !== id));
//     } catch (error) {
//       console.error("Failed to delete head category:", error);
//       alert("Silərkən xəta baş verdi.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newHead.name.trim()) {
//       alert("Adı daxil edin.");
//       return;
//     }

//     try {
//       const payload = {
//         name: newHead.name.trim(),
//         description: newHead.description.trim(),
//       };

//       if (isEditing) {
//         await updateHead(editId, payload);
//       } else {
//         await createHead(payload);
//       }

//       await loadHeads();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to save head category:", error);
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

//             <div className={clsx(styles.cardname)}>
//               {isEditing ? "Başlıq kateqoriyasını yenilə" : "Yeni başlıq kateqoriyası əlavə et"}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Ad"
//                 value={newHead.name}
//                 onChange={(e) =>
//                   setNewHead({ ...newHead, name: e.target.value })
//                 }
//                 className={clsx(styles.modalinput)}
//                 required
//               />

//               <input
//                 type="text"
//                 placeholder="Təsvir"
//                 value={newHead.description}
//                 onChange={(e) =>
//                   setNewHead({ ...newHead, description: e.target.value })
//                 }
//                 className={clsx(styles.modalinput)}
//               />

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
//                 Başlıq 
//                 <br/>
//                 Kateqoriyaları
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

//             {headCategories
//               .filter((val) =>
//                 val.name?.toLowerCase().includes(searchTerm.toLowerCase())
//               )
//               .map((val) => (
//                 <tr key={val.id}>
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

// export default AdminHeadCategories;

import { useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import Edit from "../../../../assets/edit.svg";
import {
  getHeads,
  createHead,
  updateHead,
  deleteHead,
} from "@/http/service";

import { useQuery } from "@tanstack/react-query";

const AdminHeadCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newHead, setNewHead] = useState({
    name: "",
    description: "",
  });

  // React Query for head categories with automatic cache refetching
  const {
    data: headCategories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["headCategories"],
    queryFn: async () => {
      const res = await getHeads();
      return Array.isArray(res?.data) ? res.data : [];
    },
  });

  const resetForm = () => {
    setNewHead({ name: "", description: "" });
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setNewHead({
      name: item.name || "",
      description: item.description || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silinsin?")) return;
    try {
      await deleteHead(id);
      // After delete, refetch data
      await refetch();
    } catch (error) {
      console.error("Failed to delete head category:", error);
      alert("Silərkən xəta baş verdi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newHead.name.trim()) {
      alert("Adı daxil edin.");
      return;
    }

    try {
      const payload = {
        name: newHead.name.trim(),
        description: newHead.description.trim(),
      };

      if (isEditing) {
        await updateHead(editId, payload);
      } else {
        await createHead(payload);
      }

      // Refetch head categories to update UI immediately
      await refetch();
      resetForm();
    } catch (error) {
      console.error("Failed to save head category:", error);
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };

  if (isLoading) return <p>Loading head categories...</p>;
  if (isError) return <p>Error loading head categories: {error.message}</p>;

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

            <div className={clsx(styles.cardname)}>
              {isEditing
                ? "Başlıq kateqoriyasını yenilə"
                : "Yeni başlıq kateqoriyası əlavə et"}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ad"
                value={newHead.name}
                onChange={(e) =>
                  setNewHead({ ...newHead, name: e.target.value })
                }
                className={clsx(styles.modalinput)}
                required
              />

              <input
                type="text"
                placeholder="Təsvir"
                value={newHead.description}
                onChange={(e) =>
                  setNewHead({ ...newHead, description: e.target.value })
                }
                className={clsx(styles.modalinput)}
              />

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
                Başlıq
                <br />
                Kateqoriyaları
                <div className={clsx(styles.cardsearch, "flex items-center gap-2")}>
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

            {headCategories
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
                    {val.name}
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

export default AdminHeadCategories;

