// import React, { useState } from 'react'
// import styles from './style.module.scss'

// import { postApiData } from "@/http/api";


// const CareerCv = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     contactNumber: '',
//     email: '',
//     position: '',
//     motivation: '',
//     file: null,
//   })

//   const handleChange = (e) => {
//     const { name, value, files } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }))
//   }
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
  
//   //   const { fullName, phone, email, position, motivation, file } = formData;
  
//   //   const cvData = {
//   //     fullName,
//   //     phone,
//   //     email,
//   //     position,
//   //     motivation,
//   //     fileName: file?.name || '',
//   //   };
  
//   //   try {
//   //     await postApiData("/v1/vacancy/apply", cvData);
//   //     alert("CV uğurla göndərildi!");
//   //   } catch (error) {
//   //     console.error("Error submitting CV:", error);
//   //     alert("Göndərmə zamanı xəta baş verdi.");
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const { fullName, contactNumber, email, position, motivation, file } = formData;
  
//     const form = new FormData();
  
//     // Create a JSON blob for "request"
//     const requestData = {
//       fullName,
//       contactNumber,
//       email,
//       position,
//       motivation,
//     };
  
//     form.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));
//     form.append('file', file); // ✅ correct

  
//     try {
//       await postApiData('/v1/vacancy/apply', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert("CV uğurla göndərildi!");
//       setFormData({
//         fullName: '',
//         contactNumber: '',
//         email: '',
//         position: '',
//         motivation: '',
//         file: null,
//       });
//     } catch (error) {
//       console.error("Error submitting CV:", error.response?.data || error.message);
//       alert(`Göndərmə zamanı xəta baş verdi: ${error.response?.data?.message || error.message}`);
//     }
//   };
  
  

//   return (
//    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
//      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <form onSubmit={handleSubmit} className={styles.formGrid}>
//       <h2 className={styles.title}>CV göndər</h2>

//       <div className={styles.inputGroupFull}>
//         <label>Ad və soyad</label>
//         <input type="text" name="fullName" onChange={handleChange} required className={styles.input} />
//       </div>

//       <div className={styles.inputGroupFull}>
//         <label>Əlaqə nömrəsi</label>
//         <input type="text" name="contactNumber" onChange={handleChange} required className={styles.input} />
//       </div>

//       <div className={styles.inputGroupFull}>
//         <label>E-mail</label>
//         <input type="email" name="email" onChange={handleChange} required className={styles.input} />
//       </div>

//       <div className={styles.inputGroupFull}>
//         <label>İşləmək istədiyiniz pozisiya</label>
//         <input type="text" name="position" onChange={handleChange} required className={styles.input} />
//       </div>

//       <div className={styles.inputGroupFull}>
//         <label>Bu sahə üzrə motivasiyanız</label>
//         <textarea name="motivation" onChange={handleChange} required className={styles.textarea} />
//       </div>

//       <div className={styles.fileAndButtonBlock}>
//   <label htmlFor="cvFile" className={styles.fileLabel}>CV faylınızı daxil edin</label>
//   <div className={styles.fileAndButton}>
//     <input
//       id="cvFile"
//       type="file"
//       name="file"
//       accept=".pdf,.doc,.docx"
//       onChange={handleChange}
//       required
//       className={styles.fileInput}
//     />
//     <button type="submit" className={styles.submitButton}>Göndər</button>
//   </div>
// </div>

//     </form>
//     </div>
//    </div>
//   )
// }

// export default CareerCv

import React, { useState, useRef } from 'react';
import styles from './style.module.scss';
import { postApiData } from "@/http/api";

const CareerCv = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    position: '',
    motivation: '',
    file: null,
  });

  const fileInputRef = useRef(null); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, contactNumber, email, position, motivation, file } = formData;

    const form = new FormData();
    const requestData = {
      fullName,
      contactNumber,
      email,
      position,
      motivation,
    };

    form.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));
    form.append('file', file);

    try {
      await postApiData('/v1/vacancy/applicant/apply', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("CV uğurla göndərildi!");

      setFormData({
        fullName: '',
        contactNumber: '',
        email: '',
        position: '',
        motivation: '',
        file: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error("Error submitting CV:", error.response?.data || error.message);
      alert(`Göndərmə zamanı xəta baş verdi: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <h2 className={styles.title}>CV göndər</h2>

          <div className={styles.inputGroupFull}>
            <label>Ad və soyad</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={styles.input} />
          </div>

          <div className={styles.inputGroupFull}>
            <label>Əlaqə nömrəsi</label>
            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required className={styles.input} />
          </div>

          <div className={styles.inputGroupFull}>
            <label>E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={styles.input} />
          </div>

          <div className={styles.inputGroupFull}>
            <label>İşləmək istədiyiniz pozisiya</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} required className={styles.input} />
          </div>

          <div className={styles.inputGroupFull}>
            <label>Bu sahə üzrə motivasiyanız</label>
            <textarea name="motivation" value={formData.motivation} onChange={handleChange} required className={styles.textarea} />
          </div>

          <div className={styles.fileAndButtonBlock}>
            <label htmlFor="cvFile" className={styles.fileLabel}>CV faylınızı daxil edin</label>
            <div className={styles.fileAndButton}>
              <input
                ref={fileInputRef}
                id="cvFile"
                type="file"
                name="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
                className={styles.fileInput}
              />
              <button type="submit" className={styles.submitButton}>Göndər</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerCv;
