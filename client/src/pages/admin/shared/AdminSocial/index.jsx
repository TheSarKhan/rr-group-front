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
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
          onClick={resetForm}
        >
          <div
            className={clsx(styles.modal)}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "90vh", overflowY: "auto", width: "804px" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={resetForm}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname)}>
              {isEditing ? "Sosial Şəbəkəni Yenilə" : "Yeni Sosial Şəbəkə Əlavə Et"}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Başlıq"
                value={newValue.title}
                onChange={(e) =>
                  setNewValue((prev) => ({ ...prev, title: e.target.value }))
                }
                className={clsx(styles.modalinput)}
                required
              />
              <input
                type="text"
                placeholder="Link"
                value={newValue.link}
                onChange={(e) =>
                  setNewValue((prev) => ({ ...prev, link: e.target.value }))
                }
                className={clsx(styles.modalinput)}
                required
              />


              <label className="block font-semibold">Şəkil yüklə (tək):</label>
              <input
                type="file"
                accept="image/*"
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

              {newValue.imagePreview && (
                <img
                  src={newValue.imagePreview}
                  alt="image preview"
                  className="w-20 h-20 object-contain rounded mt-2"
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
