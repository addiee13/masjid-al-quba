export const siteConfig = {
  name: "Masjid Al-Quba",
  fullName: "Masjid Al-Quba Islamic Center",
  address: "1400 Buford Hwy, Sugar Hill, GA 30518",
  coordinates: {
    latitude: 34.0921067,
    longitude: -84.0167912,
  },
  phone: "(404) 933-2943",
  email: "masjidalquba@gmail.com",
  logo: "/masjid_logo.png",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Education", href: "/education" },
    { label: "Events", href: "/events" },
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
