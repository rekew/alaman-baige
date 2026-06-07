import { useEffect, useMemo, useState, type FormEvent } from "react";
import { type RequestStatus } from './types'
import {
  ArrowRight,
  Phone,
  RotateCcw,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  ReplaceUserProfileRequest,
  UserProfile,
} from "@/entities/profile";
import {
  deleteCurrentUser,
  getCurrentUser,
  replaceCurrentUser,
  updateCurrentUser,
} from "./api";

const emptyProfileForm: ReplaceUserProfileRequest = {
  firstName: "",
  surname: "",
  phoneNumber: "",
};

export default function ProfileMePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [form, setForm] = useState<ReplaceUserProfileRequest>(emptyProfileForm);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const hasChanges = useMemo(() => {
    if (!profile) {
      return false;
    }

    return (
      form.firstName !== profile.firstName ||
      form.surname !== profile.surname ||
      form.phoneNumber !== profile.phoneNumber
    );
  }, [form, profile]);

  useEffect(() => {
    async function loadProfile() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const userProfile = await getCurrentUser();

        setProfile(userProfile);
        setForm({
          firstName: userProfile.firstName,
          surname: userProfile.surname,
          phoneNumber: userProfile.phoneNumber,
        });
      } catch (error) {
        console.error("Profile loading failed:", error);
        setErrorMessage("Could not load your profile.");
      } finally {
        setStatus("idle");
      }
    }

    void loadProfile();
  }, []);

  async function handlePatchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!profile || !hasChanges) {
      return;
    }

    const changedFields: Partial<ReplaceUserProfileRequest> = {};

    if (form.firstName !== profile.firstName) {
      changedFields.firstName = form.firstName;
    }

    if (form.surname !== profile.surname) {
      changedFields.surname = form.surname;
    }

    if (form.phoneNumber !== profile.phoneNumber) {
      changedFields.phoneNumber = form.phoneNumber;
    }

    try {
      setStatus("saving");
      setMessage("");
      setErrorMessage("");

      await updateCurrentUser(changedFields);

      const updatedProfile = {
        ...profile,
        ...changedFields,
      };

      setProfile(updatedProfile);
      setMessage("Profile changes saved.");
    } catch (error) {
      console.error("Profile update failed:", error);
      setErrorMessage("Could not save profile changes.");
    } finally {
      setStatus("idle");
    }
  }

  async function handleReplaceProfile() {
    try {
      setStatus("saving");
      setMessage("");
      setErrorMessage("");

      await replaceCurrentUser(form);

      setProfile((currentProfile) =>
        currentProfile
          ? {
              ...currentProfile,
              ...form,
            }
          : null,
      );
      setMessage("Profile replaced.");
    } catch (error) {
      console.error("Profile replacement failed:", error);
      setErrorMessage("Could not replace profile.");
    } finally {
      setStatus("idle");
    }
  }

  async function handleDeleteProfile() {
    const confirmed = window.confirm(
      "Delete your profile? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setStatus("deleting");
      setMessage("");
      setErrorMessage("");

      await deleteCurrentUser();

      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Profile deletion failed:", error);
      setErrorMessage("Could not delete profile.");
      setStatus("idle");
    }
  }

  function handleResetForm() {
    if (!profile) {
      return;
    }

    setForm({
      firstName: profile.firstName,
      surname: profile.surname,
      phoneNumber: profile.phoneNumber,
    });
    setMessage("");
    setErrorMessage("");
  }

  const isBusy = status !== "idle";
  const isLoading = status === "loading";

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8">
        <div className="max-w-xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-foreground" />
            Alaman Baige account
          </div>

          <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Profile settings
          </h1>

          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
            Keep your personal details up to date for account access and race
            activity.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-foreground">Account identity</p>
              <p className="mt-1">Manage your name and primary phone number.</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-foreground">Secure updates</p>
              <p className="mt-1">
                Changes are sent using your active access token.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-card-foreground">
              My profile
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Edit the fields below and save your changes.
            </p>
          </div>

          {isLoading ? (
            <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
              Loading profile...
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handlePatchSubmit}>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-foreground">
                  First Name
                </span>

                <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                  <UserRound className="size-4 text-muted-foreground" />

                  <input
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    placeholder="Your first name"
                    type="text"
                    autoComplete="given-name"
                    required
                    disabled={isBusy || !profile}
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-foreground">
                  Surname
                </span>

                <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                  <UserRound className="size-4 text-muted-foreground" />

                  <input
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    placeholder="Your surname"
                    type="text"
                    autoComplete="family-name"
                    required
                    disabled={isBusy || !profile}
                    value={form.surname}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        surname: e.target.value,
                      })
                    }
                  />
                </div>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-foreground">
                  Phone Number
                </span>

                <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                  <Phone className="size-4 text-muted-foreground" />

                  <input
                    className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    placeholder="Your phone number"
                    type="tel"
                    autoComplete="tel"
                    required
                    disabled={isBusy || !profile}
                    value={form.phoneNumber}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </label>

              {message ? (
                <p className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                  {message}
                </p>
              ) : null}

              {errorMessage ? (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMessage}
                </p>
              ) : null}

              <Button
                className="mt-2 w-full"
                size="lg"
                type="submit"
                disabled={!hasChanges || isBusy}
              >
                Save changes
                <ArrowRight data-icon="inline-end" />
              </Button>

              <div className="grid gap-2 sm:grid-cols-2">
                <Button
                  className="w-full"
                  variant="outline"
                  type="button"
                  disabled={!profile || isBusy}
                  onClick={handleReplaceProfile}
                >
                  Replace all
                  <ArrowRight data-icon="inline-end" />
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  type="button"
                  disabled={!hasChanges || isBusy}
                  onClick={handleResetForm}
                >
                  Reset
                  <RotateCcw data-icon="inline-end" />
                </Button>
              </div>

              <Button
                className="w-full"
                variant="destructive"
                type="button"
                disabled={!profile || isBusy}
                onClick={handleDeleteProfile}
              >
                Delete profile
                <Trash2 data-icon="inline-end" />
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
