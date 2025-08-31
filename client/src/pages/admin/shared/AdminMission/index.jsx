 

import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import RichTextEditor from "../../RichTextEditor";
import Edit from "../../../../assets/edit.svg";
import { createAboutMission, deleteAboutMission, getAboutMissions, updateAboutMission } from "@/http/mission";

const AdminAboutMissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aboutValues, setAboutValues] = useState([]);
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newValue, setNewValue] = useState({
    name: "",
    description: "",
    image: { url: "", file: null },
  });

  useEffect(() => {
    getAboutMissions()
      .then(res => {
        const items = res.data; 
        const normalized = items.map(item => ({
          id: item.id,
          name: item.title,
          description: item.description,
          image: {
            url: item.icon
              ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`
              : "https://via.placeholder.com/150",
            file: null
          }
        }));
        setAboutValues(normalized);
      })
      .catch(console.error);
  }, []);

  const normalizeMission = (item) => ({
    id: item.id,
    name: item.title,
    description: item.description,
    image: {
      url: item.icon
        ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`
        : "https://via.placeholder.com/150",
      file: null
    },
  });

  const handleDelete = (id) => {
    deleteAboutMission(id).then(() => {
      setAboutValues((prev) => prev.filter((val) => val.id !== id));
    });
  };

  const handleEdit = (val) => {
    setIsEditing(true);
    setEditId(val.id);

    setNewValue({
      name: val.name,
      description: val.description,
      image: {
        file: null,
        url: val.image.url,
      },
    });

    setContent(val.description || "");
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewValue({ name: "", description: "", image: { url: "", file: null } });
    setContent("");
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newValue.name.trim() || !content.trim()) {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }

    try {
      const formData = new FormData();

      const dto = {
        title: newValue.name.trim(),
        description: content.trim(),
      };

      formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));

      if (newValue.image.file) {
        formData.append("file", newValue.image.file);
      }

      let response;
      if (isEditing) {
        response = await updateAboutMission(editId, formData);
        const normalized = normalizeMission(response.data);
        setAboutValues((prev) =>
          prev.map((item) => (item.id === editId ? normalized : item))
        );
      } else {
        response = await createAboutMission(formData);
        const normalized = normalizeMission(response.data);
        setAboutValues((prev) => [...prev, normalized]);
      }

      resetForm();
    } catch (err) {
      console.error(
        isEditing ? "Update failed:" : "Create failed:",
        err.response?.data || err.message
      );
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
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6l4 2"
              />
            </svg>
          </span>
          Missiyamız
        </h2>

        <button
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200"
          onClick={resetForm}
          aria-label="Modalı bağla"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Ad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ad daxil edin..."
            value={newValue.name}
            onChange={(e) => setNewValue({ ...newValue, name: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-all duration-200"
          />
        </div>

        {/* Rich Text */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Açıqlama
          </label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white transition-all duration-200">
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            Şəkil
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-all duration-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewValue((prev) => ({
                    ...prev,
                    image: {
                      file,
                      url: URL.createObjectURL(file),
                    },
                  }));
                }
              }}
            />
            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-rose-200 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Şəkil yüklə</span>
              <p className="text-sm text-gray-500">PNG, JPG dəstəklənir</p>
            </label>
          </div>

          {newValue.image?.url && (
            <div className="mt-4">
              <img
                src={newValue.image.url}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200 shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
        >
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
                Missiyamız
                <div
                  className={clsx(
                    styles.cardsearch,
                    "flex items-center gap-2"
                  )}
                >
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
              .filter(val => {
                if (!val?.name || typeof val.name !== 'string') return false;
                return val.name.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map(val => (
                <tr key={val.id}>
                  <td className="w-15">
                    <img
                      src={val.image.url}
                      className="w-12 h-12 object-contain"
                    />
                  </td>

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

export default AdminAboutMissions;

