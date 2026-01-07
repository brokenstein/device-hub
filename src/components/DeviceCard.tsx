import { Monitor, Cpu, Trash2 } from "lucide-react";
import { Device, useDeleteDevice } from "@/hooks/useDevices";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EditDeviceDialog from "./EditDeviceDialog";

interface DeviceCardProps {
  device: Device;
}

const DeviceCard = ({ device }: DeviceCardProps) => {
  const deleteDevice = useDeleteDevice();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${device.name}?`)) {
      try {
        await deleteDevice.mutateAsync(device.id);
        toast.success("Device deleted");
      } catch {
        toast.error("Failed to delete device");
      }
    }
  };

  return (
    <div className="device-card">
      {/* Device Image */}
      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center p-6">
        {device.image_url ? (
          <img
            src={device.image_url}
            alt={device.name}
            className="max-h-full max-w-full object-contain drop-shadow-2xl"
          />
        ) : (
          <Monitor className="w-24 h-24 text-muted-foreground/50" />
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          <EditDeviceDialog device={device} />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Device Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">
              {device.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
              <Cpu className="w-4 h-4" />
              <span>{device.model}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Monitor className="w-3.5 h-3.5" />
            <span>Active</span>
          </div>
        </div>

        {/* OS Badge */}
        <div className="mb-4">
          <span className="version-badge">{device.os}</span>
        </div>

        {/* Software Versions Table */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Software Versions
          </h3>
          <div className="bg-secondary/50 rounded-lg overflow-hidden">
            {device.software_versions.length > 0 ? (
              <table className="w-full text-sm table-fixed">
                <tbody>
                  {device.software_versions.map((software, index) => (
                    <tr
                      key={software.id}
                      className={`${
                        index % 2 === 0 ? "bg-transparent" : "bg-secondary/50"
                      } hover:bg-primary/5 transition-colors`}
                    >
                      <td className="py-2.5 px-4 text-card-foreground font-medium truncate">
                        {software.name}
                      </td>
                      <td className="py-2.5 px-4 text-right whitespace-nowrap">
                        <span className="font-mono text-primary font-medium">
                          {software.version}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-4 text-center text-muted-foreground text-sm">
                No software versions registered
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
