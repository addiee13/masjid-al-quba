import { Metadata } from "next";
import VolunteerPageContent from "@/components/get-involved/VolunteerPageContent";

export const metadata: Metadata = {
  title: "Volunteer | Masjid Al-Quba",
  description:
    "Volunteer with Masjid Al-Quba and support outreach and community initiatives.",
};

export default function GetInvolvedVolunteerPage() {
  return <VolunteerPageContent />;
}
