import Header from "@/components/Header";
import DeviceCard from "@/components/DeviceCard";
import { devices } from "@/data/devices";
import { Layers } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className="mb-8 flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers className="w-5 h-5 text-primary" />
            <span className="text-sm">
              <span className="font-semibold text-foreground">{devices.length}</span> Registered Devices
            </span>
          </div>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>Add more devices to the system by updating the devices configuration.</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
