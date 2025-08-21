import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import Trash from "../../../../assets/trash.svg";
import Open from "../../../../assets/open.svg";
import { 
  getHomeAbout, 
  createAboutMission, 
  updateHomeAbout, 
  deleteHomeAbout 
} from "@/http/homeabout";

const AdminHomeAbout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editedCard, setEditedCard] = useState({ id: null, title: "", description: "" });
  const [cards, setCards] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = () => {
    getHomeAbout()
      .then((res) => setCards(res.data || []))
      .catch(console.error);
  };

  const openModal = (card = null) => {
    if (card) {
      setEditedCard({ id: card.id, title: card.title, description: card.description });
      setIsEditing(true);
    } else {
      setEditedCard({ id: null, title: "", description: "" });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const resetForm = () => {
    setModalOpen(false);
    setEditedCard({ id: null, title: "", description: "" });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmək istədiyinizə əminsiniz?")) return;
    try {
      await deleteHomeAbout(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Silinərkən xəta baş verdi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, title, description } = editedCard;

    if (!title.trim() || !description.trim()) {
      alert("Xanalar boş ola bilməz.");
      return;
    }

    try {
      const formData = new FormData();

      const request = {
        title: title.trim(),
        paragraph: description.trim(), 
      };
      

      formData.append(
        "request",
        new Blob([JSON.stringify(request)], { type: "application/json" })
      );

      if (isEditing) {
        await updateHomeAbout(id, formData);
      } else {
        await createAboutMission(formData);
      }

      loadCards();
      resetForm();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };

  return (
    <div className="p-8 mx-auto relative">
      {modalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
          onClick={resetForm}
          style={{ overflowY: "auto" }}
        >
          <div
            className={clsx(styles.modal)}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={resetForm}
              aria-label="Close modal"
              type="button"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname)}>
              {isEditing ? "Kartı redaktə et" : "Yeni əlavə et"}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Başlıq"
                className={clsx(styles.modalinput)}
                value={editedCard.title}
                onChange={(e) =>
                  setEditedCard((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <textarea
                rows={4}
                placeholder="Açıqlama"
                className={clsx(styles.modalinput)}
                style={{ resize: "vertical" }}
                value={editedCard.description}
                onChange={(e) =>
                  setEditedCard((prev) => ({ ...prev, description: e.target.value }))
                }
              />
              <button className={clsx(styles.modalbtn)} type="submit">
                Yadda saxla
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={clsx(styles.card)} style={{ position: "relative" }}>
        <table className="w-full table-auto border-collapse">
          <tbody>
            <tr>
              <td className={clsx(styles.cardname, "flex justify-between items-center")}>
                Dəyərlərimiz
               <button
                                 className={clsx(styles.cardopen)}
                                 onClick={() => openModal()}
                               >
                                 <Open />
                               </button>
              </td>
            </tr>

            {cards.map((card) => (
              <tr key={card.id}>
                <td className={clsx(styles.cardrow, "flex justify-between items-center")}>
                  <div>
                    <strong>{card.title}</strong>: {card.description}
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className={clsx(styles.cardedit)}
                      onClick={() => openModal(card)}
                      type="button"
                      aria-label="Redaktə et"
                    >
                      <Edit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(card.id)}
                      type="button"
                      aria-label="Sil"
                    >
                       <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomeAbout;
