import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import Edit from "../../../../assets/edit.svg";
import Open from "../../../../assets/open.svg";
import { getSocials, createSocial, updateSocial, deleteSocial } from "@/http/social";

const AdminSocial = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [socials, setSocials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newValue, setNewValue] = useState({
    title: "",
    link:"",
    imageFile: null,
    imagePreview: null,
    existingImage: "",
  });

  useEffect(() => {
    loadSocials();
  }, []);

  const loadSocials = async () => {
    try {
      const res = await getSocials();
      const data = Array.isArray(res?.data) ? res.data : [];
      const normalized = data.map((item) => ({
        ...item,
        imagePreview: item.image
          ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.image}`
          : null,
      }));
      setSocials(normalized);
    } catch (err) {
      console.error("Failed to load socials:", err);
      setSocials([]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silinsin?")) return;
    try {
      await deleteSocial(id);
      setSocials((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Silərkən xəta baş verdi.");
    }
  };

  // const handleEdit = (item) => {
  //   setIsEditing(true);
  //   setEditId(item.id);
  //   setNewValue({
  //     title: item.title || "",
  //     imageFile: null,
  //     imagePreview: item.imagePreview || null,
  //     existingImage: item.image || "",
  //   });
  //   setModalOpen(true);
  // };
  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setNewValue({
      title: item.title || "",
      link: item.link || "",
      imageFile: null,
      imagePreview: item.imagePreview || null,
      existingImage: item.image || "",
    });
    setModalOpen(true);
  };
  

  const resetForm = () => {
    setNewValue({
      title: "",
      link:"",
      imageFile: null,
      imagePreview: null,
      existingImage: "",
    });
    setIsEditing(false);
    setEditId(null);
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newValue.title.trim()) {
      alert("Zəhmət olmasa başlıq daxil edin.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "dto",
        new Blob(
          [
            JSON.stringify({
              title: newValue.title.trim(),
              link: newValue.link.trim(),
            }),
          ],
          { type: "application/json" }
        )
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
        alert("Şəkil yükləməlisiniz.");
        return;
      }

      if (isEditing) {
        await updateSocial(editId, formData);
      } else {
        await createSocial(formData);
      }

      await loadSocials();
      resetForm();
    } catch (err) {
      console.error("Submission error:", err);
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };

  return (
    <div className="p-8 mx-auto">
      {modalOpen && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    onClick={resetForm}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Sosial Şəbəkəni Yenilə" : "Yeni Sosial Şəbəkə Əlavə Et"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Mövcud sosial şəbəkə məlumatlarını yeniləyin" : "Yeni sosial şəbəkə əlavə edin"}
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
        {/* Başlıq */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            Başlıq <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Başlığı daxil edin..."
            value={newValue.title}
            onChange={(e) =>
              setNewValue((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 hover:bg-white transition-all duration-200"
            required
          />
        </div>

        {/* Link */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            Link <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Linki daxil edin..."
            value={newValue.link}
            onChange={(e) =>
              setNewValue((prev) => ({ ...prev, link: e.target.value }))
            }
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 hover:bg-white transition-all duration-200"
            required
          />
        </div>

        {/* Şəkil */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            Şəkil Yüklə (ixtiyari)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-all duration-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <input
              type="file"
              accept="image/*"
              id="social-image"
              className="hidden"
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
            <label htmlFor="social-image" className="cursor-pointer flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Şəkli yükləyin</span>
              <span className="text-sm text-gray-500">PNG, JPG formatları dəstəklənir</span>
            </label>
          </div>

          {newValue.imagePreview && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center gap-4">
              <img
                src={newValue.imagePreview}
                alt="image preview"
                className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-md"
              />
              <button
                type="button"
                onClick={() => setNewValue(prev => ({ ...prev, imageFile: null, imagePreview: null }))}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Şəkli sil
              </button>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={resetForm}
            className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all duration-200"
          >
            Ləğv et
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isEditing ? "Yenilə" : "Yadda saxla"}
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
                Sosial 
                <br />
                Şəbəkələr
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

            {socials
              .filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td className="w-20">
                    {item.imagePreview && (
                      <img
                        src={item.imagePreview}
                        alt={item.title}
                        className="w-12 h-12 object-contain rounded"
                      />
                    )}
                  </td>
                  <td className={clsx(styles.cardrow)}>
                    <div
                      className={clsx(styles.cardedit)}
                      onClick={() => handleEdit(item)}
                    >
                      <Edit />
                    </div>
                    {item.title}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
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

export default AdminSocial;
