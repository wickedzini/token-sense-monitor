'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';

interface DateRangeContextType {
  dateRange: DateRange;
  setDateRange: (range: DateRange | undefined) => void;
  selectedPreset: string;
  setPreset: (preset: string) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export const DateRangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const now = useMemo(() => new Date(), []);
  const [dateRange, setDateRangeState] = useState<DateRange>({
    from: subDays(now, 30),
    to: now,
  });
  const [selectedPreset, setSelectedPreset] = useState<string>("30d");

  const setDateRange = useCallback((range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setDateRangeState(range);
      // Logika ustawiania presetu na podstawie zakresu
      const is7d = isSameDay(range.from, subDays(now, 7)) && isSameDay(range.to, now);
      const is30d = isSameDay(range.from, subDays(now, 30)) && isSameDay(range.to, now);
      const isMtd = isSameDay(range.from, startOfMonth(now)) && isSameDay(range.to, now);

      if (is7d) setSelectedPreset('7d');
      else if (is30d) setSelectedPreset('30d');
      else if (isMtd) setSelectedPreset('mtd');
      else setSelectedPreset('custom');
    } else if (range === undefined) {
        setDateRangeState({}); // Można ustawić pusty obiekt lub inny stan początkowy
        setSelectedPreset('custom'); // Lub reset do domyślnego presetu
    }
  }, [now]); // Uproszczone zależności

  const setPreset = useCallback((preset: string) => {
    setSelectedPreset(preset);
    const now = new Date();
    let from: Date;
    let to: Date = now;

    switch (preset) {
      case "7d":
        from = subDays(now, 7);
        break;
      case "30d":
        from = subDays(now, 30);
        break;
      case "mtd":
        from = startOfMonth(now);
        to = endOfMonth(now);
        break;
      case "custom":
        // Zachowaj aktualny zakres customowy, jeśli istnieje, w przeciwnym razie domyślny
         from = dateRange.from || subDays(now, 30);
         to = dateRange.to || now;
        break;
      default:
        from = subDays(now, 30);
        to = now;
    }

    setDateRangeState({ from, to });
  }, [dateRange.from, dateRange.to]); // Zależność od dateRange dla presetu custom

  const value = useMemo(() => ({
    dateRange,
    setDateRange,
    selectedPreset,
    setPreset,
  }), [dateRange, setDateRange, selectedPreset, setPreset]);


  return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>;
};

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
};
