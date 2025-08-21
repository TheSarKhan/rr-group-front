import { useEffect, useState } from "react";
import Open from "../../../../assets/open.svg";
import clsx from "clsx";
import styles from "./style.module.scss";
import Trash from "../../../../assets/trash.svg";
import {
  deleteContactMessages,
  getContactsMessages,
} from "@/http/contactMessages";
import { SearchIcon } from "lucide-react";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getContactsMessages()
      .then((res) => {
        const data = Array.isArray(res?.data) ? res.data : [res.data];
        setMessages(data);
      })
      .catch((err) => {
        console.error("Failed to fetch contact messages", err);
        setMessages([]);
      });
  }, []);
  const filteredMessages = messages.filter(item =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDelete = async (id) => {
    if (!window.confirm("Silinsin?")) return;
    try {
      await deleteContactMessages(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      // If modal is open for deleted message, close it
      if (selectedMessage?.id === id) {
        setModalOpen(false);
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert("Silərkən xəta baş verdi.");
    }
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div >
      <div className={clsx(styles.card)}>
      <div className="overflow-auto">
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
       <th><div className={styles.flexCelll}>Mövzu</div></th>
       <th><div className={styles.flexCelll}>Tarix</div></th>
      <th><div className={styles.flexCelll}>Nömrə</div></th>
       <th><div className={styles.flexCelll}>E-mail</div></th>
       <th><div className={styles.flexCelll}>Sil</div></th>
     </tr>
   </thead>
   <tbody>
     {filteredMessages.map((item) => (
      <tr key={item.id}>
        <td><div className={styles.flexCell}>{item.fullName}</div></td>
        <td><div className={styles.flexCell}>{item.topic}</div></td>
        <td><div className={styles.flexCell}>{new Date(item.createdAt).toLocaleDateString()}</div></td>
        <td><div className={styles.flexCell}>{item.phone}</div></td>
        <td><div className={styles.flexCell}>{item.email}</div></td>
        <td
  style={{
    display: "flex",
    alignItems: "center",  
    gap: "8px",          
  }}
>
  <button
    onClick={() => openModal(item)}
    className="text-blue-600 hover:underline"
    style={{ padding: "4px 8px" }}
  >
    Open
  </button>
  <button
    onClick={() => handleDelete(item.id)}
    className="text-red-600 hover:underline"
    style={{ padding: "4px" }}
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

      {/* Modal */}
      {modalOpen && selectedMessage && (
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

            <div className={clsx(styles.cardname, "mb-6")}>Mesaj Detalları</div>

            <div className="space-y-4">
              <div>
                <strong>Ad və Soyad:</strong> {selectedMessage.fullName}
              </div>
              <div>
                <strong>Mövzu:</strong> {selectedMessage.topic}
              </div>
              <div>
                <strong>Tarix:</strong>{" "}
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Nömrə:</strong> {selectedMessage.phone}
              </div>
              <div>
                <strong>E-mail:</strong> {selectedMessage.email}
              </div>
              <div>
                <strong>Mesaj:</strong>
                <p className="whitespace-pre-wrap break-words border p-3 rounded-md bg-gray-50">
            {selectedMessage.message}
          </p>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
