import { createContext, useContext } from 'react';
import type { MoldeUIConfig, MoldeUIProviderProps } from './types';

const MoldeUIContext = createContext<MoldeUIConfig | undefined>(undefined);

export const MoldeUIProvider = ({ config, children }: MoldeUIProviderProps) => {
  return <MoldeUIContext.Provider value={config}>{children}</MoldeUIContext.Provider>;
};

export const useMoldeUIConfig = (): MoldeUIConfig => {
  const context = useContext(MoldeUIContext);
  return context || {};
};

