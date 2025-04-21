import React, { FC } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 w-64 h-full bg-light-accentBackground dark:bg-dark-accentBackground shadow-lg transform transition-transform duration-300 translate-x-0 flex flex-col justify-start">
        {children}
      </div>
    </>
  );
};

export default Drawer;
