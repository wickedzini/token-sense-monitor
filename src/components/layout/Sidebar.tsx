
import { NavLink } from "react-router-dom";
import { 
  HomeIcon, 
  BarChart2Icon, 
  BellIcon, 
  Settings2Icon, 
  HelpCircleIcon 
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { path: "/", icon: HomeIcon, label: "Dashboard" },
    { path: "/models", icon: BarChart2Icon, label: "Models" },
    { path: "/alerts", icon: BellIcon, label: "Alerts" },
    { path: "/settings", icon: Settings2Icon, label: "Settings" },
    { path: "/help", icon: HelpCircleIcon, label: "Help & FAQ" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-gray-900">TokenMeter.AI</span>
            <span className="text-xs text-gray-500">Know your prompt costs</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-brand-primary bg-opacity-10 text-brand-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
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
