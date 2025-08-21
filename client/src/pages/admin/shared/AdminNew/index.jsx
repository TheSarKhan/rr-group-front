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

            <div className={clsx(styles.cardname)}>Yeni Xəbər</div>
            <form onSubmit={handleSubmit} className="space-y-4">
                        <input
              type="text"
              placeholder="Başlıq"
              value={newValue.title}
              onChange={(e) =>
                setNewValue((prev) => ({ ...prev, title: e.target.value }))
              }
              className={clsx(styles.modalinput)}
            />

            <RichTextEditor
              value={newValue.paragraph}
              onChange={(value) =>
                setNewValue((prev) => ({ ...prev, paragraph: value }))
              }
            />

              <label className="block font-semibold mt-4">
                Şəkillər yüklə (birdən çox):
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="border p-2 w-full"
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
              <div className="flex gap-2 flex-wrap mt-2">
                {newValue.imagePreviews.map(({ url, isExisting, file }, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
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
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
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
