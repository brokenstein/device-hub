import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SoftwareVersion {
  id: string;
  name: string;
  version: string;
}

export interface Device {
  id: string;
  name: string;
  model: string;
  os: string;
  image_url: string | null;
  software_versions: SoftwareVersion[];
}

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const { data: devices, error: devicesError } = await supabase
        .from("devices")
        .select("*")
        .order("created_at", { ascending: true });

      if (devicesError) throw devicesError;

      const { data: versions, error: versionsError } = await supabase
        .from("software_versions")
        .select("*");

      if (versionsError) throw versionsError;

      return devices.map((device) => ({
        ...device,
        software_versions: versions.filter((v) => v.device_id === device.id),
      })) as Device[];
    },
  });
};

export const useAddDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      device,
      softwareVersions,
    }: {
      device: { name: string; model: string; os: string; image_url?: string };
      softwareVersions: { name: string; version: string }[];
    }) => {
      const { data: newDevice, error: deviceError } = await supabase
        .from("devices")
        .insert(device)
        .select()
        .single();

      if (deviceError) throw deviceError;

      if (softwareVersions.length > 0) {
        const { error: versionsError } = await supabase
          .from("software_versions")
          .insert(
            softwareVersions.map((sv) => ({
              device_id: newDevice.id,
              name: sv.name,
              version: sv.version,
            }))
          );

        if (versionsError) throw versionsError;
      }

      return newDevice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deviceId: string) => {
      const { error } = await supabase
        .from("devices")
        .delete()
        .eq("id", deviceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
};
