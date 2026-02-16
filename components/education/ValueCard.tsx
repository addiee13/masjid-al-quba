interface ValueCardProps {
  title: string;
  description: string;
}

export default function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="card p-6 h-full border border-transparent hover:border-primary-green/20">
      <h3 className="font-heading text-xl font-semibold text-primary-dark mb-3">
        {title}
      </h3>
      <p className="font-body text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
