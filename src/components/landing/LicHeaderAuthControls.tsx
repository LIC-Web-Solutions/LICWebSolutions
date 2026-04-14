"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

function useSignedInState() {
  const { isLoaded, userId } = useAuth();
  return { isLoaded, isSignedIn: Boolean(userId) };
}

const userButtonAppearance = {
  elements: {
    avatarBox: "h-7 w-7 ring-1 ring-white/30",
  },
} as const;

const userButtonAppearanceMobile = {
  elements: {
    avatarBox: "h-9 w-9",
  },
} as const;

/** Desktop top banner (visible from `lg` breakpoint): auth CTAs mirror mobile menu. */
export function LicHeaderBannerAuth() {
  const { isLoaded, isSignedIn } = useSignedInState();

  if (!isLoaded) {
    return (
      <div
        className="banner__auth-group banner__auth-group--loading"
        aria-busy="true"
        aria-label="Loading account"
      />
    );
  }

  if (isSignedIn) {
    return (
      <div className="banner__auth-group">
        <Link href="/portal" className="banner__login">
          Dashboard
        </Link>
        <UserButton appearance={userButtonAppearance} />
      </div>
    );
  }

  return (
    <div className="banner__auth-group">
      <Link href="/sign-in" className="banner__login">
        Client login
      </Link>
      <Link href="/sign-up" className="banner__signup">
        Sign up
      </Link>
    </div>
  );
}

/** Mobile drawer actions: same sign-in / sign-up vs dashboard protocol as the banner. */
export function LicHeaderMobileAuth() {
  const { isLoaded, isSignedIn } = useSignedInState();

  if (!isLoaded) {
    return (
      <div
        className="mobile-menu__auth-loading"
        aria-busy="true"
        aria-label="Loading account"
      />
    );
  }

  if (isSignedIn) {
    return (
      <>
        <Link className="mobile-menu__action" href="/portal">
          Dashboard
        </Link>
        <div className="mobile-menu__user-button">
          <UserButton appearance={userButtonAppearanceMobile} />
        </div>
      </>
    );
  }

  return (
    <>
      <Link className="mobile-menu__action" href="/sign-in">
        Client login
      </Link>
      <Link
        className="mobile-menu__action mobile-menu__action--secondary"
        href="/sign-up"
      >
        Sign up
      </Link>
    </>
  );
}
