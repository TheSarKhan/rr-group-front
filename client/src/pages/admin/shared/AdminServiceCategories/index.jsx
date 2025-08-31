 

import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import styles from "./style.module.scss";
import Open from "../../../../assets/open.svg";
import Trash from "../../../../assets/trash.svg";
import SearchIcon from "../../../../assets/searchicon.svg";
import Edit from "../../../../assets/edit.svg";
import RichTextEditor from "../../RichTextEditor";

import {
  getCards,
  createCard,
  deleteCard,
  getHeads,
  getSubs,
  updateCard,
} from "@/http/service";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AdminServiceCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const formRef = useRef();

  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState({
    headCategory: "",
    subCategory: "",
    header: "",
    description: "",
    content: "",
    mainImageFile: null,
    mainImagePreview: null,
    imageFiles: [],
    imagePreviews: [],
    existingImages: [],
  });

  // React Query: Fetch cards
  const {
    data: cards = [],
    isLoading: loadingCards,
    isError: errorCards,
    error: cardsError,
  } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await getCards();
      return res.data || [];
    },
  });

  // React Query: Fetch head categories
  const {
    data: headCategories = [],
    isLoading: loadingHeads,
    isError: errorHeads,
    error: headsError,
  } = useQuery({
    queryKey: ["headCategories"],
    queryFn: async () => {
      const res = await getHeads();
      return res.data || [];
    },
  });

  // React Query: Fetch sub categories
  const {
    data: allSubCategories = [],
    isLoading: loadingSubs,
    isError: errorSubs,
    error: subsError,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: async () => {
      const res = await getSubs();
      return res.data || [];
    },
  });

  // Filter subcategories when headCategory changes
  useEffect(() => {
    if (formData.headCategory) {
      const filtered = allSubCategories.filter(
        (sub) => sub.headCategory === formData.headCategory
      );
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  }, [formData.headCategory, allSubCategories]);

  // Reset form function
  const resetForm = () => {
    setFormData({
      headCategory: "",
      subCategory: "",
      header: "",
      description: "",
      content: "",
      mainImageFile: null,
      mainImagePreview: null,
      imageFiles: [],
      imagePreviews: [],
      existingImages: [],
    });
    setFilteredSubCategories([]);
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
  };

  // Handle edit: populate form with card data
  const handleEdit = (card) => {
    const filteredSubs = allSubCategories.filter(
      (sub) => sub.headCategory === card.headCategory
    );
    setFilteredSubCategories(filteredSubs);

    setIsEditing(true);
    setEditId(card.id);

    setFormData({
      headCategory: card.headCategory || "",
      subCategory: card.subCategory || "",
      header: card.header || "",
      description: card.description || "",
      content: card.content?.contentWrite || "",
      mainImageFile: null,
      mainImagePreview: card.content?.mainImage
        ? `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${card.content.mainImage}`
        : null,
      imageFiles: [],
      imagePreviews: (card.content?.images || []).map((img) => ({
        url: `${import.meta.env.VITE_API_BASE_URL}/v1/files/view/${img}`,
        isExisting: true,
      })),
      existingImages: card.content?.images || [],
    });

    setModalOpen(true);
  };

  // Handle input change helper
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Mutations
  const queryKeyCards = ["cards"];

  const createMutation = useMutation({
    mutationFn: (payload) => createCard(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyCards);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateCard(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyCards);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeyCards);
    },
  });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.header.trim() || !formData.headCategory.trim()) {
      alert("Zəhmət olmasa başlıq və baş kateqoriyanı doldurun.");
      return;
    }

    const cardDto = {
      headCategory: formData.headCategory,
      subCategory: formData.subCategory,
      header: formData.header,
      description: formData.description,
      content: {
        contentWrite: formData.content,
      },
    };

    // Only in editing mode add existingImages to the DTO
    if (isEditing) {
      cardDto.images = [...formData.existingImages];
    }

    const payload = new FormData();
    payload.append(
      "cardDto",
      new Blob([JSON.stringify(cardDto)], { type: "application/json" })
    );

    if (formData.mainImageFile) {
      payload.append("mainImage", formData.mainImageFile);
    } else if (formData.mainImagePreview) {
      try {
        const existingImageName = formData.mainImagePreview.split("/").pop();
        const response = await fetch(formData.mainImagePreview);
        const blob = await response.blob();
        const file = new File([blob], existingImageName || "mainImage.png", {
          type: blob.type,
        });
        payload.append("mainImage", file);
      } catch (err) {
        console.error("Failed to reuse existing main image:", err);
        alert("Main şəkil yüklənə bilmədi.");
        return;
      }
    } else {
      alert("Zəhmət olmasa əsas şəkil yükləyin.");
      return;
    }

    formData.imageFiles.forEach((file) => {
      payload.append("images", file);
    });

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: editId, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      alert("Xəta baş verdi");
    }
  };

  // Loading and error states
  if (loadingCards || loadingHeads || loadingSubs) return <p>Loading...</p>;
  if (errorCards) return <p>Failed to load cards: {cardsError.message}</p>;
  if (errorHeads) return <p>Failed to load heads: {headsError.message}</p>;
  if (errorSubs) return <p>Failed to load subs: {subsError.message}</p>;

  return (
    <div className="p-8 mx-auto">
      {modalOpen && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    onClick={resetForm}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            {isEditing ? "Məqaləni Redaktə Et" : "Yeni Məqalə"}
          </h2>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Mövcud məqalə məlumatlarını yeniləyin" : "Sistemə yeni məqalə əlavə edin"}
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

      <form onSubmit={handleSubmit} className="space-y-8" ref={formRef}>
        {/* Category Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Head Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Baş Kateqoriya
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.headCategory}
                onChange={(e) => handleInputChange("headCategory", e.target.value)}
                required
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
              >
                <option value="">Baş kateqoriya seçin</option>
                {headCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Sub Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
              Alt Kateqoriya
            </label>
            <div className="relative">
              <select
                value={formData.subCategory}
                onChange={(e) => handleInputChange("subCategory", e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none"
              >
                <option value="">Alt kateqoriya seçin</option>
                {filteredSubCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Article Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Header Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Başlıq
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Məqalə başlığını daxil edin..."
                value={formData.header}
                onChange={(e) => handleInputChange("header", e.target.value)}
                required
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Təsvir
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Qısa təsvir yazın..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Rich Text Content */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Ətraflı Məzmun
          </label>
          <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white transition-all duration-200">
            <RichTextEditor
              value={formData.content}
              onChange={(val) => handleInputChange("content", val)}
            />
          </div>
        </div>

        {/* Main Icon Upload */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            Əsas İkon
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-all duration-200 bg-gradient-to-br from-amber-50 to-yellow-50">
            <input
              type="file"
              accept="image/*"
              id="main-icon-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleInputChange("mainImageFile", file);
                  handleInputChange("mainImagePreview", URL.createObjectURL(file));
                }
              }}
            />
            <label htmlFor="main-icon-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-amber-200 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-700 font-medium">Əsas ikon yükləyin</span>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG formatları • Tək fayl</p>
                </div>
              </div>
            </label>
          </div>

          {formData.mainImagePreview && (
            <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="relative">
                <img
                  src={formData.mainImagePreview}
                  alt="əsas ikon önizləmə"
                  className="w-16 h-16 object-contain rounded-lg border-2 border-white shadow-sm"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md transition-colors duration-200"
                  onClick={() => {
                    handleInputChange("mainImageFile", null);
                    handleInputChange("mainImagePreview", null);
                  }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Əsas ikon hazırdır</span>
                <p className="text-xs text-gray-500">Dəyişmək üçün yeni fayl seçin</p>
              </div>
            </div>
          )}
        </div>

        {/* Multiple Images Upload */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            Məqalə Şəkilləri
          </label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-rose-400 transition-all duration-200 bg-gradient-to-br from-rose-50 to-pink-50">
            <input
              type="file"
              accept="image/*"
              multiple
              id="article-images"
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setFormData((prev) => ({
                  ...prev,
                  imageFiles: [...prev.imageFiles, ...files],
                  imagePreviews: [
                    ...prev.imagePreviews,
                    ...files.map((file) => ({
                      url: URL.createObjectURL(file),
                      isExisting: false,
                      file,
                    })),
                  ],
                }));
                e.target.value = "";
              }}
            />
            <label htmlFor="article-images" className="cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-rose-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-700 font-semibold text-lg">Məqalə şəkillərini yükləyin</span>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG formatları dəstəklənir • Çoxlu seçim mümkündür</p>
                </div>
              </div>
            </label>
          </div>

          {formData.imagePreviews.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Yüklənən şəkillər:</span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                    {formData.imagePreviews.length} şəkil
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    imagePreviews: [], 
                    imageFiles: [],
                    existingImages: []
                  }))}
                  className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
                >
                  Hamısını sil
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.imagePreviews.map(({ url, isExisting, file }, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-200">
                      <img
                        src={url}
                        alt={`Məqalə şəkli ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transform -translate-y-1 translate-x-1 transition-all duration-200"
                        onClick={() => {
                          const updatedPreviews = [...formData.imagePreviews];
                          const removed = updatedPreviews.splice(index, 1)[0];

                          let updatedFiles = [...formData.imageFiles];
                          let updatedExisting = [...formData.existingImages];

                          if (removed.isExisting) {
                            const filename = removed.url.split("/").pop();
                            updatedExisting = updatedExisting.filter(
                              (name) => name !== filename
                            );
                          } else {
                            updatedFiles = updatedFiles.filter((f) => f !== removed.file);
                          }

                          setFormData((prev) => ({
                            ...prev,
                            imagePreviews: updatedPreviews,
                            imageFiles: updatedFiles,
                            existingImages: updatedExisting,
                          }));
                        }}
                        title="Şəkli sil"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="px-2 py-1 bg-black/70 text-white rounded-md text-xs font-medium">
                        #{index + 1}
                      </span>
                      {isExisting && (
                        <span className="px-2 py-1 bg-blue-500/80 text-white rounded-md text-xs font-medium ml-1">
                          Mövcud
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button 
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isEditing ? "Yenilə" : "Yadda Saxla"}
            </span>
          </button>
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
                Servis Kartları
                <div
                  className={clsx(styles.cardsearch, "flex items-center gap-2")}
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-b border-gray-400 px-0 w-full text-sm outline-none"
                    placeholder="Axtar..."
                  />
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                </div>
                <button
                  className={clsx(styles.cardopen)}
                  onClick={() => {
                    resetForm();
                    setModalOpen(true);
                  }}
                >
                  <Open />
                </button>
              </td>
            </tr>

            {cards
              .filter((c) =>
                c.header?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((card) => (
                <tr key={card.id}>
                  <td>
                    {card.header}{" "}
                    <span className="text-xs text-gray-500">
                      ({card.headCategory || "No Head Category"})
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(card)}>
                      <Edit />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Silinsin?")) {
                          deleteMutation.mutate(card.id);
                        }
                      }}
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

export default AdminServiceCard;
