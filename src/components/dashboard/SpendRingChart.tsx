'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { useDateRange } from '@/contexts/DateRangeContext'; // Import hooka
import { DateRange } from 'react-day-picker'; // Import typu DateRange
import { differenceInDays } from 'date-fns'; // Potrzebne do skalowania danych

interface SpendRingChartProps {
  className?: string;
}

interface RingChartDataEntry { // Definicja typu dla wpisu danych
    name: string;
    value: number;
    percentage: number;
}

interface RingChartData { // Definicja typu dla struktury zwracanej przez generateRingChartData
    data: RingChartDataEntry[];
    totalSpend: number;
}


// Symulowana funkcja generująca dane zależne od zakresu dat
const generateRingChartData = (dateRange: DateRange): RingChartData => { // Dodano typ zwracany
   if (!dateRange?.from || !dateRange?.to) {
       return { data: [], totalSpend: 0 };
   }

  const timeSpanInDays = differenceInDays(dateRange.to, dateRange.from) + 1;
  const factor = timeSpanInDays / 30; // Skalowanie względem 30 dni

  const data = [
    { name: "GPT-4", value: Math.round(1500 * factor * (0.8 + Math.random() * 0.4)) },
    { name: "GPT-3.5 Turbo", value: Math.round(900 * factor * (0.8 + Math.random() * 0.4)) },
    { name: "Claude 3 Opus", value: Math.round(650 * factor * (0.8 + Math.random() * 0.4)) },
    { name: "Claude 3 Haiku", value: Math.round(320 * factor * (0.8 + Math.random() * 0.4)) },
    { name: "PaLM 2", value: Math.round(210 * factor * (0.8 + Math.random() * 0.4)) },
    { name: "Other", value: Math.round(100 * factor * (0.8 + Math.random() * 0.4)) },
  ];

  // Oblicz łączny wydatek
  const totalSpend = data.reduce((sum, entry) => sum + entry.value, 0);

  // Dodaj procenty do danych
  const dataWithPercentages = data.map(entry => ({
      ...entry,
      percentage: totalSpend === 0 ? 0 : (entry.value / totalSpend) * 100 // Dodano obsługę dzielenia przez zero
  }));

   // Zaokrąglij procenty i dostosuj ostatni, aby suma wynosiła 100%
  const totalRoundedPercentage = dataWithPercentages.reduce((sum, entry) => sum + Math.round(entry.percentage), 0);
  const roundedData = dataWithPercentages.map((entry, index) => {
      const roundedPercent = Math.round(entry.percentage);
       if (index === dataWithPercentages.length - 1 && totalRoundedPercentage !== 100 && dataWithPercentages.length > 0) {
           const diff = 100 - totalRoundedPercentage;
           return { ...entry, percentage: roundedPercent + diff };
       }
      return { ...entry, percentage: roundedPercent };
  }).filter(entry => entry.percentage > 0); // Usuń segmenty z 0%

  return { data: roundedData, totalSpend };
};


const COLORS = ["#6A4CFF", "#9A7BFF", "#C4B5FF", "#E0AAFF", "#ED9BFF", "#FF6A8A"]; // Kolory dla segmentów

const SpendRingChart = ({ className }: SpendRingChartProps) => {
  const { dateRange } = useDateRange(); // Pobieramy zakres dat z contextu
   // Używamy useState z funkcją inicjalizującą i określamy typ stanu
  const [chartData, setChartData] = useState<RingChartData>(() => generateRingChartData(dateRange));

  // Efekt do aktualizacji danych, gdy zakres dat z contextu się zmieni
  useEffect(() => {
    setChartData(generateRingChartData(dateRange));
  }, [dateRange]); // Zależność od dateRange z contextu


  // Formatowanie wartości dla Tooltipa (nazwa i kwota)
  const tooltipFormatter = (value: number, name: string) => [`$${value.toFixed(2)}`, name];
   // Formatowanie dla Legenda (nazwa i procent)
   const legendFormatter = (value: string) => { // Typ parametru jest string
      const dataEntry = chartData.data.find((d: RingChartDataEntry) => d.name === value); // Określono typ parametru d
      return `${value} ${dataEntry ? `${Math.round(dataEntry.percentage)}%` : ''}`;
   };


  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">Spend Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.data} // Używamy danych z lokalnego stanu
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                cornerRadius={8} // Dodano props cornerRadius dla zaokrąglonych rogów
              >
                {chartData.data.map((entry: RingChartDataEntry, index: number) => ( // Określono typy
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={tooltipFormatter} /> {/* Używamy zdefiniowanego formattera */}
               <Legend
                    formatter={legendFormatter} // Używamy zdefiniowanego formattera
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: '20px' }}
                />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Dodano warunek sprawdzający, czy totalSpend jest większy od 0 przed wyświetleniem */}
        {chartData.totalSpend > 0 && (
            <div className="text-center text-sm text-gray-600 mt-4">
              Total spend: ${chartData.totalSpend} {/* Wyświetlamy łączny wydatek */}
            </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendRingChart;
