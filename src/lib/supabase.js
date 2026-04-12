import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hrkjwahsgueqhlglrtbd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya2p3YWhzZ3VlcWhsZ2xydGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDk0MTcsImV4cCI6MjA5MTU4NTQxN30.u9RfvW77RH2k_2lCx92x87TR9rXXnjJCEN2wemJngV4"
);