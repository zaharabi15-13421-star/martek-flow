
-- Tighten company_members INSERT: require self-membership via client (admin flow used for invites)
DROP POLICY IF EXISTS company_members_insert_owner ON public.company_members;
CREATE POLICY company_members_insert_self_owner
ON public.company_members
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = company_members.company_id AND c.owner_id = auth.uid()
  )
);

-- Restrict web_brand_books SELECT to owners; public pages use server function with service role
DROP POLICY IF EXISTS wbb_public_select ON public.web_brand_books;
CREATE POLICY wbb_owner_select
ON public.web_brand_books
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
