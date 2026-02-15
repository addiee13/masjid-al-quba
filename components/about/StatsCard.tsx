import Link from 'next/link';

interface StatsCardProps {
  title: string;
  description: string;
  link?: string;
}

export default function StatsCard({ title, description, link }: StatsCardProps) {
  const content = (
    <>
      <h3 className="text-xl font-heading font-semibold text-primary-dark mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground font-body">
        {description}
      </p>
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        className="card p-6 hover:shadow-lg transition-shadow duration-300 block group"
      >
        {content}
        <span className="inline-block mt-2 text-primary-green text-sm font-medium group-hover:underline">
          Learn more →
        </span>
      </Link>
    );
  }

  return (
    <div className="card p-6">
      {content}
    </div>
  );
}
