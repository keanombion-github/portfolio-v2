import type { Identity } from "@/lib/auth";

export function IdentityControls({
  identity,
  configured,
  error,
}: {
  identity: Identity | null;
  configured: boolean;
  error: boolean;
}) {
  if (!configured) return null;
  return (
    <div className="mb-5 rounded-xl border border-[var(--border)] p-5 text-sm">
      {identity ? (
        <>
          <p>
            Signed in as{" "}
            <a
              className="text-[var(--accent)]"
              href={identity.profile}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{identity.login}
            </a>
          </p>
          <p className="muted mt-2 text-xs leading-6">
            Your GitHub profile will accompany your recommendation for review.
          </p>
          <form action="/api/auth/logout" method="post">
            <button className="button mt-3" type="submit">
              Sign out
            </button>
          </form>
        </>
      ) : (
        <>
          <a href="/api/auth/github" className="button">
            Sign in with GitHub ↗
          </a>
          <p className="muted mt-3 text-xs leading-6">
            Optional: include your GitHub identity with your recommendation. You
            can also submit directly below.
          </p>
        </>
      )}
      {error && (
        <p role="status" className="mt-3 text-xs">
          GitHub sign-in could not be completed. Please try again or use the
          form below.
        </p>
      )}
    </div>
  );
}
