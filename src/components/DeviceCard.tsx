import { Device } from "@/data/devices";
import { Monitor, Cpu } from "lucide-react";

interface DeviceCardProps {
  device: Device;
}

const DeviceCard = ({ device }: DeviceCardProps) => {
  return (
    <div className="device-card">
      {/* Device Image */}
      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center p-6">
        <img
          src={device.image}
          alt={device.name}
          className="max-h-full max-w-full object-contain drop-shadow-2xl"
        />
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
            <table className="w-full text-sm">
              <tbody>
                {device.softwareVersions.map((software, index) => (
                  <tr
                    key={software.name}
                    className={`${
                      index % 2 === 0 ? "bg-transparent" : "bg-secondary/50"
                    } hover:bg-primary/5 transition-colors`}
                  >
                    <td className="py-2.5 px-4 text-card-foreground font-medium">
                      {software.name}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="font-mono text-primary font-medium">
                        {software.version}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
