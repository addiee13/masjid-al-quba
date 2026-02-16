interface ConceptSectionProps {
  title: string;
  points: string[];
}

export default function ConceptSection({ title, points }: ConceptSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-8 decorative-line">
          {title}
        </h2>
        <div className="space-y-4">
          {points.map((point) => (
            <div key={point} className="card-elevated p-5 border-l-4 border-primary-green">
              <p className="font-body text-muted-foreground leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
