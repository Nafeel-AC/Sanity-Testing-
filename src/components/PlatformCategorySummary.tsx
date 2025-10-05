import { useEffect, useMemo, useState } from "react";
import { client } from "@/lib/sanityClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PlatformCategoryDoc = {
  _id: string;
  value: string; // followers, likes, ...
  label: string; // Anzeige
  packages?: Array<{ value: string; label: string; price?: string }>; // price string like "4.99€"
  order?: number | null;
};

interface PlatformCategorySummaryProps {
  platformSlug: string; // e.g. "instagram"
  limit?: number; // how many categories to show
  className?: string;
}

const query = `
  {
    "platform": *[_type == "platform" && slug.current == $slug][0]{ _id, title, "slug": slug.current },
    "categories": *[_type == "platformCategory" && references(^.platform._id)]|order(order asc, label asc){
      _id, value, label, packages[]{ value, label, price }, order
    }
  }
`;

function parsePriceToNumber(price?: string): number | null {
  if (!price) return null;
  const numeric = parseFloat(price.replace(/[^0-9.,]/g, "").replace(",", "."));
  return isNaN(numeric) ? null : numeric;
}

export default function PlatformCategorySummary({ platformSlug, limit = 4, className = "" }: PlatformCategorySummaryProps) {
  const [categories, setCategories] = useState<PlatformCategoryDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client
      .fetch(query, { slug: platformSlug })
      .then((res: { platform?: { _id: string } | null; categories?: PlatformCategoryDoc[] }) => {
        setCategories(res?.categories || []);
      })
      .finally(() => setLoading(false));
  }, [platformSlug]);

  const limited = useMemo(() => categories.slice(0, limit), [categories, limit]);

  const computeMinPrice = (pc: PlatformCategoryDoc): { display: string; value: number | null } => {
    const prices = (pc.packages || [])
      .map(p => parsePriceToNumber(p.price))
      .filter((n): n is number => n !== null);
    if (!prices.length) return { display: "—", value: null };
    const min = Math.min(...prices);
    return { display: `€${min.toFixed(2)}`, value: min };
  };

  if (loading) return <div className="text-center py-8">Lade Kategorien…</div>;
  if (!limited.length) return null;

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold">Services nach Kategorie</h3>
        <p className="text-muted-foreground">Top-Kategorien mit günstigstem Einstiegspreis</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
        {limited.map((cat) => {
          const min = computeMinPrice(cat);
          return (
            <Card key={cat._id} className="border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-base md:text-lg">{cat.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-sm text-muted-foreground mb-2">ab</div>
                <div className="text-2xl font-bold text-primary mb-3">{min.display}</div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href={`#`}>Details</a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}


