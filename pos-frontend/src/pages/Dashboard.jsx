import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";
import CategoryModal from "../components/dashboard/CategoryModal";
import DishModal from "../components/dashboard/DishModal";
import ManageMenu from "../components/dashboard/ManageMenu";
import { enqueueSnackbar } from "notistack";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Menu", "Payments"];

const Dashboard = () => {

  useEffect(() => {
    document.title = "FitBite POS | Admin Dashboard"
  }, [])

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") {
      setIsTableModalOpen(true);
    } else if (action === "category") {
      setIsCategoryModalOpen(true);
    } else if (action === "dishes") {
      setIsDishModalOpen(true);
    }
  };

  return (
    <div className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto flex flex-col lg:flex-row lg:items-center justify-between py-10 px-6 md:px-4 gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {buttons.map(({ label, icon, action }) => {
            return (
              <button
                key={label}
                onClick={() => handleOpenModal(action)}
                className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2"
              >
                {label} {icon}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {tabs.map((tab) => {
            return (
              <button
                key={tab}
                className={`
                px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${
                  activeTab === tab
                    ? "bg-[#262626]"
                    : "bg-[#1a1a1a] hover:bg-[#262626]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "Metrics" && <Metrics />}
      {activeTab === "Orders" && <RecentOrders />}
      {activeTab === "Menu" && <ManageMenu />}
      {activeTab === "Payments" && 
        <div className="text-white p-6 container mx-auto">
          Payment Component Coming Soon
        </div>
      }

      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
      {isCategoryModalOpen && <CategoryModal setIsCategoryModalOpen={setIsCategoryModalOpen} />}
      {isDishModalOpen && <DishModal setIsDishModalOpen={setIsDishModalOpen} />}
    </div>
  );
};

export default Dashboard;
