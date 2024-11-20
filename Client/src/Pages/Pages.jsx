import React, { useState, useRef } from "react";
import "./Pages.scss";

function Pages() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    ustoz: "",
    guruhNomi: "",
    mavzu: "",
    nechtaKeldi: "",
    nechtaKelmadi: "",
    qoshimchaIzoh: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const ustozRef = useRef(null);
  const guruhNomiRef = useRef(null);
  const mavzuRef = useRef(null);
  const nechtaKeldiRef = useRef(null);
  const nechtaKelmadiRef = useRef(null);

  const validatePage = () => {
    let validationErrors = {};
    let focusField = null; // Fokus qilinadigan maydon faqat birinchi xato uchun

    if (page === 1) {
      if (!formData.ustoz.trim()) {
        validationErrors.ustoz = "Please enter a value";
        if (!focusField) focusField = ustozRef; // Fokus faqat birinchi xatoga qaratiladi
      }
    } else if (page === 2) {
      if (!formData.guruhNomi.trim()) {
        validationErrors.guruhNomi = "Please enter a value";
        if (!focusField) focusField = guruhNomiRef;
      }
      if (!formData.mavzu.trim()) {
        validationErrors.mavzu = "Please enter a value";
        if (!focusField) focusField = mavzuRef;
      }
    } else if (page === 3) {
      if (!formData.nechtaKeldi.trim()) {
        validationErrors.nechtaKeldi = "Please enter a value";
        if (!focusField) focusField = nechtaKeldiRef;
      }
      if (!formData.nechtaKelmadi.trim()) {
        validationErrors.nechtaKelmadi = "Please enter a value";
        if (!focusField) focusField = nechtaKelmadiRef;
      }
    }

    setErrors(validationErrors);

    if (focusField) {
      // To'ldirilmagan maydon mavjud bo'lsa, avtomatik fokus qiling
      focusField.current.focus();
    }

    return Object.keys(validationErrors).length === 0;
  };

  const handleNext = () => {
    if (validatePage()) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Ma'lumotlar muvaffaqiyatli to'plandi!");
    }, 2000);
  };

  return (
    <div className="form-container" onKeyDown={handleKeyPress} tabIndex="0">
      <PageIndicator currentPage={page} />

      {page === 1 && (
        <div className="form-page">
          <label>
            Ustoz <span>*</span>
          </label>
          <input
            ref={ustozRef} // Ref bog'landi
            type="text"
            name="ustoz"
            value={formData.ustoz}
            onChange={handleInputChange}
          />
          {errors.ustoz && <div className="error-modal">{errors.ustoz}</div>}
          <div className="buttons">
            <button onClick={handleNext}>Keyingi →</button>
          </div>
        </div>
      )}
      {page === 2 && (
        <div className="form-page">
          <label>
            Guruh nomi <span>*</span>
          </label>
          <input
            ref={guruhNomiRef} // Ref bog'landi
            type="text"
            name="guruhNomi"
            value={formData.guruhNomi}
            onChange={handleInputChange}
          />
          {errors.guruhNomi && (
            <div className="error-modal">{errors.guruhNomi}</div>
          )}
          <label>
            Mavzu <span>*</span>
          </label>
          <input
            ref={mavzuRef} // Ref bog'landi
            type="text"
            name="mavzu"
            value={formData.mavzu}
            onChange={handleInputChange}
          />
          {errors.mavzu && <div className="error-modal">{errors.mavzu}</div>}
          <div className="buttons">
            <button onClick={handleBack}>← Ortga</button>
            <button onClick={handleNext}>Keyingi →</button>
          </div>
        </div>
      )}
      {page === 3 && (
        <div className="form-page">
          <label>
            Nechta keldi <span>*</span>
          </label>
          <input
            ref={nechtaKeldiRef} // Ref bog'landi
            type="number"
            name="nechtaKeldi"
            value={formData.nechtaKeldi}
            onChange={handleInputChange}
          />
          {errors.nechtaKeldi && (
            <div className="error-modal">{errors.nechtaKeldi}</div>
          )}
          <label>
            Nechta kelmadi <span>*</span>
          </label>
          <input
            ref={nechtaKelmadiRef} // Ref bog'landi
            type="number"
            name="nechtaKelmadi"
            value={formData.nechtaKelmadi}
            onChange={handleInputChange}
          />
          {errors.nechtaKelmadi && (
            <div className="error-modal">{errors.nechtaKelmadi}</div>
          )}
          <div className="buttons">
            <button onClick={handleBack}>← Ortga</button>
            <button onClick={handleNext}>Keyingi →</button>
          </div>
        </div>
      )}
      {page === 4 && (
        <div className="form-page">
          <label>Qo'shimcha izoh</label>
          <textarea
            name="qoshimchaIzoh"
            value={formData.qoshimchaIzoh}
            onChange={handleInputChange}
          />
          <div className="buttons">
            <button onClick={handleBack}>← Ortga</button>
            <button
              onClick={handleSubmit}
              className="submit-btn"
              disabled={isLoading}>
              {isLoading ? "⏳ Yuklanmoqda..." : "Tamom →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PageIndicator({ currentPage }) {
  const pages = [1, 2, 3, 4];
  return (
    <div className="page-indicator">
      {pages.map((p) => (
        <div
          key={p}
          className={`indicator ${currentPage === p ? "current" : ""}`}
        />
      ))}
    </div>
  );
}

export default Pages;
