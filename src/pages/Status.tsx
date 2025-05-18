
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SystemStatus {
  name: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
  message?: string;
  updatedAt: string;
}

const Status = () => {
  // Mock data
  const systems: SystemStatus[] = [
    {
      name: "API Service",
      status: "operational",
      updatedAt: "May 18, 2025 10:15 AM"
    },
    {
      name: "Dashboard UI",
      status: "operational",
      updatedAt: "May 18, 2025 10:15 AM"
    },
    {
      name: "Analytics Pipeline",
      status: "operational",
      updatedAt: "May 18, 2025 10:15 AM"
    },
    {
      name: "Notification Service",
      status: "operational",
      updatedAt: "May 18, 2025 10:15 AM"
    },
    {
      name: "Billing System",
      status: "operational",
      updatedAt: "May 18, 2025 10:15 AM"
    }
  ];

  const incidents = [
    {
      title: "Analytics Pipeline Delay",
      date: "May 15, 2025",
      status: "resolved",
      updates: [
        { time: "10:15 AM", message: "Issue identified: Analytics processing delayed by approximately 30 minutes." },
        { time: "11:20 AM", message: "Our team has identified the root cause and is implementing a fix." },
        { time: "12:45 PM", message: "Fix deployed, services returning to normal operation." },
        { time: "1:30 PM", message: "All systems operational, backlog cleared." }
      ]
    }
  ];

  const getStatusBadge = (status: SystemStatus["status"]) => {
    switch (status) {
      case "operational":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Operational</Badge>;
      case "degraded":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Degraded</Badge>;
      case "outage":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Outage</Badge>;
      case "maintenance":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Maintenance</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">System Status</h1>
        <p className="text-gray-600">All systems are operational</p>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Current Status</h2>
          <div className="space-y-4">
            {systems.map((system) => (
              <div key={system.name} className="flex items-center justify-between p-3 border-b last:border-b-0">
                <div>
                  <h3 className="font-medium">{system.name}</h3>
                  {system.message && <p className="text-sm text-gray-600">{system.message}</p>}
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(system.status)}
                  <span className="text-xs text-gray-500">{system.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Recent Incidents</h2>
        {incidents.length ? (
          incidents.map((incident) => (
            <Card key={incident.title} className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{incident.title}</h3>
                    <p className="text-sm text-gray-600">{incident.date}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Resolved
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {incident.updates.map((update, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-20 flex-shrink-0 text-sm text-gray-500">
                        {update.time}
                      </div>
                      <div className="text-sm">{update.message}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No incidents reported in the last 30 days.</p>
        )}
      </div>
      
      <div className="text-center text-sm text-gray-500">
        Last updated: May 18, 2025, 10:15 AM
      </div>
    </div>
  );
};

export default Status;
