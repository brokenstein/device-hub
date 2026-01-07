-- Create devices table
CREATE TABLE public.devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  os TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create software_versions table
CREATE TABLE public.software_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID NOT NULL REFERENCES public.devices(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  version TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables (public read, no auth required for this use case)
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.software_versions ENABLE ROW LEVEL SECURITY;

-- Allow public read access to devices
CREATE POLICY "Anyone can view devices" 
ON public.devices 
FOR SELECT 
USING (true);

-- Allow public insert/update/delete for devices (no auth for simplicity)
CREATE POLICY "Anyone can insert devices" 
ON public.devices 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update devices" 
ON public.devices 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete devices" 
ON public.devices 
FOR DELETE 
USING (true);

-- Allow public read access to software_versions
CREATE POLICY "Anyone can view software versions" 
ON public.software_versions 
FOR SELECT 
USING (true);

-- Allow public insert/update/delete for software_versions
CREATE POLICY "Anyone can insert software versions" 
ON public.software_versions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update software versions" 
ON public.software_versions 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete software versions" 
ON public.software_versions 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_devices_updated_at
BEFORE UPDATE ON public.devices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing device data
INSERT INTO public.devices (id, name, model, os, image_url) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Giada DN74', 'DN74', 'Android 11 giada-jhs558', '/giada-dn74.png'),
  ('00000000-0000-0000-0000-000000000002', 'NVIDIA Shield', 'Shield TV Pro', 'Android TV 11', '/shield.png');

-- Insert software versions for Giada DN74
INSERT INTO public.software_versions (device_id, name, version) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Player', '7059'),
  ('00000000-0000-0000-0000-000000000001', 'EDU Command', '1015'),
  ('00000000-0000-0000-0000-000000000001', 'EDU Watcher', '1080'),
  ('00000000-0000-0000-0000-000000000001', 'EDU Updater', '6106'),
  ('00000000-0000-0000-0000-000000000001', 'Log Writer', '16'),
  ('00000000-0000-0000-0000-000000000001', 'Command Receiver', '9073'),
  ('00000000-0000-0000-0000-000000000001', 'Tv Controller', '49'),
  ('00000000-0000-0000-0000-000000000001', 'com.google.android.webview', '114.0.5735.131');

-- Insert software versions for NVIDIA Shield
INSERT INTO public.software_versions (device_id, name, version) VALUES
  ('00000000-0000-0000-0000-000000000002', 'Player', '7102'),
  ('00000000-0000-0000-0000-000000000002', 'EDU Command', '1018'),
  ('00000000-0000-0000-0000-000000000002', 'EDU Watcher', '1082'),
  ('00000000-0000-0000-0000-000000000002', 'EDU Updater', '6110'),
  ('00000000-0000-0000-0000-000000000002', 'Log Writer', '18'),
  ('00000000-0000-0000-0000-000000000002', 'Command Receiver', '9080'),
  ('00000000-0000-0000-0000-000000000002', 'Tv Controller', '52'),
  ('00000000-0000-0000-0000-000000000002', 'com.google.android.webview', '119.0.6045.134');