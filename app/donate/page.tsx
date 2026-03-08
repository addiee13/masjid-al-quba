import { Metadata } from "next";
import DonatePageContent from "./DonatePageContent";

export const metadata: Metadata = {
  title: "Donate | Masjid Al-Quba",
  description:
    "Support Masjid Al-Quba through your generous donations. Choose from Ramadan giving, construction, operations, Zakat, or Sadaqah.",
};

export default function DonatePage() {
  return <DonatePageContent />;
}
