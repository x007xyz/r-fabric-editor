import { SelectEvent, SelectMode, SelectOneType } from '@/utils/event/types';

interface Selector {
  mSelectMode: SelectMode;
  mSelectOneType: SelectOneType;
  mSelectId: string[] | '';
  mSelectIds: string[];
  mSelectActive: unknown[];
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useEvent } from './context';

// Create a context for SelectState
const SelectContext = createContext<Selector | null>(null);

// Custom hook to access SelectState
const useSelect = () => useContext(SelectContext);

// SelectProvider component to wrap the components that need access to SelectState
const SelectProvider = ({ children }) => {
  const [selectMode, setSelectMode] = useState(SelectMode.EMPTY);
  const [selectOneType, setSelectOneType] = useState(SelectOneType.EMPTY);
  const [selectId, setSelectId] = useState('');
  const [selectIds, setSelectIds] = useState([]);

  const event = useEvent();
  console.log("🚀 ~ file: select.tsx:28 ~ SelectProvider ~ event:", event)

  useEffect(() => {
    if (!event) return;
    event?.on(SelectEvent.ONE, selectOne);
    event?.on(SelectEvent.MULTI, selectMulti);
    event?.on(SelectEvent.CANCEL, selectCancel);
  
    return () => {
      event.off(SelectEvent.ONE, selectOne);
      event.off(SelectEvent.MULTI, selectMulti);
      event.off(SelectEvent.CANCEL, selectCancel);
    };
  }, [event]);

  const selectOne = item => {
    console.log("🚀 ~ file: select.tsx:42 ~ selectOne ~ item:", item)
    setSelectMode(SelectMode.ONE);
    setSelectId(item.id);
    setSelectOneType(item.type);
    setSelectIds([item.id]);
  };

  const selectMulti = items => {
    console.log("🚀 ~ file: select.tsx:52 ~ selectMulti ~ items:", items)
    setSelectMode(SelectMode.MULTI);
    setSelectId('');
    setSelectIds(items.map(item => item.id));
  };

  const selectCancel = () => {
    setSelectMode(SelectMode.EMPTY);
    setSelectOneType(SelectOneType.EMPTY);
    setSelectId('');
    setSelectIds([]);
  };

  return (
    <SelectContext.Provider
      value={{
        selectMode,
        selectOneType,
        selectId,
        selectIds,
        selectOne,
        selectMulti,
        selectCancel
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export { SelectProvider, useSelect };