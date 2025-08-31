import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import RichTextEditor from "../../RichTextEditor";
import Edit from "../../../../assets/edit.svg";
import { createNew, deleteNew, getNews, updateNew } from "@/http/news";

const AdminNew = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aboutValues, setAboutValues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newValue, setNewValue] = useState({
    title: "",
    paragraph: "",
    imageFiles: [],
    imagePreviews: [],
    existingImages: [],
  });

  useEffect(() => {
    getNews()
      .then((res) => {
        const items = Array.isArray(res?.data) ? res.data : [];
        const normalized = items.map((item) => ({
          id: item.id,
          title: item.title,
          paragraph: item.paragraph,
          images: (item.images || []).map(
            (img) => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
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
    deleteNew(id).then(() => {
      setAboutValues((prev) => prev.filter((val) => val.id !== id));
    });
  };

  const handleEdit = (val) => {
    setIsEditing(true);
    setEditId(val.id);
    setNewValue({
      title: val.title,
      paragraph: val.paragraph,
      imageFiles: [],
      // imagePreviews: val.images.map((url) => ({ url, isExisting: true })),
      // existingImages: val.images.map((url) => url.split("/").pop()),
      imagePreviews: val.images.map((url) => ({ url, isExisting: true })),
existingImages: val.images.map((url) => url.split("/").pop()), // 👈 this is important

    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewValue({
      title: "",
      paragraph: "",
      imageFiles: [],
      imagePreviews: [],
      existingImages: [],
    });
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!newValue.title.trim() || !newValue.paragraph.trim()) {
  //     alert("Zəhmət olmasa bütün xanaları doldurun.");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     const requestPayload = {
  //       title: newValue.title.trim(),
  //       paragraph: newValue.paragraph.trim(),
  //     };

  //     formData.append(
  //       "request",
  //       new Blob([JSON.stringify(requestPayload)], {
  //         type: "application/json",
  //       })
  //     );

  //     newValue.imageFiles.forEach((file) => {
  //       formData.append("images", file);
  //     });

  //     const response = isEditing
  //       ? await updateNew(editId, formData)
  //       : await createNew(formData);

  //     const updated = await getNews();
  //     setAboutValues(
  //       updated.data.map((item) => ({
  //         id: item.id,
  //         title: item.title,
  //         paragraph: item.paragraph,
  //         images: (item.images || []).map(
  //           (img) => `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`
  //         ),
  //       }))
  //     );

  //     resetForm();
  //   } catch (err) {
  //     console.error("Submission error:", err.response?.data || err.message);
  //     alert("Əməliyyat zamanı xəta baş verdi.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newValue.title.trim() || !newValue.paragraph.trim()) {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      const requestPayload = {
        title: newValue.title.trim(),
        paragraph: newValue.paragraph.trim(),
        ...(isEditing && { images: [...newValue.existingImages] }) // ✅ include images ONLY in PUT
      };
  
      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
          type: "application/json",
        })
      );
  
      newValue.imageFiles.forEach((file) => {
        formData.append("images", file); // ✅ always add new files here
      });
  
      const response = isEditing
        ? await updateNew(editId, formData)
        : await createNew(formData);
  
      const updated = await getNews();
      setAboutValues(
        updated.data.map((item) => ({
          id: item.id,
          title: item.title,
          paragraph: item.paragraph,
          images: (item.images || []).map(
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
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Xəbəri Yenilə" : "Yeni Xəbər Əlavə Et"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Mövcud xəbəri yeniləyin" : "Sistemə yeni xəbər əlavə edin"}
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

        {/* Rich Text Editor */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            Məzmun <span className="text-red-500">*</span>
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

        {/* Şəkillər */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            Şəkillər Yüklə (birdən çox)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-rose-400 transition-all duration-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <input
              type="file"
              accept="image/*"
              multiple
              id="news-images"
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
            <label htmlFor="news-images" className="cursor-pointer flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Şəkilləri yükləyin</span>
              <span className="text-sm text-gray-500">PNG, JPG formatları dəstəklənir</span>
            </label>
          </div>

          <div className="flex gap-2 flex-wrap mt-2">
            {newValue.imagePreviews.map(({ url, file }, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`preview-${index}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  onClick={() => {
                    const updatedPreviews = [...newValue.imagePreviews];
                    const removed = updatedPreviews.splice(index, 1)[0];

                    const updatedFiles = [...newValue.imageFiles].filter(
                      (f) => f !== removed.file
                    );

                    setNewValue((prev) => ({
                      ...prev,
                      imagePreviews: updatedPreviews,
                      imageFiles: updatedFiles,
                    }));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
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
              Xəbər başlıqları
                <div className={clsx(styles.cardsearch, "flex items-center gap-0")}>
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
                val?.title?.toLowerCase()?.includes(searchTerm.toLowerCase())
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

export default AdminNew;
