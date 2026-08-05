import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { PassportState } from './types';

const STORAGE_KEY = 'one-ticket-passport-v01';
const initialState: PassportState = {
  personaId: null,
  savedTickets: [],
  viewedTickets: [],
  metPeople: [],
  visitedVenues: [],
  stamps: [],
};

interface PassportContextValue {
  state: PassportState;
  setPersona: (id: string) => void;
  toggleTicket: (nid: string) => void;
  viewTicket: (nid: string) => void;
  meetPerson: (id: string) => void;
  visitVenue: (id: string) => void;
}

const PassportContext = createContext<PassportContextValue | null>(null);

const addUnique = (items: string[], value: string) => items.includes(value) ? items : [...items, value];

export function PassportProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PassportState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state]);

  const value = useMemo<PassportContextValue>(() => ({
    state,
    setPersona: (personaId) => setState((current) => ({ ...current, personaId, stamps: addUnique(current.stamps, '漫游者印章') })),
    toggleTicket: (nid) => setState((current) => ({
      ...current,
      savedTickets: current.savedTickets.includes(nid) ? current.savedTickets.filter((id) => id !== nid) : [...current.savedTickets, nid],
      stamps: addUnique(current.stamps, '戏票印章'),
    })),
    viewTicket: (nid) => setState((current) => ({ ...current, viewedTickets: addUnique(current.viewedTickets, nid) })),
    meetPerson: (id) => setState((current) => ({ ...current, metPeople: addUnique(current.metPeople, id), stamps: addUnique(current.stamps, '人物印章') })),
    visitVenue: (id) => setState((current) => ({ ...current, visitedVenues: addUnique(current.visitedVenues, id), stamps: addUnique(current.stamps, '剧院印章') })),
  }), [state]);

  return <PassportContext.Provider value={value}>{children}</PassportContext.Provider>;
}

export function usePassport() {
  const context = useContext(PassportContext);
  if (!context) throw new Error('usePassport must be used inside PassportProvider');
  return context;
}
