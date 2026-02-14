'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { removeFromCart, clearCart } from '@/lib/redux/slices/cart.slice';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { CheckoutForm } from '@/components/cart/checkout-form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

// export const metadata = {
//   title: 'Shopping Cart - LearnHub',
//   description: 'Review and checkout your courses',
// };

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const [activeTab, setActiveTab] = useState('cart');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleRemove = (courseId: string) => {
    dispatch(removeFromCart(courseId));
    toast.success('Course removed from cart');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    if (!cart.items.length) {
      toast.error('Cart is empty');
      return;
    }
    setActiveTab('checkout');
  };

  const handleCheckoutSuccess = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      dispatch(clearCart());
    }, 500);
  };

  const TAX_RATE = 0.1;
  const tax = cart.total * TAX_RATE;
  const finalTotal = cart.total + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8" />
              Shopping Cart
            </h1>
            <p className="text-lg text-foreground/60">
              {cart.quantity} course{cart.quantity !== 1 ? 's' : ''} in cart
            </p>
          </div>

          {cart.items.length === 0 && activeTab === 'cart' ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-foreground/30 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-foreground/60 mb-6">
                Explore our courses and add them to your cart to get started.
              </p>
              <Button onClick={() => router.push('/courses')} size="lg">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-xs grid-cols-2 mb-8">
                <TabsTrigger value="cart">Cart Items</TabsTrigger>
                <TabsTrigger value="checkout" disabled={cart.items.length === 0}>
                  Checkout
                </TabsTrigger>
              </TabsList>

              {/* Cart Items Tab */}
              <TabsContent value="cart" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Items */}
                  <div className="lg:col-span-2 space-y-4">
                    {cart.items.map(item => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemove}
                      />
                    ))}

                    {cart.items.length > 0 && (
                      <Button
                        variant="outline"
                        onClick={handleClearCart}
                        className="w-full mt-6"
                      >
                        Clear Cart
                      </Button>
                    )}
                  </div>

                  {/* Summary */}
                  {cart.items.length > 0 && (
                    <CartSummary
                      total={cart.total}
                      quantity={cart.quantity}
                      onCheckout={handleCheckout}
                    />
                  )}
                </div>
              </TabsContent>

              {/* Checkout Tab */}
              <TabsContent value="checkout" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form */}
                  <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
                    <CheckoutForm
                      total={finalTotal}
                      onSuccess={handleCheckoutSuccess}
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
                    <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

                    <div className="space-y-3 mb-6 pb-6 border-b">
                      {cart.items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-foreground/60 truncate">{item.course_title}</span>
                          <span className="font-medium flex-shrink-0">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60">Subtotal</span>
                        <span>${cart.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60">Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
