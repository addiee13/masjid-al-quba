import type { SVGProps } from "react";

type PrayerIconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: PrayerIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function FajrIcon(props: PrayerIconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 16c2.1-2.2 4.8-3.3 8-3.3s5.9 1.1 8 3.3" />
      <path d="M3 19h18" />
      <path d="M12 11V4.8" />
      <path d="m9.4 7.4 2.6-2.6 2.6 2.6" />
      <path d="M12 11a2.2 2.2 0 0 1 2.2 2.2" />
      <path d="M12 11a2.2 2.2 0 0 0-2.2 2.2" />
    </IconBase>
  );
}

export function DhuhrIcon(props: PrayerIconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 2.5v3" />
      <path d="M12 18.5v3" />
      <path d="M2.5 12h3" />
      <path d="M18.5 12h3" />
      <path d="m5.4 5.4 2.1 2.1" />
      <path d="m16.5 16.5 2.1 2.1" />
      <path d="m18.6 5.4-2.1 2.1" />
      <path d="m7.5 16.5-2.1 2.1" />
    </IconBase>
  );
}

export function AsrIcon(props: PrayerIconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 19h14" />
      <path d="M9.2 19c-.8-3.7.3-7.4 2.8-10.7" />
      <path d="M12 8.3c2.6 3.4 3.6 7.1 2.8 10.7" />
      <path d="M14.8 6.2A3.1 3.1 0 1 1 9.2 6.2" />
    </IconBase>
  );
}

export function MaghribIcon(props: PrayerIconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 17h18" />
      <path d="M6 17c1.6-3.1 3.6-4.6 6-4.6s4.4 1.5 6 4.6" />
      <path d="M12 6.2v6.1" />
      <path d="m8.8 9.1 3.2 3.2 3.2-3.2" />
    </IconBase>
  );
}

export function IshaIcon(props: PrayerIconProps) {
  return (
    <IconBase {...props}>
      <path d="M15.7 4.8a6.6 6.6 0 1 0 3.5 11.8A7.9 7.9 0 0 1 15.7 4.8Z" />
      <path d="m17.8 8.1.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1Z" />
    </IconBase>
  );
}

export function JummahIcon(props: PrayerIconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 19h16" />
      <path d="M6 19v-5.2h12V19" />
      <path d="M9 13.8V11a3 3 0 0 1 6 0v2.8" />
      <path d="M10.8 7.1c.4-.7.8-1 1.2-1s.8.3 1.2 1" />
      <path d="M8 13.8h8" />
      <path d="M10 19v-2.8h4V19" />
    </IconBase>
  );
}
