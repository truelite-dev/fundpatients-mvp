import { redirect } from "next/navigation";

// Followed stories live in My stories under the Following filter.
export default function FollowingPage() {
  redirect("/users/stories?filter=following");
}
