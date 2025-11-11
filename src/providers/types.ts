export interface MoldeUIConfig {
  useDaisyUITheme?: boolean;
}

export interface MoldeUIProviderProps {
  config?: MoldeUIConfig;
  children: React.ReactNode;
}

