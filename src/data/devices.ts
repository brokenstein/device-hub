import giadaDn74 from "@/assets/giada-dn74.png";
import shield from "@/assets/shield.png";

export interface SoftwareVersion {
  name: string;
  version: string;
}

export interface Device {
  id: string;
  name: string;
  model: string;
  os: string;
  image: string;
  softwareVersions: SoftwareVersion[];
}

export const devices: Device[] = [
  {
    id: "dn74",
    name: "Giada DN74",
    model: "DN74",
    os: "Android 11 giada-jhs558",
    image: giadaDn74,
    softwareVersions: [
      { name: "Player", version: "7059" },
      { name: "EDU Command", version: "1015" },
      { name: "EDU Watcher", version: "1080" },
      { name: "EDU Updater", version: "6106" },
      { name: "Log Writer", version: "16" },
      { name: "Command Receiver", version: "9073" },
      { name: "Tv Controller", version: "49" },
      { name: "com.google.android.webview", version: "114.0.5735.131" },
    ],
  },
  {
    id: "shield",
    name: "NVIDIA Shield",
    model: "Shield TV Pro",
    os: "Android TV 11",
    image: shield,
    softwareVersions: [
      { name: "Player", version: "7102" },
      { name: "EDU Command", version: "1018" },
      { name: "EDU Watcher", version: "1082" },
      { name: "EDU Updater", version: "6110" },
      { name: "Log Writer", version: "18" },
      { name: "Command Receiver", version: "9080" },
      { name: "Tv Controller", version: "52" },
      { name: "com.google.android.webview", version: "119.0.6045.134" },
    ],
  },
];
