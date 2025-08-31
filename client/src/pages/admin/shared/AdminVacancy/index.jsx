 

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
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            {isEditing ? "Vakansiyanı Redaktə Et" : "Yeni Vakansiya"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Mövcud vakansiya məlumatlarını yeniləyin" : "Sistemə yeni vakansiya əlavə edin"}
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            Başlıq
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Başlığı daxil edin..."
            value={newValue.title}
            onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200"
          />
        </div>

        {/* Rich Text Editor */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            Məzmun
            <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white transition-all duration-200">
            <RichTextEditor
              value={newValue.content}
              onChange={(val) => setNewValue((prev) => ({ ...prev, content: val }))}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            İkon Yüklə 
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-all duration-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <input
              type="file"
              accept="image/*"
              id="vakansiya-image"
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
            <label htmlFor="vakansiya-image" className="cursor-pointer flex flex-col items-center gap-3">
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
