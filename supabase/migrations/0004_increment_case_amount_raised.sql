-- Atomic increment so concurrent webhook deliveries (Paystack/Stripe retries)
-- can't race a read-modify-write on cases.amount_raised. Also flips a case to
-- 'fully_funded' once the goal is met.
create or replace function increment_case_amount_raised(p_case_id uuid, p_amount numeric)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update cases
  set amount_raised = amount_raised + p_amount,
      status = case
        when amount_raised + p_amount >= goal_amount and status = 'published' then 'fully_funded'
        else status
      end,
      updated_at = now()
  where id = p_case_id;
end;
$$;

revoke execute on function increment_case_amount_raised(uuid, numeric) from public, anon, authenticated;
grant execute on function increment_case_amount_raised(uuid, numeric) to service_role;
