// import React, { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Define the callback globally BEFORE script loads
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,az,ru",
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element"
//       );
//     };

//     // Dynamically load the official Google Translate script
//     const script = document.createElement("script");
//     script.src =
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     document.body.appendChild(script);

//     // Cleanup on unmount
//     return () => {
//       document.body.removeChild(script);
//       delete window.googleTranslateElementInit;
//     };
//   }, []);

//   return (
//     <div
//       id="google_translate_element"
//       style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}
//     />
//   );
// };

// export default GoogleTranslate;

// import React, { useEffect } from "react";

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Clean up any existing widget before creating a new one (important if React StrictMode remounts)
//     const existingWidget = document.getElementById("google_translate_element");
//     if (existingWidget) {
//       existingWidget.innerHTML = "";
//     }

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "az", // <-- set Azerbaijani as the source language
//           includedLanguages: "az,en,ru",
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           autoDisplay: false,
//         },
//         "google_translate_element"
//       );
//     };

//     // Load the Google Translate script dynamically
//     const script = document.createElement("script");
//     script.src =
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//       delete window.googleTranslateElementInit;
//     };
//   }, []);

//   return (
//     <>
//       <div
//         id="google_translate_element"
//         style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}
//       />
//       <style>{`
//         /* Hide "Powered by Google" link and label */
//         .goog-logo-link { display: none !important; }
//         .goog-te-gadget {
//           font-size: 0 !important;
//         }
//         .goog-te-gadget .goog-te-combo {
//           font-size: 14px !important;
//           color: #000 !important;
//           visibility: visible !important;
//           display: inline-block !important;
//           border: 1px solid #ccc;
//           padding: 4px;
//           background: white;
//           z-index: 9999;
//         }
//       `}</style>
//     </>
//   );
// };

// export default GoogleTranslate;
import React, { useEffect, useState } from "react";

const languages = [
  { code: "az", label: "Azerbaijani" },
  { code: "en", label: "English" },
  { code: "ru", label: "Russian" },
];

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState("az");

  useEffect(() => {
    // Load Google Translate script
    if (!window.google || !window.google.translate) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: "az",
        includedLanguages: languages.map((l) => l.code).join(","),
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      });
    };
  }, []);

  const setGoogleTranslateCookie = (lang) => {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year
    document.cookie = `googtrans=/az/${lang};expires=${expireDate.toUTCString()};path=/;domain=${window.location.hostname}`;
    document.cookie = `googtrans=/az/${lang};expires=${expireDate.toUTCString()};path=/`;
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    setGoogleTranslateCookie(lang);
    // Reload page so Google Translate picks up new cookie and translates
    window.location.reload();
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 9999,
          backgroundColor: "#fff",
          padding: "8px 12px",
          borderRadius: 6,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <select
          aria-label="Select language"
          value={selectedLang}
          onChange={handleLanguageChange}
          style={{
            padding: "6px 10px",
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {languages.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>
  
      <style>{`
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
      `}</style>
    </>
  );
  
};

export default GoogleTranslate;
