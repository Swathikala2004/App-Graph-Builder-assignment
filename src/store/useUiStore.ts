import { create } from 'zustand';

type InspectorTab = 'config' | 'runtime';

interface UiState {
  selectedAppId: string;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: InspectorTab;
  mockErrorEnabled: boolean;
  setSelectedAppId: (appId: string) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setMobilePanelOpen: (isOpen: boolean) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  setMockErrorEnabled: (enabled: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedAppId: 'supertokens-golang',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  mockErrorEnabled: false,
  setSelectedAppId: (selectedAppId) => set({ selectedAppId, selectedNodeId: null }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId, isMobilePanelOpen: selectedNodeId ? true : false }),
  setMobilePanelOpen: (isMobilePanelOpen) => set({ isMobilePanelOpen }),
  setActiveInspectorTab: (activeInspectorTab) => set({ activeInspectorTab }),
  setMockErrorEnabled: (mockErrorEnabled) => set({ mockErrorEnabled }),
}));