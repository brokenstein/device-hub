-- Create storage bucket for device downloads
INSERT INTO storage.buckets (id, name, public)
VALUES ('device-downloads', 'device-downloads', true);

-- Allow anyone to read files (public downloads)
CREATE POLICY "Public read access for device downloads"
ON storage.objects FOR SELECT
USING (bucket_id = 'device-downloads');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload device downloads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'device-downloads');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update device downloads"
ON storage.objects FOR UPDATE
USING (bucket_id = 'device-downloads');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete device downloads"
ON storage.objects FOR DELETE
USING (bucket_id = 'device-downloads');