import React, { useState } from 'react'
import styles from './style.module.scss'
import { postApiData } from "@/http/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    topic: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { fullName, phone, email, topic, message } = formData;
  
    const contactData = {
      fullName,
      phone,
      email,
      topic,
      message,
    };
  
    try {
      await postApiData("/v1/contact/apply", contactData);
      alert("Məlumat uğurla göndərildi!");
  
      // Clear form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        topic: '',
        message: '',
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Göndərmə zamanı xəta baş verdi.");
    }
  };
  

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div className={styles.inputGroupFull}>
          <input
            type="text"
            placeholder="Ad və soyad"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroupFull}>
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroupFull}>
          <input
            type="text"
            placeholder="Əlaqə nömrəsi"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroupFull}>
          <input
            type="text"
            placeholder="Mövzu"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroupFull}>
          <textarea
            name="message"
            placeholder="Mesaj"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>
        <div className={styles.fileAndButtonBlock}>
          <button type="submit" className={styles.submitButton}>Göndər</button>
        </div>
      </form>
    </div>
  )
}

export default Contact
