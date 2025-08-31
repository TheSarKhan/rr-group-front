

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
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    onClick={resetForm}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {isEditing ? "Nümayəndəliyi Redaktə Et" : "Yeni Nümayəndəlik"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Mövcud nümayəndəlik məlumatlarını yeniləyin" : "Sistemə yeni xarici nümayəndəlik əlavə edin"}
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
        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Header Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Başlıq
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nümayəndəlik başlığını daxil edin..."
                value={newValue.header}
                onChange={(e) => handleInputChange("header", e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Təsvir
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Qısa təsvir yazın..."
                value={newValue.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Rich Text Content */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Ətraflı Məzmun
          </label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white transition-all duration-200">
            <RichTextEditor
              value={newValue.content}
              onChange={(value) => handleInputChange("content", value)}
            />
          </div>
        </div>

        {/* Icon Upload Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            Nümayəndəlik İkonu
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-all duration-200 bg-gradient-to-br from-amber-50 to-yellow-50">
            <input
              type="file"
              accept="image/*"
              id="icon-upload"
              className="hidden"
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
            <label htmlFor="icon-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-amber-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-700 font-medium">İkon yükləyin</span>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG formatları • Tək fayl</p>
                </div>
              </div>
            </label>
          </div>

          {newValue.iconPreview && (
            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="relative">
                <img
                  src={newValue.iconPreview}
                  alt="icon preview"
                  className="w-16 h-16 object-contain rounded-lg border-2 border-white shadow-sm"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md transition-colors duration-200"
                  onClick={() => setNewValue(prev => ({ ...prev, iconFile: null, iconPreview: null }))}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">İkon hazırdır</span>
                <p className="text-xs text-gray-500">Dəyişmək üçün yeni fayl seçin</p>
              </div>
            </div>
          )}
        </div>

        {/* Images Upload Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            Nümayəndəlik Şəkilləri
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-rose-400 transition-all duration-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <input
              type="file"
              accept="image/*"
              multiple
              id="images-upload"
              className="hidden"
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
            <label htmlFor="images-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-rose-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-700 font-semibold text-lg">Nümayəndəlik şəkillərini yükləyin</span>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG formatları dəstəklənir • Çoxlu seçim mümkündür</p>
                </div>
              </div>
            </label>
          </div>

          {newValue.imagePreviews.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Yüklənən şəkillər:</span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                    {newValue.imagePreviews.length} şəkil
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setNewValue(prev => ({ 
                    ...prev, 
                    imagePreviews: [], 
                    imageFiles: [],
                    existingImages: []
                  }))}
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                >
                  Hamısını sil
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {newValue.imagePreviews.map(({ url, isExisting, file }, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-200">
                      <img
                        src={url}
                        alt={`Nümayəndəlik şəkli ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transform -translate-y-1 translate-x-1 transition-all duration-200"
                        onClick={() => {
                          const updatedPreviews = [...newValue.imagePreviews];
                          const removed = updatedPreviews.splice(index, 1)[0];

                          let updatedFiles = [...newValue.imageFiles];
                          let updatedExisting = [...newValue.existingImages];
                          if (removed.isExisting) {
                            const filename = removed.url.split("/").pop().split("?")[0];
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
                        title="Şəkli sil"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="px-2 py-1 bg-black/70 text-white rounded-md text-xs font-medium">
                        #{index + 1}
                      </span>
                      {isExisting && (
                        <span className="px-2 py-1 bg-blue-500/80 text-white rounded-md text-xs font-medium ml-1">
                          Mövcud
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
 

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button 
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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


