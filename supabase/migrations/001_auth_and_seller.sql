-- ============================================================
-- ATSIRI LESTARI — Auth & Seller Schema Migration
-- Jalankan ini di Supabase Dashboard → SQL Editor
-- ============================================================

-- ============================================================
-- 1. TABEL PROFILES
--    Otomatis terbuat saat user pertama kali login (via trigger)
-- ============================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  avatar_url  text,
  is_seller   boolean not null default false,
  created_at  timestamptz not null default now()
);

comment on table public.profiles is 'Data profil publik pengguna, linked ke auth.users';

-- ============================================================
-- 2. TABEL SELLER_PROFILES
--    Diisi saat user klik "Jadi Penjual" dan isi form toko
-- ============================================================
create table if not exists public.seller_profiles (
  user_id     uuid primary key references public.profiles(id) on delete cascade,
  store_name  text not null,
  description text,
  address     text,
  category    text,
  created_at  timestamptz not null default now()
);

comment on table public.seller_profiles is 'Info toko penjual atsiri';

-- ============================================================
-- 3. TABEL PRODUCTS
--    Produk yang diupload oleh seller via dashboard
-- ============================================================
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  seller_id   uuid not null references public.profiles(id) on delete cascade,
  name        text not null,
  description text,
  price       numeric(12, 2) not null check (price >= 0),
  stock       integer not null default 0 check (stock >= 0),
  image_url   text,
  category    text not null,
  moq         integer not null default 1 check (moq >= 1),
  created_at  timestamptz not null default now()
);

comment on table public.products is 'Produk yang dijual oleh seller di platform';

-- ============================================================
-- 4. TRIGGER: Auto-create profile saat user Google OAuth masuk
--    Dipanggil setiap INSERT baru di auth.users
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update set
    email      = excluded.email,
    full_name  = coalesce(excluded.full_name, public.profiles.full_name),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url);
  return new;
end;
$$;

-- Drop trigger lama kalau ada, lalu buat ulang
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS di semua tabel
alter table public.profiles      enable row level security;
alter table public.seller_profiles enable row level security;
alter table public.products      enable row level security;

-- -------------------------------------------------------
-- PROFILES: user hanya bisa akses baris miliknya sendiri
-- -------------------------------------------------------
drop policy if exists "profiles: select own"  on public.profiles;
drop policy if exists "profiles: update own"  on public.profiles;
drop policy if exists "profiles: insert own"  on public.profiles;

create policy "profiles: select own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- Trigger handle_new_user pakai SECURITY DEFINER, jadi insert
-- profiles bisa dilakukan oleh trigger meskipun RLS aktif.
-- Tapi kita tambahkan policy insert untuk keamanan:
create policy "profiles: insert via trigger" on public.profiles
  for insert with check (auth.uid() = id);

-- -------------------------------------------------------
-- SELLER_PROFILES:
--   SELECT → siapa saja (publik, untuk tampil info toko)
--   INSERT/UPDATE → hanya user pemilik
-- -------------------------------------------------------
drop policy if exists "seller_profiles: select public" on public.seller_profiles;
drop policy if exists "seller_profiles: insert own"   on public.seller_profiles;
drop policy if exists "seller_profiles: update own"   on public.seller_profiles;

create policy "seller_profiles: select public" on public.seller_profiles
  for select using (true);

create policy "seller_profiles: insert own" on public.seller_profiles
  for insert with check (auth.uid() = user_id);

create policy "seller_profiles: update own" on public.seller_profiles
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- -------------------------------------------------------
-- PRODUCTS:
--   SELECT → siapa saja (termasuk yang belum login — browsing publik)
--   INSERT  → hanya seller yang sudah punya seller_profile
--   UPDATE/DELETE → hanya seller pemilik produk
-- -------------------------------------------------------
drop policy if exists "products: select public"    on public.products;
drop policy if exists "products: insert by seller" on public.products;
drop policy if exists "products: update own"       on public.products;
drop policy if exists "products: delete own"       on public.products;

create policy "products: select public" on public.products
  for select using (true);

create policy "products: insert by seller" on public.products
  for insert with check (
    auth.uid() = seller_id
    and exists (
      select 1 from public.seller_profiles
      where user_id = auth.uid()
    )
  );

create policy "products: update own" on public.products
  for update using (auth.uid() = seller_id)
  with check (
    auth.uid() = seller_id
    and exists (
      select 1 from public.seller_profiles
      where user_id = auth.uid()
    )
  );

create policy "products: delete own" on public.products
  for delete using (auth.uid() = seller_id);

-- ============================================================
-- SELESAI — Verifikasi dengan query berikut:
-- ============================================================
-- select * from public.profiles;
-- select * from public.seller_profiles;
-- select * from public.products;
-- select trigger_name from information_schema.triggers
--   where event_object_table = 'users';
