import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import Edit from "../../../../assets/edit.svg";
import {
  createContact,
  deleteContact,
  getContacts,
  updateContact,
} from "@/http/contact";

const AdminContacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [aboutValues, setAboutValues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newValue, setNewValue] = useState({
    title: "",
    description: "",
    iconFile: null,
    iconPreview: null,
    existingIcon: "",
  });

  useEffect(() => {
    getContacts()
      .then((res) => {
        const items = Array.isArray(res?.data) ? res.data : [res.data];
        const normalized = items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          icon: item.icon,
          iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
        }));
        setAboutValues(normalized);
      })
      .catch((err) => {
        console.error("Failed to load contacts:", err);
        setAboutValues([]);
      });
  }, []);
  

  const handleDelete = (id) => {
    deleteContact(id).then(() => {
      setAboutValues((prev) => prev.filter((val) => val.id !== id));
    });
  };

  const handleEdit = (val) => {
    setIsEditing(true);
    setEditId(val.id);
    setNewValue({
      title: val.title,
      description: val.description,
      iconFile: null,
      iconPreview: val.iconPreview,
      existingIcon: val.icon,
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewValue({
      title: "",
      description: "",
      iconFile: null,
      iconPreview: null,
      existingIcon: "",
    });
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newValue.title.trim() || !newValue.description.trim()) {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
      return;
    }

    try {
      const formData = new FormData();

      const requestPayload = {
        title: newValue.title.trim(),
        description: newValue.description.trim(),
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
          type: "application/json",
        })
      );

      if (newValue.iconFile) {
        formData.append("icon", newValue.iconFile);
      } else if (newValue.existingIcon) {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${newValue.existingIcon}`
        );
        const blob = await response.blob();
        const filename = newValue.existingIcon.split("/").pop() || "icon.png";
        const file = new File([blob], filename, { type: blob.type });
        formData.append("icon", file);
      } else {
        alert("İkon faylı tələb olunur.");
        return;
      }

      const response = isEditing
        ? await updateContact(editId, formData)
        : await createContact(formData);

      const updated = await getContacts();
      const updatedItems = Array.isArray(updated.data) ? updated.data : [updated.data];

        setAboutValues(
        updatedItems.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            icon: item.icon,
            iconPreview: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${item.icon}`,
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

            <div className={clsx(styles.cardname)}>Əlaqə Məlumatları</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Başlıq"
                value={newValue.title}
                onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                className={clsx(styles.modalinput)}
              />

              <input
                type="text"
                placeholder="Təsvir"
                value={newValue.description}
                onChange={(e) =>
                  setNewValue({ ...newValue, description: e.target.value })
                }
                className={clsx(styles.modalinput)}
              />

              <label className="block font-semibold">İkon yüklə (tək):</label>
              <input
                type="file"
                accept="image/*"
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

              {newValue.iconPreview && (
                <img
                  src={newValue.iconPreview}
                  alt="icon preview"
                  className="w-10 h-10 object-contain rounded mt-2"
                />
              )}

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
                Əlaqə
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

export default AdminContacts;
