import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import { getHomeChoose, updateHomeChoose, deleteHomeChoose, createHomeChoose } from "@/http/homechoose";
import RichTextEditor from "../../RichTextEditor";

const AdminHomeChoose = () => {
  const [cards, setCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [content, setContent] = useState("");
  
  const [form, setForm] = useState({
    title: "",
    paragraph: "",
    image: { file: null, url: "" },
  });

  useEffect(() => {
    getHomeChoose()
      .then((res) => setCards(res.data || []))
      .catch(console.error);
  }, []);

  const openModal = (card = null) => {
    if (card) {
      setEditId(card.id);
      setForm({
        title: card.title,
        paragraph: card.paragraph,
        image: {
          file: null,
          url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.icon}`,
        },
      });
      setContent(card.paragraph);
    } else {
      setEditId(null);
      setForm({ title: "", paragraph: "", image: { file: null, url: "" } });
      setContent("");
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditId(null);
    setForm({ title: "", paragraph: "", image: { file: null, url: "" } });
    setContent("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteHomeChoose(id);
      const updated = await getHomeChoose();
      setCards(updated.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      const request = {
        title: form.title.trim(),
        paragraph: content.trim(),
      };

      formData.append(
        "request",
        new Blob([JSON.stringify(request)], { type: "application/json" })
      );

      if (form.image.file) {
        formData.append("icon", form.image.file);
      }

      if (editId) {
        await updateHomeChoose(editId, formData);
      } else {
        await createHomeChoose(formData);
      }

      const updated = await getHomeChoose();
      setCards(updated.data);
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

            <div className={clsx(styles.cardname)}>Kart {editId ? "redaktə et" : "əlavə et"}</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className={clsx(styles.modalinput)}
                placeholder="Başlıq"
              />

              <RichTextEditor value={content} onChange={setContent} />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({
                      ...prev,
                      image: { file, url: URL.createObjectURL(file) },
                    }));
                  }
                }}
                className="border p-2 w-full"
              />

              {form.image.url && (
                <img
                  src={form.image.url}
                  alt="Preview"
                  className="w-20 h-20 object-contain"
                />
              )}

              <button className={clsx(styles.modalbtn)} type="submit">
                Yadda saxla
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
                Niyə bizi seçməlisiniz?
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => openModal()}
                >
                  <Open />
                </button>
              </td>
            </tr>

            {cards.map((val) => (
              <tr key={val.id}>
                <td className="w-15">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${val.icon}`}
                    className="w-12 h-12 object-contain"
                  />
                </td>

                <td className={clsx(styles.cardrow)}>
                  <div className={clsx(styles.cardedit)} onClick={() => openModal(val)}>
                    <Edit />
                  </div>
                  <div>
                    <strong>{val.title}</strong>
                    <div dangerouslySetInnerHTML={{ __html: val.paragraph }} />
                  </div>
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

export default AdminHomeChoose;
