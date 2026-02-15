import { LucideIcon } from 'lucide-react';

interface HighlightChipProps {
  icon: LucideIcon;
  label: string;
}

export default function HighlightChip({ icon: Icon, label }: HighlightChipProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary-green/20 backdrop-blur-sm">
      <Icon className="w-5 h-5 text-primary-green" aria-hidden="true" />
      <span className="text-sm font-medium text-primary-dark">{label}</span>
    </div>
  );
}
