"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/providers/cart-provider";
import { CreditCard, Minus, Plus, ShoppingCart, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ShoppingCartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clear } = useCart();
  const [successOpen, setSuccessOpen] = useState(false);

  const handleCheckout = async () => {
    // Simulate payment success
    clear();
    setSuccessOpen(true);
    toast.success("Payment successful. Order placed!");
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              Shopping Cart {totalItems > 0 ? `(${totalItems})` : ""}
            </SheetTitle>
            <SheetDescription>
              Review your items and proceed to payment.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-foreground/60 mb-4">Add some products to get started</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <Card key={item._id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-2">{item.name}</h4>
                          <p className="text-lg font-bold text-blue-600">৳{item.price}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => removeItem(item._id)} className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => updateQuantity(item._id, item.quantity - 1)} className="h-8 w-8 p-0">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button variant="outline" size="sm" onClick={() => updateQuantity(item._id, item.quantity + 1)} className="h-8 w-8 p-0">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>৳{totalPrice}</span></div>
                <div className="flex justify-between text-sm"><span>Shipping</span><span className="text-green-600">Free</span></div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>৳{totalPrice}</span></div>
              </div>
              <Button className="w-full h-12 text-lg" onClick={handleCheckout}><CreditCard className="mr-2 h-5 w-5" />Pay Now</Button>
              <div className="flex items-center gap-2 text-sm text-foreground/60 pb-2">
                <Truck className="h-4 w-4" />
                <span>Free shipping across Bangladesh</span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful</DialogTitle>
            <DialogDescription>Your order has been placed successfully. Thank you for shopping with NextShop!</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => { setSuccessOpen(false); onClose(); }}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}


