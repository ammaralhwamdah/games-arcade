-- Run this in Supabase SQL Editor so the admin can delete comments
create policy "Admins can delete comments" on public.comments
  for delete using (
    auth.jwt() ->> 'email' = 'ammar.alhwamdah@gmail.com'
  );
