import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { BowtieMark } from './BowtieMark';

export interface CartItem {
  key: string;
  product: Product;
  swatchIndex: number;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 100;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('card');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    itemCount: number;
    recipient: string;
  } | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open && step === 'confirmed') {
      setStep('bag');
    }
  }, [open, step]);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim().includes('@') || !address.trim()) {
      setErrorMsg('Please complete your name, valid email, and shipping address.');
      return;
    }
    setErrorMsg('');
    const orderNum = `HD-2025-${Math.floor(1000 + Math.random() * 8999)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      total,
      itemCount,
      recipient: fullName.trim(),
    });
    onClearCart();
    setStep('confirmed');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-[#E5E5E5]"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-[22px] font-medium text-[#111111]">
              {step === 'bag' && 'Your Cart'}
              {step === 'checkout' && 'Delivery & Payment'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
            {step === 'bag' && (
              <p className="text-[12px] text-[#666666] tabular-nums mt-0.5">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart drawer"
            className="w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#F5F5F3] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Notice Strip */}
        {step === 'bag' && items.length > 0 && (
          <div className="px-6 py-3 bg-[#FAF9F5] border-b border-[#ECEAE4]">
            <p className="text-[12px] text-[#333333] tabular-nums">
              {remainingForFreeShipping === 0
                ? 'Complimentary carbon-neutral shipping unlocked.'
                : `Add $${remainingForFreeShipping.toFixed(2)} more for free carbon-neutral shipping.`}
            </p>
            <div className="mt-2 h-1 bg-[#E5E2D9] w-full overflow-hidden">
              <div
                className="h-full bg-[#431100] transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 'confirmed' && confirmedOrder ? (
            <div className="py-6">
              <div className="inline-flex items-center gap-2 text-[#431100]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.05em]">
                  Preparing Shipment
                </span>
              </div>
              <h3 className="font-serif text-[26px] text-[#111111] mt-3 leading-snug">
                Thank you, {confirmedOrder.recipient}.
              </h3>
              <p className="text-[13px] text-[#555555] mt-2 leading-relaxed">
                Your curated pieces are being carefully wrapped in plastic-free studio packaging.
              </p>

              <dl className="mt-6 pt-5 border-t border-[#E5E5E5] space-y-2.5 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-[#666666]">Order Reference</dt>
                  <dd className="font-medium text-[#111111] tabular-nums">
                    #{confirmedOrder.orderNumber}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#666666]">Pieces Reserved</dt>
                  <dd className="text-[#111111] tabular-nums">{confirmedOrder.itemCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#666666]">Total Charged</dt>
                  <dd className="font-medium text-[#111111] tabular-nums">
                    ${confirmedOrder.total.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => {
                  setStep('bag');
                  onClose();
                }}
                className="mt-8 w-full h-11 bg-[#111111] text-white text-[13px] font-medium hover:bg-[#431100] transition-colors cursor-pointer"
              >
                Continue Exploring Catalog
              </button>
            </div>
          ) : step === 'checkout' ? (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label htmlFor="co-name" className="block text-[12px] font-medium text-[#111111] mb-1">
                  Full Name
                </label>
                <input
                  id="co-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Clara Lindqvist"
                  className="w-full h-10 px-3 border border-[#D4D4D4] focus:border-[#111111] text-[13px] outline-none"
                />
              </div>

              <div>
                <label htmlFor="co-email" className="block text-[12px] font-medium text-[#111111] mb-1">
                  Email Address
                </label>
                <input
                  id="co-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="clara@example.com"
                  className="w-full h-10 px-3 border border-[#D4D4D4] focus:border-[#111111] text-[13px] outline-none"
                />
              </div>

              <div>
                <label htmlFor="co-address" className="block text-[12px] font-medium text-[#111111] mb-1">
                  Shipping Address
                </label>
                <textarea
                  id="co-address"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="418 Mercer St, Apt 4B, Portland, OR 97205"
                  className="w-full p-3 border border-[#D4D4D4] focus:border-[#111111] text-[13px] outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <span className="block text-[12px] font-medium text-[#111111] mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 border text-[12px] text-left cursor-pointer transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#111111] bg-[#FAF9F5] font-medium text-[#111111]'
                        : 'border-[#D4D4D4] text-[#555555]'
                    }`}
                  >
                    Card / Express Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2.5 px-3 border text-[12px] text-left cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#111111] bg-[#FAF9F5] font-medium text-[#111111]'
                        : 'border-[#D4D4D4] text-[#555555]'
                    }`}
                  >
                    Pay on Delivery
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p role="alert" className="text-[12px] text-[#991B1B]">
                  {errorMsg}
                </p>
              )}

              <button
                type="button"
                onClick={() => setStep('bag')}
                className="text-[12px] text-[#555555] underline underline-offset-4 hover:text-[#111111] cursor-pointer"
              >
                Back to cart items
              </button>
            </form>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <BowtieMark className="w-9 h-5 text-[#431100] opacity-25 mb-4" />
              <p className="font-serif text-[20px] text-[#111111]">Your bag is empty</p>
              <p className="text-[13px] text-[#666666] mt-2 max-w-[240px]">
                Explore handcrafted lighting, stoneware, and sustainable wood accents.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 border border-[#111111] text-[12px] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#EBEBEB]">
              {items.map((item) => {
                const swatch = item.product.swatches[item.swatchIndex] ?? item.product.swatches[0];
                return (
                  <li key={item.key} className="py-4 first:pt-0 flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover bg-[#F3EFEA] shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-medium text-[#111111] truncate">
                            {item.product.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#666666]">
                            <BowtieMark className="w-3 h-2 shrink-0" color={swatch.hex} />
                            <span className="truncate">{swatch.name}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#777777] hover:text-[#111111] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#DCDCDC]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, -1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#111111] hover:bg-[#F5F5F3] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-[12px] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#111111] hover:bg-[#F5F5F3] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-[13px] font-medium text-[#111111] tabular-nums">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Drawer Footer Summary & Checkout Button */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-[#E5E5E5] bg-[#FAF9F6]">
            <dl className="space-y-1.5 text-[13px]">
              <div className="flex justify-between text-[#555555]">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-[#555555]">
                <dt>Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</dd>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E5E5E5] text-[15px] font-semibold text-[#111111]">
                <dt>Total</dt>
                <dd className="tabular-nums">${total.toFixed(2)}</dd>
              </div>
            </dl>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="mt-4 w-full h-11 bg-[#111111] text-white text-[13px] font-medium hover:bg-[#431100] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="checkout-form"
                className="mt-4 w-full h-11 bg-[#431100] text-white text-[13px] font-medium hover:bg-[#111111] transition-colors cursor-pointer"
              >
                Place Order — ${total.toFixed(2)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
