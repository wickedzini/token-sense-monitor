'use client';

import SpendOverview from "@/components/dashboard/SpendOverview";
import SpendRingChart from "@/components/dashboard/SpendRingChart";
import SpendTrend from "@/components/dashboard/SpendTrend";
import TopModels from "@/components/dashboard/TopModels";
import SavingsSuggestions from "@/components/dashboard/SavingsSuggestions";

// Importy dla Date Range Pickera
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"; // Do formatowania wyświetlanej daty
import { useDateRange } from '@/contexts/DateRangeContext'; // Importujemy hooka
import { DateRange } from 'react-day-picker'; // Import typu DateRange

const Dashboard = () => {
  const { dateRange, setDateRange, selectedPreset, setPreset } = useDateRange(); // Używamy hooka

  // Custom date display for the header
  const dateRangeText = (dateRange?.from && dateRange?.to)
    ? selectedPreset === "custom"
      ? `${format(dateRange.from, "d MMM")} – ${format(dateRange.to, "d MMM yyyy")}`
      : selectedPreset === "7d"
        ? "Last 7 days"
        : selectedPreset === "30d"
          ? "Last 30 days"
          : "Month to date"
    : "Select a date range"; // Tekst gdy zakres nie jest wybrany

  return (
    <div className="space-y-6"> {/* Removed p-6 padding */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-display font-bold text-gray-900">Analytics Overview</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Data range:</span>
            {/* Wyświetlanie aktualnego zakresu dat */}
            <span className="font-medium">{dateRangeText}</span>
             {/* Można dodać "Last updated" tutaj lub gdzie indziej, jeśli potrzebne */}
             {/* <span className="text-gray-500">Last updated:</span>
             <span className="font-medium">May 19, 2025, 10:15 AM</span> */}
          </div>

          {/* UI Date Range Pickera */}
          <div className="flex">
            <Button
              variant={selectedPreset === "7d" ? "default" : "outline"}
              size="sm"
              className="h-8 rounded-r-none"
              onClick={() => setPreset("7d")}
            >
              7d
            </Button>
            <Button
              variant={selectedPreset === "30d" ? "default" : "outline"}
              size="sm"
              className="h-8 rounded-none border-x-0"
              onClick={() => setPreset("30d")}
            >
              30d
            </Button>
            <Button
              variant={selectedPreset === "mtd" ? "default" : "outline"}
              size="sm"
              className="h-8 rounded-l-none"
              onClick={() => setPreset("mtd")}
            >
              MTD
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={selectedPreset === "custom" ? "default" : "outline"}
                size="sm"
                className="h-8 flex gap-1"
                onClick={() => setPreset("custom")} // Kliknięcie otwiera picker i ustawia preset na custom
              >
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>Custom</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange} // Powiązane ze stanem z contextu
                onSelect={setDateRange} // Zmienia stan w contextie
                initialFocus
              />
            </PopoverContent>
          </Popover>

        </div>
      </div>

      {/* Pozostałe widżety dashboardu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpendOverview />
        <SpendTrend className="md:col-span-2" />
        <div className="md:col-span-2" /> {/* Ten div może być usunięty jeśli nie jest potrzebny do układu */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpendRingChart />
        <TopModels />
      </div>

      <SavingsSuggestions />
    </div>
  );
};

export default Dashboard;
