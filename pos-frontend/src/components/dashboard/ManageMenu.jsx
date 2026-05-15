import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategories, updateDish, deleteDish } from "../../https";
import { enqueueSnackbar } from "notistack";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const ManageMenu = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const { data: catRes, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const categories = catRes?.data?.data || [];

  const updateMutation = useMutation({
    mutationFn: (data) => updateDish(data),
    onSuccess: () => {
      enqueueSnackbar("Dish updated!", { variant: "success" });
      queryClient.invalidateQueries(["categories"]);
      setEditingId(null);
    },
    onError: () => {
      enqueueSnackbar("Failed to update dish", { variant: "error" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteDish(id),
    onSuccess: () => {
      enqueueSnackbar("Dish deleted!", { variant: "success" });
      queryClient.invalidateQueries(["categories"]);
    },
    onError: () => {
      enqueueSnackbar("Failed to delete dish", { variant: "error" });
    },
  });

  const startEdit = (dish) => {
    setEditingId(dish.id);
    setEditName(dish.name);
    setEditPrice(dish.price.toString());
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditPrice("");
  };

  const saveEdit = (dishId) => {
    updateMutation.mutate({
      dishId,
      name: editName,
      price: parseFloat(editPrice) || 0,
    });
  };

  const handleDelete = (dishId, dishName) => {
    if (window.confirm(`Delete "${dishName}"?`)) {
      deleteMutation.mutate(dishId);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto text-white p-6">Loading menu...</div>;
  }

  return (
    <div className="container mx-auto px-6 md:px-4 pb-8">
      {categories.map((cat) => (
        <div key={cat.id} className="mb-6">
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-t-lg"
            style={{ backgroundColor: cat.bgColor }}
          >
            <span className="text-xl">{cat.icon}</span>
            <h3 className="text-[#f5f5f5] text-lg font-bold">{cat.name}</h3>
            <span className="text-[#ababab] text-sm ml-2">
              ({cat.items?.length || 0} items)
            </span>
          </div>

          <div className="bg-[#262626] rounded-b-lg overflow-hidden">
            <table className="w-full text-left text-[#f5f5f5]">
              <thead className="bg-[#333] text-[#ababab] text-sm">
                <tr>
                  <th className="p-3 w-12">#</th>
                  <th className="p-3">Dish Name</th>
                  <th className="p-3 w-32">Price (₹)</th>
                  <th className="p-3 w-28 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cat.items?.map((dish, idx) => (
                  <tr
                    key={dish.id}
                    className="border-b border-[#333] hover:bg-[#2a2a2a]"
                  >
                    <td className="p-3 text-[#ababab]">{idx + 1}</td>
                    <td className="p-3">
                      {editingId === dish.id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="bg-[#1f1f1f] text-white px-3 py-1.5 rounded-lg w-full focus:outline-none border border-[#555]"
                        />
                      ) : (
                        dish.name
                      )}
                    </td>
                    <td className="p-3">
                      {editingId === dish.id ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="bg-[#1f1f1f] text-white px-3 py-1.5 rounded-lg w-full focus:outline-none border border-[#555]"
                          min="0"
                          step="1"
                        />
                      ) : (
                        <span className="text-[#f6b100] font-semibold">
                          ₹{dish.price}
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        {editingId === dish.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(dish.id)}
                              className="bg-green-800 text-green-400 p-2 rounded-lg hover:bg-green-700"
                              disabled={updateMutation.isPending}
                            >
                              <FaSave size={14} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-[#333] text-[#ababab] p-2 rounded-lg hover:bg-[#444]"
                            >
                              <FaTimes size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(dish)}
                              className="bg-[#333] text-yellow-400 p-2 rounded-lg hover:bg-[#444]"
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(dish.id, dish.name)}
                              className="bg-[#333] text-red-400 p-2 rounded-lg hover:bg-[#444]"
                            >
                              <FaTrash size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageMenu;
