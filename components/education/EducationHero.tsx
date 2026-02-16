interface EducationHeroProps {
  title: string;
  description: string;
}

export default function EducationHero({ title, description }: EducationHeroProps) {
  return (
    <section className="relative overflow-hidden pattern-bg py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-dark mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
