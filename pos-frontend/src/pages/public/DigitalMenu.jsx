import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../https";
import PublicNavbar from "../../components/shared/PublicNavbar";
import PublicFooter from "../../components/shared/PublicFooter";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";

const DigitalMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();

  const { data: catRes, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const categories = catRes?.data?.data || [];

  const handleAddToCart = (item) => {
    const { name, price } = item;
    const newObj = {
      id: Date.now(),
      name,
      pricePerQuantity: price,
      quantity: 1,
      price: price * 1,
    };

    dispatch(addItems(newObj));
    enqueueSnackbar(`${name} added to cart!`, { variant: 'success' });
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-body flex flex-col pt-[88px]">
      <PublicNavbar />

      {/*  Header / Hero  */}
      <header className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24 text-center md:text-left w-full">
        <h1 className="font-headline-lg-mobile md:font-display-xl uppercase text-primary mb-4">
          Fuel Your <span className="text-primary-container italic">Hustle</span>
        </h1>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto md:mx-0">
          High-performance fuel for the daily grind. Grab and go, or sit and crush it.
        </p>
      </header>

      {/*  Menu Categories Navigation  */}
      <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mb-12 overflow-x-auto sticky top-[88px] z-40 bg-background/90 backdrop-blur-md py-4 w-full scrollbar-hide">
        <div className="flex space-x-4 min-w-max">
          <button 
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-2 font-label-md text-sm uppercase font-black rounded-none transition-all ${selectedCategory === "All" ? "bg-primary-container text-black border-2 border-primary-container" : "bg-transparent border-2 border-outline-variant text-on-surface hover:border-primary-container"}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-6 py-2 font-label-md text-sm uppercase font-bold transition-all rounded-none ${selectedCategory === cat.name ? "bg-primary-container text-black border-2 border-primary-container" : "bg-transparent border-2 border-outline-variant text-on-surface hover:border-primary-container"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/*  Main Content Area  */}
      <main className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-24 grid grid-cols-1 gap-16 w-full flex-grow">
        
        {isLoading && (
          <div className="text-center text-primary-container py-10 font-display-xl text-3xl animate-pulse">Loading Menu...</div>
        )}

        {categories
          .filter(cat => selectedCategory === "All" || cat.name === selectedCategory)
          .map((cat) => (
          <section key={cat.id}>
            <div className="flex items-center space-x-4 mb-8">
              <h2 className="font-headline-md text-2xl uppercase text-primary-container">{cat.name}</h2>
              <div className="flex-grow h-px bg-surface-container-highest"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cat.items?.map((item) => (
                <div key={item.id} className="bg-surface-container-low border border-outline-variant hover:border-primary-container transition-all group flex flex-col rounded-none relative">
                  <div className="h-40 bg-surface-container-high relative overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img src={`/images/menu/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-6xl text-surface-variant opacity-50">fastfood</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline-md text-xl text-primary uppercase">{item.name}</h3>
                      <span className="font-price-tag text-lg font-bold text-primary-container">₹{item.price}</span>
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant mb-4 flex-grow">
                      Freshly prepared {item.name.toLowerCase()} for your fuel.
                    </p>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-surface-container-high border border-outline-variant text-primary font-label-md text-sm uppercase font-bold py-3 hover:bg-primary-container hover:text-black hover:border-transparent transition-colors rounded-none mt-auto"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

      </main>

      <PublicFooter />
    </div>
  );
};

export default DigitalMenu;
