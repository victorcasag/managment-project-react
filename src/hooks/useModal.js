import { useState } from 'react';

export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState(null);

  const open = (modalData = null) => {
    setIsOpen(true);
    setData(modalData);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  };
};