import { Server } from "lucide-react";
import AddDeviceDialog from "./AddDeviceDialog";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground glow-text">
                Device Manager
              </h1>
              <p className="text-xs text-muted-foreground">
                Software Version Tracker
              </p>
            </div>
          </div>
          <AddDeviceDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;
