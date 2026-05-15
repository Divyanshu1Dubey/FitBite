import React, { useState, useMemo } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../https";

const MenuContainer = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();
  const dispatch = useDispatch();

  const { data: catRes, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  // useMemo to avoid creating a new array reference on every render
  const menus = useMemo(() => catRes?.data?.data || [], [catRes]);

  // Derive selected from menus + selectedId, auto-select first on load
  const selected = useMemo(() => {
    if (menus.length === 0) return null;
    if (selectedId !== null) {
      return menus.find((m) => m.id === selectedId) || menus[0];
    }
    return menus[0];
  }, [menus, selectedId]);

  const increment = (id) => {
    setItemId(id);
    if (itemCount >= 20) return;
    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;

    const { name, price } = item;
    const newObj = {
      id: Date.now(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: price * itemCount,
    };

    dispatch(addItems(newObj));
    setItemCount(0);
    setItemId(null);
  };

  if (isLoading) {
    return (
      <div className="text-white p-10 flex justify-center w-full">
        Loading Menu...
      </div>
    );
  }

  if (menus.length === 0) {
    return (
      <div className="text-[#ababab] p-10 flex justify-center w-full">
        No menu items yet. Add categories and dishes from the Dashboard.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-10 py-4 w-[100%]">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelectedId(menu.id);
                setItemId(null);
                setItemCount(0);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selected && selected.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>
              <p className="text-[#ababab] text-sm font-semibold">
                {menu.items?.length || 0} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-10 py-4 w-[100%]">
        {selected?.items?.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
            >
              <div className="flex items-start justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {item.name}
                </h1>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg"
                >
                  <FaShoppingCart size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-[#f5f5f5] text-xl font-bold">
                  ₹{item.price}
                </p>
                <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6 w-[50%]">
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-yellow-500 text-2xl"
                  >
                    &minus;
                  </button>
                  <span className="text-white">
                    {itemId === item.id ? itemCount : "0"}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className="text-yellow-500 text-2xl"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
