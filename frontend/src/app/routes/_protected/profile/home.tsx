import { createFileRoute } from "@tanstack/react-router";
import ProfileHomePage from "@/pages/profile/ProfileHomePage";

export const Route = createFileRoute("/_protected/profile/home")({
  component: ProfileHomePage,
});
