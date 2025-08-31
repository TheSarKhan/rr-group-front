 
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
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    onClick={resetForm}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isEditing ? "KSM Redaktə Et" : "Yeni KSM Əlavə Et"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Mövcud KSM məlumatlarını yeniləyin" : "KSM sisteminə yeni dəyər əlavə edin"}
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
        {/* Title Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Başlıq
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="KSM başlığını daxil edin..."
            value={newValue.title}
            onChange={(e) =>
              setNewValue((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>

        {/* Description Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Qısa Təsvir
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Məzmunun qısa təsvirini yazın..."
            value={newValue.description}
            onChange={(e) =>
              setNewValue((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
          />
        </div>

        {/* Rich Text Editor Section */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Ətraflı Mətn
            <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white transition-all duration-200">
            <RichTextEditor
              value={newValue.paragraph}
              onChange={(value) =>
                setNewValue((prev) => ({ ...prev, paragraph: value }))
              }
            />
          </div>
        </div>

        {/* Icon Upload Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            İkon Şəkli
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-yellow-400 transition-all duration-200 bg-gradient-to-br from-yellow-50 to-orange-50">
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
                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">İkon yükləyin</span>
                <span className="text-sm text-gray-500">PNG, JPG, SVG dəstəklənir</span>
              </div>
            </label>
          </div>

          {newValue.iconPreview && (
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <img
                src={newValue.iconPreview}
                alt="icon preview"
                className="w-16 h-16 object-contain rounded-lg border-2 border-white shadow-sm"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">İkon hazırdır</p>
                <p className="text-xs text-gray-600">Yüklənən şəkil ön baxışda göstərilir</p>
              </div>
            </div>
          )}
        </div>

        {/* Images Upload Section */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            Əlavə Şəkillər
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-all duration-200 bg-gradient-to-br from-indigo-50 to-blue-50">
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
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Şəkillər yükləyin</span>
                <span className="text-sm text-gray-500">Çoxlu şəkil seçə bilərsiniz</span>
              </div>
            </label>
          </div>

          {newValue.imagePreviews.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Yüklənən şəkillər:</span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  {newValue.imagePreviews.length} şəkil
                </span>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {newValue.imagePreviews.map(({ url, isExisting, file }, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-200"
                    />
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        className="w-7 h-7 bg-red-500 text-white text-sm rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transform -translate-y-1 translate-x-1"
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
                        title="Şəkli sil"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {isExisting && (
                      <div className="absolute bottom-1 left-1">
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          Mövcud
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
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
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Yenilə
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yadda saxla
              </>
            )}
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

