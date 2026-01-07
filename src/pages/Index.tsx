import Header from "@/components/Header";
import DeviceCard from "@/components/DeviceCard";
import { useDevices } from "@/hooks/useDevices";
import { Layers, Loader2 } from "lucide-react";

const Index = () => {
  const { data: devices, isLoading, error } = useDevices();

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className="mb-8 flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Layers className="w-5 h-5 text-primary" />
            <span className="text-sm">
              <span className="font-semibold text-foreground">
                {devices?.length ?? 0}
              </span>{" "}
              Registered Devices
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-destructive">
            Failed to load devices. Please try again.
          </div>
        )}

        {/* Devices Grid */}
        {devices && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {devices?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No devices registered yet. Click "Add Device" to get started.
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
