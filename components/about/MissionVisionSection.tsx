interface MissionVisionSectionProps {
  mission: string;
  vision: string;
}

export default function MissionVisionSection({ mission, vision }: MissionVisionSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {/* Mission */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-dark mb-4 decorative-line">
          Mission
        </h2>
        <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
          {mission}
        </p>
      </div>

      {/* Vision */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-dark mb-4 decorative-line">
          Vision
        </h2>
        <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed">
          {vision}
        </p>
      </div>
    </div>
  );
}
