'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  BarChart2Icon, 
  BellIcon, 
  Settings2Icon, 
  HelpCircleIcon,
  LineChartIcon
} from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: HomeIcon, label: "Dashboard" },
  { path: "/models", icon: BarChart2Icon, label: "Models" },
  { path: "/analytics", icon: LineChartIcon, label: "Analytics" },
  { path: "/alerts", icon: BellIcon, label: "Alerts" },
  { path: "/settings", icon: Settings2Icon, label: "Settings" },
  { path: "/help", icon: HelpCircleIcon, label: "Help & FAQ" },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  pathname === item.path
                    ? "bg-brand-primary bg-opacity-10 text-brand-primary font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-bold">U</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Demo User</span>
            <span className="text-xs text-gray-500">Free Trial (25 days)</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
