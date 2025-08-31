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
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    onClick={resetForm}
    style={{ overflowY: "auto" }}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            {isEditing ? "Dəyəri Redaktə Et" : "Yeni Dəyər Əlavə Et"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Şirkət dəyərlərini yeniləyin" : "Şirkətinizin əsas dəyərlərini əlavə edin"}
          </p>
        </div>
        <button
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200"
          onClick={resetForm}
          aria-label="Modalı bağla"
          type="button"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Value Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            Dəyər Başlığı
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Məs: İnnovasiya, Keyfiyyət, Etimad..."
              value={editedCard.title}
              onChange={(e) =>
                setEditedCard((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Şirkətinizin əsas dəyərlərindən birini yazın
          </p>
        </div>

        {/* Value Description */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Dəyər Açıqlaması
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              rows={5}
              placeholder="Bu dəyərin şirkətiniz üçün nə ifadə etdiyini ətraflı yazın..."
              value={editedCard.description}
              onChange={(e) =>
                setEditedCard((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full p-4 pt-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-vertical min-h-[120px]"
              style={{ resize: "vertical" }}
            />
            <div className="absolute left-4 top-4 flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="text-sm font-medium">Təsvir</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Bu dəyərin əhəmiyyətini və praktiki tətbiqini izah edin
            </p>
            <span className="text-xs text-gray-400">
              {editedCard.description.length}/500 simvol
            </span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Bütün sahələr tələb olunur
            </div>
            
            {isEditing && (
              <div className="text-sm text-blue-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Redaktə rejimi
              </div>
            )}
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
              className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Dəyəri Yenilə
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Dəyəri Yadda Saxla
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview Section */}
        {(editedCard.title || editedCard.description) && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ön Baxış
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
              {editedCard.title && (
                <h3 className="font-bold text-gray-800 text-lg mb-2">{editedCard.title}</h3>
              )}
              {editedCard.description && (
                <p className="text-gray-600 text-sm leading-relaxed">{editedCard.description}</p>
              )}
              {!editedCard.title && !editedCard.description && (
                <p className="text-gray-400 italic">Məlumat daxil etdikcə ön baxış burada görünəcək...</p>
              )}
            </div>
          </div>
        )}
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
