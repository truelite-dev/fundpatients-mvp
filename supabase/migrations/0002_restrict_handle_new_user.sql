-- handle_new_user is only meant to run as an auth.users insert trigger.
-- Postgres grants EXECUTE on new functions to PUBLIC by default, which
-- exposes it as a callable RPC endpoint (/rest/v1/rpc/handle_new_user) to
-- anon/authenticated. Revoke that — only the trigger (running as the table
-- owner) needs to call it.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
