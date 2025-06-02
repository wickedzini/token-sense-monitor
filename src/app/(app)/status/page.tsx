'use client';

import SimpleHeader from "@/components/layout/SimpleHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatusPage = () => {
  const services = [
    {
      name: "API",
      status: "operational",
      uptime: "99.98%",
      lastIncident: "None in last 30 days"
    },
    {
      name: "Dashboard",
      status: "operational",
      uptime: "100%",
      lastIncident: "None in last 30 days"
    },
    {
      name: "Data Collection",
      status: "operational",
      uptime: "99.95%",
      lastIncident: "May 12, 2025"
    },
    {
      name: "Notifications",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None in last 30 days"
    }
  ];

  const incidents = [
    {
      date: "May 12, 2025",
      title: "Data Collection Delay",
      description: "We experienced a 25-minute delay in data collection processing. All data has been fully recovered.",
      status: "resolved"
    }
  ];

  return (
    <div>
      <SimpleHeader title="System Status" />
      <div className="container py-12 px-4 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-4">TokenMeter System Status</h1>
          <div className="flex items-center gap-2 mb-6">
            <Badge className="bg-green-100 text-green-800 border-0 py-1 px-3">All Systems Operational</Badge>
            <span className="text-gray-500">Updated: May 19, 2025, 10:15 AM</span>
          </div>
          <p className="text-gray-600">
            This page provides real-time information about our service availability and performance.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Service</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Uptime (30 days)</th>
                      <th className="text-left py-3 px-4">Last Incident</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.name} className="border-b">
                        <td className="py-4 px-4 font-medium">{service.name}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="capitalize">{service.status}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">{service.uptime}</td>
                        <td className="py-4 px-4 text-gray-600">{service.lastIncident}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              {incidents.length > 0 ? (
                <div className="space-y-6">
                  {incidents.map((incident, index) => (
                    <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-medium">{incident.date}</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {incident.status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-medium mb-1">{incident.title}</h3>
                      <p className="text-gray-600">{incident.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No incidents reported in the last 30 days.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Subscribe to Status Updates</h2>
          <p className="text-gray-600 mb-6">
            Get notified about service disruptions and maintenance windows.
          </p>
          <div className="flex justify-center">
            <Button variant="outline">Subscribe to Updates</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;

function Button({children, variant, className}: {children: React.ReactNode, variant?: string, className?: string}) {
  return (
    <button className={`px-4 py-2 rounded font-medium ${variant === 'outline' ? 'border border-gray-300' : 'bg-brand-primary text-white'} ${className}`}>
      {children}
    </button>
  )
}
