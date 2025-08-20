"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ProductSummary = {
  category: string;
};

export default function AnalyticsPage() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) setProducts(await res.json());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const byCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of products) {
      map[p.category] = (map[p.category] || 0) + 1;
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [products]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-5xl space-y-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-purple-600" />
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : byCategory.length === 0 ? (
              <p className="text-foreground/60">No data</p>
            ) : (
              <div className="space-y-3">
                {byCategory.map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-3">
                    <div className="w-40 shrink-0 text-sm text-foreground/70">{cat}</div>
                    <div className="flex-1 h-3 bg-muted rounded">
                      <div className="h-3 bg-purple-600 rounded" style={{ width: `${(Number(count) / products.length) * 100}%` }} />
                    </div>
                    <div className="w-10 text-right text-sm">{count}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


