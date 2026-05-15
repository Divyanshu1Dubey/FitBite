import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../https";
import { enqueueSnackbar } from "notistack";

const CategoryModal = ({ setIsCategoryModalOpen }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    bgColor: "#2b3324",
    icon: "🥤",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    categoryMutation.mutate(formData);
  };

  const categoryMutation = useMutation({
    mutationFn: (reqData) => addCategory(reqData),
    onSuccess: (res) => {
      setIsCategoryModalOpen(false);
      enqueueSnackbar(res.data.message || "Category Added!", { variant: "success" });
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Failed to add category";
      enqueueSnackbar(msg, { variant: "error" });
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Category</h2>
          <button onClick={() => setIsCategoryModalOpen(false)} className="text-[#f5f5f5] hover:text-red-500">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Category Name</label>
            <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
                placeholder="e.g. Desserts"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Icon (Emoji)</label>
            <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Background Color (Hex)</label>
            <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f] gap-3">
              <input
                type="color"
                name="bgColor"
                value={formData.bgColor}
                onChange={handleInputChange}
                className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
              />
              <input
                type="text"
                name="bgColor"
                value={formData.bgColor}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={categoryMutation.isPending}
            className="w-full rounded-lg mt-8 py-3 text-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 disabled:opacity-50"
          >
            {categoryMutation.isPending ? "Adding..." : "Add Category"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CategoryModal;
