import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Edit from "../../../../assets/edit.svg";
import { getAboutVision, updateAboutVision } from "@/http/vision";

const AdminAboutVision = () => {
  const [vision, setVision] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getAboutVision()
  .then((res) => {
    const item = res.data;
    setVision(item.vision || "");
  })
      .catch(console.error);
  }, []);
  

  const resetForm = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!vision.trim()) {
      alert("Zəhmət olmasa vizyonu daxil edin.");
      return;
    }
  
    try {
      const body = {
        vision: vision.trim()
      };
  
      await updateAboutVision(body); 
  
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

            <div className={clsx(styles.cardname)}>Vizyonumuz</div>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <textarea
                className="w-full p-2 border rounded"
                rows="5"
                value={vision}
                onChange={(e) => setVision(e.target.value)}
              ></textarea>

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
              <td className={clsx(styles.cardname)}>Vizyonumuz</td>
            </tr>
            <tr>
              <td className={clsx(styles.cardrow)}>
                <div
                  className={clsx(styles.cardedit)}
                  onClick={() => setModalOpen(true)}
                >
                  <Edit />
                </div>
                {vision}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAboutVision;
