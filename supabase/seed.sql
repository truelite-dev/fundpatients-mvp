-- Local-development seed (supabase db reset). Never run against the hosted project.
-- Test donor for exercising /users/* auth gating on the local stack.
--   email: donor@fundpatients.test
--   password: 1dfl4j6thGMOtc0SRxmz
-- The on_auth_user_created trigger creates the matching profiles row.

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change
) values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-4111-8111-111111111111',
  'authenticated', 'authenticated',
  'donor@fundpatients.test',
  crypt('1dfl4j6thGMOtc0SRxmz', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Temisan James"}',
  now(), now(), '', '', '', ''
);

insert into auth.identities (
  id, user_id, provider_id, provider, identity_data, last_sign_in_at, created_at, updated_at
) values (
  gen_random_uuid(),
  '11111111-1111-4111-8111-111111111111',
  '11111111-1111-4111-8111-111111111111',
  'email',
  '{"sub":"11111111-1111-4111-8111-111111111111","email":"donor@fundpatients.test","email_verified":true}',
  now(), now(), now()
);
