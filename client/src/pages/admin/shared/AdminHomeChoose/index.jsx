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
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            {editId ? "Kartı Redaktə Et" : "Yeni Kart Əlavə Et"}
          </h2>
          <p className="text-gray-600 mt-1">
            {editId ? "Mövcud kart məlumatlarını yeniləyin" : "Sistemə yeni kart məzmunu əlavə edin"}
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
        {/* Card Title */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            Kart Başlığı
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Kartın başlığını daxil edin..."
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Qısa və məzmunlu başlıq seçin
          </p>
        </div>

        {/* Rich Text Editor */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Kart Məzmunu
            <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white transition-all duration-200">
            <RichTextEditor value={content} onChange={setContent} />
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Formatlaşdırma və stilləri istifadə edə bilərsiniz
          </p>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            Kart Şəkli
            <span className="text-gray-500 text-xs">(ixtiyari)</span>
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-all duration-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <input
              type="file"
              accept="image/*"
              id="card-image"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setForm((prev) => ({
                    ...prev,
                    image: { file, url: URL.createObjectURL(file) },
                  }));
                }
              }}
            />
            <label htmlFor="card-image" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">Kart şəklini yükləyin</span>
                <span className="text-sm text-gray-500">PNG, JPG formatları dəstəklənir</span>
              </div>
            </label>
          </div>

          {form.image.url && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={form.image.url}
                    alt="Kart şəkli ön baxış"
                    className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-md"
                  />
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Şəkil hazırdır</p>
                  <p className="text-xs text-gray-600 mt-1">Yüklənən şəkil kartda göstəriləcək</p>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, image: { file: null, url: null } }))}
                    className="mt-2 text-xs text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Şəkli sil
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Başlıq və məzmun mütləqdir
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
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              {editId ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Kartı Yenilə
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Kartı Yadda Saxla
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
