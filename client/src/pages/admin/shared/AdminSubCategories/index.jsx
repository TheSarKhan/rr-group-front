 
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
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    onClick={resetForm}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            {isEditing ? "Alt Kateqoriyanı Redaktə Et" : "Yeni Alt Kateqoriya"}
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            {isEditing ? "Mövcud alt kateqoriya məlumatlarını yeniləyin" : "Sistemə yeni alt kateqoriya əlavə edin"}
          </p>
        </div>
        <button
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200"
          onClick={resetForm}
          aria-label="Modalı bağla"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            Alt Kateqoriya Adı
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Alt kateqoriya adını daxil edin..."
              value={getNameString(newSub.name)}
              onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
              required
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>

        {/* Head Category Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Baş Kateqoriya
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
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
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
            >
              <option value="">Baş kateqoriya seçin</option>
              {headCategories.map((head) => (
                <option key={head.id} value={head.id}>
                  {head.name}
                </option>
              ))}
            </select>
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Category Relationship Visual */}
        {newSub.headCategory && (
          <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="font-medium text-emerald-700">{newSub.headCategory.name}</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="font-medium text-teal-700">{getNameString(newSub.name) || "Yeni alt kateqoriya"}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Bu alt kateqoriya seçilmiş baş kateqoriya altında yaradılacaq</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button 
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isEditing ? "Yenilə" : "Yadda Saxla"}
            </span>
          </button>
        </div>
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
