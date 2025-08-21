import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import { deleteCv, getCv } from "@/http/cv";
import { SearchIcon } from "lucide-react";

const AdminCv = () => {
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    getCv()
      .then((res) => {
        const data = Array.isArray(res?.data) ? res.data : [res.data];
        setMessages(data);
      })
      .catch((err) => {
        console.error("Failed to fetch CVs", err);
        setMessages([]);
      });
  }, []);


  const handleDelete = async (id) => {
    try {
      await deleteCv(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };
  const filteredMessages = messages.filter(item =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={clsx(styles.card)}>
      <div className="overflow-auto table-wrapper">
        <table>
          <thead>
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
            <tr>
              <th><div className={styles.flexCelll}>Ad və soyad</div></th>
              <th><div className={styles.flexCelll}>Pozisiya</div></th>
              <th><div className={styles.flexCelll}>Nömrə</div></th>
              <th><div className={styles.flexCelll}>E-mail</div></th>
              <th><div className={styles.flexCelll}>CV</div></th>
              <th><div className={styles.flexCelll}>Əməliyyatlar</div></th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((item) => (
              <tr key={item.id}>
                <td><div className={styles.flexCell}>{item.fullName}</div></td>
                <td><div className={styles.flexCell}>{item.position}</div></td>
                <td><div className={styles.flexCell}>{item.contactNumber}</div></td>
                <td><div className={styles.flexCell}>{item.email}</div></td>
                
                <td>
                  <div className={styles.flexCell}>
                    <a
                      href={`${baseURL}/v1/files/view/${item.cvFile}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadLink}
                    >
                      CV bax
                    </a>
                  </div>
                </td>
                <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() => openModal(item)}
                    className="text-blue-600 hover:underline"
                    style={{ padding: "4px 8px" }}
                  >
                    Open
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-50 px-4 overflow-x-hidden"
          onClick={closeModal}
        >
          <div
            className={clsx(styles.modal)}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "90vh", overflowY: "auto", width: "804px", padding: "35px 30px" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className={clsx(styles.cardname, "mb-6")}>CV Detalları</div>

            <div className="space-y-4">
              <div><strong>Ad və Soyad:</strong> {selectedItem.fullName}</div>
              <div><strong>Pozisiya:</strong> {selectedItem.position}</div>
              <div><strong>Nömrə:</strong> {selectedItem.contactNumber}</div>
              <div><strong>E-mail:</strong> {selectedItem.email}</div>
              <div><strong>Motivasiya:</strong>
                <p className="whitespace-pre-wrap border p-3 rounded-md bg-gray-50">
                  {selectedItem.motivation}
                </p>
              </div>
              <div>
                <strong>CV Faylı:</strong>{" "}
                <a
                  href={`${baseURL}/v1/files/view/${selectedItem.cvFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  CV bax
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCv;
