import { z } from 'zod';

export const STEPS = ['Personal Info', 'Address & Items', 'Payment'] as const;

export const GENDER_OPTIONS = ['male', 'female', 'other'] as const;
export type GenderType = (typeof GENDER_OPTIONS)[number];

export const checkoutSchema = z.object({
  // Step 1 — Personal Info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  gender: z.enum(GENDER_OPTIONS),
  age: z
    .string()
    .min(1, 'Age is required')
    .refine(
      val => {
        const n = Number(val);
        return Number.isFinite(n) && n >= 18 && n <= 120;
      },
      { message: 'Age must be a valid number between 18 and 120' },
    ),
  email: z.email('Invalid email address'),

  // Step 2 — Shipping Address
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  zipCode: z.string().regex(/^\d{5,6}$/, 'Zip code must be 5–6 digits'),

  // Step 3 — Payment
  cardHolder: z.string().min(2, 'Cardholder name is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be exactly 16 digits'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format must be MM/YY'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const MOCK_CART_ITEMS: CartItem[] = [
  { id: 1, name: 'Wireless Headphones', price: 89.99, quantity: 1 },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99, quantity: 1 },
  { id: 3, name: 'USB-C Hub', price: 45.99, quantity: 2 },
];
