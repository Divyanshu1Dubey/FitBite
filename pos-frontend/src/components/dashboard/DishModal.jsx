import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDish, getCategories } from "../../https";
import { enqueueSnackbar } from "notistack";

const DishModal = ({ setIsDishModalOpen }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoryId: "",
  });

  // Fetch categories for the dropdown
  const { data: catRes, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  const categories = catRes?.data?.data || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.categoryId) {
      enqueueSnackbar("Please select a category", { variant: "warning" });
      return;
    }

    const selectedCat = categories.find(c => c.id === parseInt(formData.categoryId));
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      categoryId: parseInt(formData.categoryId),
      category: selectedCat ? selectedCat.name : "General"
    };

    dishMutation.mutate(payload);
  };

  const dishMutation = useMutation({
    mutationFn: (reqData) => addDish(reqData),
    onSuccess: (res) => {
      setIsDishModalOpen(false);
      enqueueSnackbar(res.data.message || "Dish Added!", { variant: "success" });
      queryClient.invalidateQueries(["categories"]); // Invalidating categories will re-fetch dishes as well
    },
    onError: (error) => {
      const msg = error.response?.data?.message || "Failed to add dish";
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
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Dish</h2>
          <button onClick={() => setIsDishModalOpen(false)} className="text-[#f5f5f5] hover:text-red-500">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Category</label>
            <div className="flex items-center rounded-lg px-4 bg-[#1f1f1f]">
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none py-3"
                required
              >
                <option value="" disabled className="text-gray-500">Select Category</option>
                {isLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-[#1f1f1f] text-white">
                      {cat.icon} {cat.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Dish Name</label>
            <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
                placeholder="e.g. Garlic Bread"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Price (₹)</label>
            <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
                min="0"
                step="0.01"
                placeholder="e.g. 0"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={dishMutation.isPending}
            className="w-full rounded-lg mt-8 py-3 text-lg bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 disabled:opacity-50"
          >
            {dishMutation.isPending ? "Adding..." : "Add Dish"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DishModal;
