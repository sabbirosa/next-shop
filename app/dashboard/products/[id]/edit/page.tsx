"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export default function EditProductPage() {
  const { status } = useSession();
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProductFormData | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const id = params.id as string;
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          category: data.category,
          inStock: data.inStock,
        });
      } catch {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (status === "loading" || loading || !formData) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => prev ? ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : 
               type === "number" ? parseFloat(value) || 0 : value
    }) : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Product updated");
      router.push("/dashboard/products");
    } catch {
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/dashboard/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={4} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (৳)</Label>
                  <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} min="0" step="0.01" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" value={formData.image} onChange={handleInputChange} />
              </div>
              <div className="flex items-center gap-2">
                <input id="inStock" name="inStock" type="checkbox" checked={formData.inStock} onChange={handleInputChange} />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              <Button type="submit" disabled={saving} className="w-full h-12">
                {saving ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>) : (<><Save className="mr-2 h-4 w-4" />Save Changes</>)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


