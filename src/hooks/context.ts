import { CanvasEventEmitter } from '@/utils/event/notifier';
import { createContext, useContext } from 'react';

export const FabricContext = createContext(null);
export const EventContext = createContext(null);
export const CanvasEditorContext = createContext<CanvasEventEmitter | undefined>(undefined);

export const useFabric = () => useContext(FabricContext);
export const useEvent = () => useContext(EventContext);
export const useCanvasEditor = () => useContext(CanvasEditorContext);