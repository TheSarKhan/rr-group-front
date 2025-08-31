 

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {isEditing ? "Layihəni Redaktə Et" : "Yeni Layihə"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Mövcud layihə məlumatlarını yeniləyin" : "Sistemə yeni layihə əlavə edin"}
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
        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Layihə Adı
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Layihənin adını daxil edin..."
                value={newValue.name}
                onChange={(e) => setNewValue({ ...newValue, name: e.target.value })}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>

          {/* Order Owner */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Sifariş Sahibi
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Müştəri və ya təşkilat adı..."
                value={newValue.orderOwner}
                onChange={(e) => setNewValue({ ...newValue, orderOwner: e.target.value })}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Construction Date */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            İnşaat Tarixi
            <span className="text-red-500">*</span>
          </label>
          <div className="relative max-w-md">
            <input
              type="date"
              value={newValue.constructDate}
              onChange={(e) => setNewValue({ ...newValue, constructDate: e.target.value })}
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Rich Text Editor Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Layihə Təsviri
            <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white transition-all duration-200">
            <RichTextEditor
              value={content}
              onChange={setContent}
            />
          </div>
        </div>

        {/* Project Images Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            Layihə Şəkilləri
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-rose-400 transition-all duration-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <input
              type="file"
              accept="image/*"
              multiple
              id="project-images"
              className="hidden"
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
                e.target.value = "";
              }}
            />
            <label htmlFor="project-images" className="cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-rose-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-700 font-semibold text-lg">Layihə şəkillərini yükləyin</span>
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
                  onClick={() => setNewValue(prev => ({ ...prev, imagePreviews: [], imageFiles: [] }))}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Hamısını sil
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {newValue.imagePreviews.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-200">
                      <img
                        src={url}
                        alt={`Layihə şəkli ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transform -translate-y-1 translate-x-1"
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Content */}
        
          

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bütün sahələr tələb olunur
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Ləğv et
            </button>
            <button 
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Layihəni Yenilə
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Layihəni Yadda Saxla
                </>
              )}
            </button>
          </div>
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
