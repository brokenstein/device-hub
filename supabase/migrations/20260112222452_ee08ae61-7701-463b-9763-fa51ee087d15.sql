-- Fix: Restrict profile visibility to owner or admin only
-- This prevents public access to user email addresses

DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile or admins can view all"
ON public.profiles FOR SELECT
USING (auth.uid() = user_id OR public.is_admin());