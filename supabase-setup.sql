-- ═══════════════════════════════════════════════
-- EventSphere — повний SQL для Supabase
-- Запускати в SQL Editor: один раз зверху вниз
-- ═══════════════════════════════════════════════

-- 1. Таблиця profiles (якщо ще немає)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  role        text default 'client',
  city        text,
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

-- Видаляємо старі політики якщо є
drop policy if exists "Users see own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;

create policy "Users see own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- 2. Тригер: автоматично створює профіль при реєстрації
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    coalesce(new.raw_user_meta_data->>'role', 'client')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Таблиця requests
create table if not exists public.requests (
  id           bigint generated always as identity primary key,
  created_at   timestamptz default now(),
  vendor_id    int,
  vendor_name  text,
  user_id      uuid references auth.users(id) on delete set null,
  user_email   text,
  event_date   date,
  guests       int,
  message      text,
  status       text default 'new'
);

alter table public.requests enable row level security;

-- Видаляємо старі політики
drop policy if exists "Users see own requests" on public.requests;
drop policy if exists "Anyone can insert" on public.requests;
drop policy if exists "Users update own requests" on public.requests;
drop policy if exists "Vendors update request status" on public.requests;

-- Клієнт бачить свої запити
create policy "Users see own requests"
  on public.requests for select
  using (auth.uid() = user_id);

-- Виконавець бачить запити до себе
create policy "Vendors see their requests"
  on public.requests for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'vendor' and name = requests.vendor_name
    )
  );

-- Будь-хто може надіслати запит
create policy "Anyone can insert"
  on public.requests for insert with check (true);

-- Виконавець може змінювати статус
create policy "Vendors update request status"
  on public.requests for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'vendor' and name = requests.vendor_name
    )
  );
