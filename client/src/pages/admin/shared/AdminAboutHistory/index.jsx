import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import { getAboutHistory, updateAboutHistory } from "@/http/history";
import RichTextEditor from "../../RichTextEditor";  // import your rich text editor

const AdminAboutHistory = () => {
  const [history, setHistory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getAboutHistory()
      .then((res) => {
        const item = res.data;
        setHistory(item.history || "");
      })
      .catch(console.error);
  }, []);

  const resetForm = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!history.trim()) {
      alert("Zəhmət olmasa tarixi daxil edin.");
      return;
    }

    try {
      const body = {
        history: history.trim(),
      };

      await updateAboutHistory(body);

      resetForm();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
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

            <div className={clsx(styles.cardname)}>Korporativ Tarix</div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <RichTextEditor value={history} onChange={setHistory} />

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
              <td className={clsx(styles.cardname)}>Korporativ tarix</td>
            </tr>
            <tr>
              <td className={clsx(styles.cardrow)}>
                <div
                  className={clsx(styles.cardedit)}
                  onClick={() => setModalOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <Edit />
                </div>
                <div dangerouslySetInnerHTML={{ __html: history }} />

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAboutHistory;
