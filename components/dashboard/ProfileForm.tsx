"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, LogOut, Pencil, X } from "lucide-react";
import type { Profile } from "@/lib/donor";

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

type Errors = Partial<Record<"firstName" | "lastName" | "email" | "facebook" | "twitter" | "linkedin", string>>;

const socials = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourname" },
  { key: "twitter", label: "Twitter", placeholder: "https://twitter.com/yourname" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourname" },
] as const;

function isHttpUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function validate(p: Profile): Errors {
  const e: Errors = {};
  if (!p.firstName.trim()) e.firstName = "First name is required";
  if (!p.lastName.trim()) e.lastName = "Last name is required";
  if (!p.email.trim()) e.email = "Email address is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim())) e.email = "Enter a valid email address";
  for (const { key, label } of socials) {
    const v = p.social[key].trim();
    if (v && !isHttpUrl(v)) e[key] = `Enter a valid ${label} link starting with https://`;
  }
  return e;
}

const inputClass =
  "w-full rounded-xl border px-4 py-2.5 text-sm text-brand-forest outline-none transition placeholder:text-brand-muted-sage/70 disabled:cursor-default disabled:border-transparent disabled:bg-gray-100 enabled:border-border enabled:bg-white enabled:focus:border-brand-deep-green";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-brand-muted-sage">
        {label}
        {required && " *"}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// Mock phase: edits and the chosen photo live in local state only.
export function ProfileForm({ initial }: { initial: Profile }) {
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const view = editing ? draft : saved;

  function startEdit() {
    setDraft(saved);
    setErrors({});
    setNotice(null);
    setEditing(true);
  }

  function cancel() {
    setEditing(false);
    setErrors({});
    setPhotoError(null);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    const next = validate(draft);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSaved({
      ...draft,
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
      email: draft.email.trim(),
      bio: draft.bio.trim(),
    });
    setEditing(false);
    setNotice("Profile updated. Changes aren't saved to your account yet.");
  }

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setPhotoError("Choose an image file");
    if (file.size > MAX_PHOTO_BYTES) return setPhotoError("Image must be 2MB or smaller");
    setPhotoError(null);
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
  }

  return (
    <form onSubmit={save} noValidate>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-brand-forest">Profile</h1>
          <p className="mt-1 text-sm text-brand-muted-sage">Manage your personal details</p>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-brand-deep-green px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-forest"
              >
                <Check className="h-4 w-4" />
                Save
              </button>
              <button
                type="button"
                onClick={cancel}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-forest transition hover:bg-brand-soft-sage"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={startEdit}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-brand-forest transition hover:border-brand-deep-green"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              {/* Mock phase: no real session, so Logout returns to /login. */}
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </>
          )}
        </div>
      </div>

      {notice && !editing && (
        <p role="status" className="mt-4 rounded-xl bg-brand-soft-sage px-4 py-3 text-sm text-brand-forest">
          {notice}
        </p>
      )}

      <section className="mt-6" aria-labelledby="photo-heading">
        <h2 id="photo-heading" className="text-sm font-semibold text-brand-forest">
          Update profile picture
        </h2>
        <div className="mt-3 flex items-center gap-4">
          <div className="relative">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview
              <img src={photo} alt="Profile preview" className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <span
                aria-hidden
                className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-forest font-display text-2xl font-semibold text-brand-mint"
              >
                {saved.firstName[0]}
                {saved.lastName[0]}
              </span>
            )}
            {editing && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="Change profile picture"
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-brand-forest shadow-sm transition hover:text-brand-deep-green"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="sr-only" tabIndex={-1} />
          </div>
          <p className="text-xs text-brand-muted-sage">
            {editing ? "JPG or PNG, up to 2MB. Preview only for now." : "Press Edit to change your photo."}
          </p>
        </div>
        {photoError && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {photoError}
          </p>
        )}
      </section>

      <section className="mt-8 border-t border-border pt-6" aria-labelledby="details-heading">
        <h2 id="details-heading" className="font-display text-lg font-semibold text-brand-forest">
          Details
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field id="firstName" label="First Name" required error={errors.firstName}>
            <input
              id="firstName"
              disabled={!editing}
              value={view.firstName}
              onChange={(e) => setDraft((d) => ({ ...d, firstName: e.target.value }))}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              autoComplete="given-name"
              className={inputClass}
            />
          </Field>
          <Field id="lastName" label="Last Name" required error={errors.lastName}>
            <input
              id="lastName"
              disabled={!editing}
              value={view.lastName}
              onChange={(e) => setDraft((d) => ({ ...d, lastName: e.target.value }))}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              autoComplete="family-name"
              className={inputClass}
            />
          </Field>
        </div>
        <div className="mt-4 grid gap-4">
          <Field id="bio" label="Short biography">
            <textarea
              id="bio"
              rows={3}
              maxLength={280}
              disabled={!editing}
              value={view.bio}
              onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
              placeholder={editing ? "Tell us a little about yourself" : "No biography added"}
              className={inputClass}
            />
          </Field>
          <Field id="email" label="Email address" required error={errors.email}>
            <input
              id="email"
              type="email"
              disabled={!editing}
              value={view.email}
              onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              autoComplete="email"
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      <section className="mt-8 border-t border-border pt-6" aria-labelledby="social-heading">
        <h2 id="social-heading" className="font-display text-lg font-semibold text-brand-forest">
          Social media
        </h2>
        <div className="mt-4 grid gap-4">
          {socials.map(({ key, label, placeholder }) => (
            <Field key={key} id={key} label={label} error={errors[key]}>
              {editing ? (
                <input
                  id={key}
                  type="url"
                  value={draft.social[key]}
                  onChange={(e) => setDraft((d) => ({ ...d, social: { ...d.social, [key]: e.target.value } }))}
                  placeholder={placeholder}
                  aria-invalid={!!errors[key]}
                  aria-describedby={errors[key] ? `${key}-error` : undefined}
                  className={inputClass}
                />
              ) : (
                <p id={key} className={`rounded-xl bg-gray-100 px-4 py-2.5 text-sm ${saved.social[key] ? "text-brand-forest" : "text-brand-muted-sage"}`}>
                  {saved.social[key] || "Not added"}
                </p>
              )}
            </Field>
          ))}
        </div>
      </section>
    </form>
  );
}
