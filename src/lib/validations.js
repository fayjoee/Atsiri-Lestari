// ============================================================
// ATSIRI LESTARI — Zod Validation Schemas
// File: src/lib/validations.js
//
// Konsisten dengan constraint di database (migration 002).
// Install: npm install zod
// ============================================================

import { z } from 'zod'

// ────────────────────────────────────────────────────────────
// ENUM CONSTANTS (sama persis dengan CHECK constraint di DB)
// ────────────────────────────────────────────────────────────

export const PRODUCT_CATEGORIES = ['limbah-padat', 'limbah-cair', 'produk-turunan']

export const STORE_CATEGORIES = [
  'Sereh Wangi',
  'Nilam',
  'Cengkeh',
  'Kayu Putih',
  'Pala',
  'Gaharu',
  'Cendana',
  'Pinus',
  'Campuran / Multi Komoditas',
  'Produk Turunan (Briket, Kompos, dll)',
  'Lainnya',
]

export const COURIER_OPTIONS = ['jne', 'jnt', 'sicepat']

export const PAYMENT_METHODS = ['qris', 'transfer', 'cod']

export const TRANSACTION_STATUSES = [
  'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
]

// ────────────────────────────────────────────────────────────
// 1. SELLER PROFILE SCHEMA
//    Dipakai di: BecomeSellerPage.jsx → INSERT seller_profiles
// ────────────────────────────────────────────────────────────

export const SellerProfileSchema = z.object({
  user_id: z
    .string()
    .uuid({ message: 'user_id harus berupa UUID yang valid' }),

  store_name: z
    .string()
    .min(3, { message: 'Nama toko minimal 3 karakter' })
    .max(100, { message: 'Nama toko maksimal 100 karakter' })
    .trim(),

  category: z
    .enum(STORE_CATEGORIES, {
      errorMap: () => ({ message: 'Pilih kategori komoditas yang tersedia' }),
    }),

  description: z
    .string()
    .max(500, { message: 'Deskripsi maksimal 500 karakter' })
    .trim()
    .optional()
    .nullable()
    .transform((val) => (val?.trim() === '' ? null : val)),

  address: z
    .string()
    .max(200, { message: 'Alamat maksimal 200 karakter' })
    .trim()
    .optional()
    .nullable()
    .transform((val) => (val?.trim() === '' ? null : val)),
})

// ────────────────────────────────────────────────────────────
// 2. PRODUCT SCHEMA
//    Dipakai di: SellerDashboardPage.jsx → INSERT products
// ────────────────────────────────────────────────────────────

export const ProductSchema = z.object({
  seller_id: z
    .string()
    .uuid({ message: 'seller_id harus berupa UUID yang valid' }),

  name: z
    .string()
    .min(3, { message: 'Nama limbah minimal 3 karakter' })
    .max(200, { message: 'Nama limbah maksimal 200 karakter' })
    .trim(),

  category: z
    .enum(PRODUCT_CATEGORIES, {
      errorMap: () => ({
        message: 'Kategori harus salah satu dari: limbah-padat, limbah-cair, produk-turunan',
      }),
    }),

  price: z
    .number({ invalid_type_error: 'Harga harus berupa angka' })
    .min(0, { message: 'Harga tidak boleh negatif' })
    .max(999_999_999_99, { message: 'Harga terlalu besar' }),

  stock: z
    .number({ invalid_type_error: 'Stok harus berupa angka' })
    .int({ message: 'Stok harus bilangan bulat' })
    .min(0, { message: 'Stok tidak boleh negatif' }),

  unit: z
    .enum(['kg', 'liter', 'pcs'], {
      errorMap: () => ({ message: 'Satuan harus: kg, liter, atau pcs' }),
    })
    .default('kg'),

  moq: z
    .number({ invalid_type_error: 'MOQ harus berupa angka' })
    .int({ message: 'MOQ harus bilangan bulat' })
    .min(1, { message: 'MOQ minimal 1' })
    .default(1),

  description: z
    .string()
    .max(2000, { message: 'Deskripsi maksimal 2000 karakter' })
    .optional()
    .nullable()
    .transform((val) => (val?.trim() === '' ? null : val?.trim())),

  image_url: z
    .string()
    .url({ message: 'URL gambar tidak valid' })
    .optional()
    .nullable(),

  plant: z
    .string()
    .max(100, { message: 'Nama tanaman maksimal 100 karakter' })
    .optional()
    .nullable(),

  is_featured: z
    .boolean()
    .default(false),

  is_wholesale: z
    .boolean()
    .default(false),

  wholesale_min_qty: z
    .number()
    .int()
    .min(1, { message: 'Minimal qty grosir minimal 1' })
    .optional()
    .nullable(),

  wholesale_price: z
    .number()
    .min(0, { message: 'Harga grosir tidak boleh negatif' })
    .optional()
    .nullable(),

  specs: z
    .record(z.string(), z.union([z.string(), z.number(), z.null()]))
    .optional()
    .nullable(),

  solutions: z
    .array(z.string().max(100))
    .max(20, { message: 'Maksimal 20 solusi' })
    .default([]),
})
  // Cross-field validation: kalau is_wholesale = true, wajib ada wholesale_min_qty
  .refine(
    (data) => !data.is_wholesale || (data.wholesale_min_qty != null && data.wholesale_min_qty >= 1),
    {
      message: 'Minimal qty grosir wajib diisi jika produk tersedia grosir',
      path: ['wholesale_min_qty'],
    }
  )
  .refine(
    (data) => !data.is_wholesale || (data.wholesale_price != null && data.wholesale_price >= 0),
    {
      message: 'Harga grosir wajib diisi jika produk tersedia grosir',
      path: ['wholesale_price'],
    }
  )
  .refine(
    (data) =>
      !data.is_wholesale ||
      !data.wholesale_price ||
      data.wholesale_price < data.price,
    {
      message: 'Harga grosir harus lebih rendah dari harga normal',
      path: ['wholesale_price'],
    }
  )

// ────────────────────────────────────────────────────────────
// 3. CHECKOUT / SHIPPING SCHEMA
//    Dipakai di: CheckoutForm.jsx → sebelum INSERT transactions
// ────────────────────────────────────────────────────────────

export const ShippingSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nama penerima minimal 2 karakter' })
    .max(200, { message: 'Nama penerima maksimal 200 karakter' })
    .trim(),

  phone: z
    .string()
    .regex(/^\d{9,15}$/, { message: 'Nomor telepon tidak valid (9–15 digit angka)' })
    .trim(),

  address: z
    .string()
    .min(10, { message: 'Alamat terlalu singkat, minimal 10 karakter' })
    .max(500, { message: 'Alamat maksimal 500 karakter' })
    .trim(),

  city: z
    .string()
    .min(2, { message: 'Kota/Kabupaten minimal 2 karakter' })
    .max(100, { message: 'Kota/Kabupaten maksimal 100 karakter' })
    .trim(),

  postalCode: z
    .string()
    .regex(/^\d{5}$/, { message: 'Kode pos harus 5 digit angka' })
    .trim(),

  courier: z
    .enum(COURIER_OPTIONS, {
      errorMap: () => ({ message: 'Pilih jasa pengiriman yang tersedia (jne, jnt, sicepat)' }),
    }),

  courierCost: z
    .number()
    .int()
    .min(0),
})

// ────────────────────────────────────────────────────────────
// 4. TRANSACTION ITEM SCHEMA
//    Dipakai saat insert ke transaction_items
// ────────────────────────────────────────────────────────────

export const TransactionItemSchema = z.object({
  product_id: z
    .string()
    .uuid({ message: 'product_id harus UUID yang valid' }),

  product_name: z
    .string()
    .min(1)
    .max(200),

  product_price: z
    .number()
    .min(0, { message: 'Harga produk tidak boleh negatif' }),

  quantity: z
    .number()
    .int()
    .min(1, { message: 'Kuantitas minimal 1' }),

  subtotal: z
    .number()
    .min(0),
})
  .refine(
    (data) => Math.abs(data.subtotal - data.product_price * data.quantity) < 0.01,
    {
      message: 'Subtotal tidak sesuai (harga × kuantitas)',
      path: ['subtotal'],
    }
  )

// ────────────────────────────────────────────────────────────
// 5. FULL TRANSACTION SCHEMA
//    Menggabungkan shipping + payment + items
//    Dipakai sebelum INSERT transactions + transaction_items
// ────────────────────────────────────────────────────────────

export const FullTransactionSchema = z.object({
  buyer_id: z
    .string()
    .uuid({ message: 'buyer_id harus UUID yang valid' }),

  order_code: z
    .string()
    .regex(/^AL-\d{6}$/, { message: 'Format order code harus AL-XXXXXX' }),

  // Data pengiriman (snake_case untuk insert ke DB)
  recipient_name: z.string().min(2).max(200).trim(),
  phone:          z.string().regex(/^\d{9,15}$/),
  address:        z.string().min(10).max(500).trim(),
  city:           z.string().min(2).max(100).trim(),
  postal_code:    z.string().regex(/^\d{5}$/),
  courier:        z.enum(COURIER_OPTIONS),
  courier_cost:   z.number().int().min(0),

  // Pembayaran
  payment_method: z.enum(PAYMENT_METHODS, {
    errorMap: () => ({ message: 'Metode pembayaran tidak valid' }),
  }),

  subtotal: z.number().min(0),
  total:    z.number().min(0),

  items: z
    .array(TransactionItemSchema)
    .min(1, { message: 'Transaksi harus memiliki minimal 1 item' }),
})
  // Validasi: total = subtotal + courier_cost
  .refine(
    (data) => Math.abs(data.total - (data.subtotal + data.courier_cost)) < 1,
    {
      message: 'Total tidak sesuai (subtotal + ongkir)',
      path: ['total'],
    }
  )

// ────────────────────────────────────────────────────────────
// 6. HELPER: Transform ShippingData (camelCase) → DB format (snake_case)
//    Dipakai di CheckoutPage sebelum insert
// ────────────────────────────────────────────────────────────

/**
 * Transformasi data dari form CheckoutForm ke format insert DB transactions.
 * @param {object} shippingData - Data dari state CheckoutPage
 * @param {string} paymentMethod - Metode pembayaran yang dipilih
 * @param {number} subtotal - Subtotal dari cart
 * @param {string} buyerId - UUID user yang login
 * @param {string} orderId - Order code (AL-XXXXXX)
 * @param {Array}  cartItems - Items dari CartContext
 */
export function buildTransactionPayload(
  shippingData,
  paymentMethod,
  subtotal,
  buyerId,
  orderId,
  cartItems
) {
  const total = subtotal + (shippingData.courierCost ?? 0)

  const transaction = {
    buyer_id:       buyerId,
    order_code:     orderId,
    recipient_name: shippingData.name,
    phone:          shippingData.phone,
    address:        shippingData.address,
    city:           shippingData.city,
    postal_code:    shippingData.postalCode,   // camelCase → snake_case
    courier:        shippingData.courier,
    courier_cost:   shippingData.courierCost,
    payment_method: paymentMethod,
    subtotal,
    total,
  }

  const items = cartItems.map((item) => ({
    product_id:    item.product.id,
    product_name:  item.product.name,
    product_price: item.product.price,
    quantity:      item.quantity,
    subtotal:      item.product.price * item.quantity,
  }))

  return { transaction, items }
}

// ────────────────────────────────────────────────────────────
// 7. TYPE-SAFE PARSE HELPERS (opsional tapi dianjurkan)
// ────────────────────────────────────────────────────────────

/**
 * Parse & validasi data seller profile sebelum insert ke DB.
 * Throws ZodError jika invalid.
 */
export function parseSellerProfile(data) {
  return SellerProfileSchema.parse(data)
}

/**
 * Parse & validasi data produk sebelum insert ke DB.
 * Throws ZodError jika invalid.
 */
export function parseProduct(data) {
  return ProductSchema.parse(data)
}

/**
 * Parse & validasi data checkout sebelum insert ke DB.
 * Throws ZodError jika invalid.
 */
export function parseFullTransaction(data) {
  return FullTransactionSchema.parse(data)
}

// ────────────────────────────────────────────────────────────
// CONTOH PENGGUNAAN di SellerDashboardPage.jsx:
// ────────────────────────────────────────────────────────────
/*
  import { parseProduct } from '../lib/validations'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Validasi dengan Zod SEBELUM kirim ke Supabase
      const validated = parseProduct({
        seller_id:   user.id,
        name:        name.trim(),
        description: description.trim() || null,
        price:       Number(price),
        stock:       Number(stock),
        unit:        'kg',          // ← tambahkan field ini!
        category,
        moq:         Number(moq) || 1,
      })

      const { error } = await supabase
        .from('products')
        .insert(validated)

      if (error) throw error
      // ...
    } catch (err) {
      if (err.name === 'ZodError') {
        // Tampilkan error validasi dari Zod
        setFormError(err.errors.map(e => e.message).join(', '))
      } else {
        setFormError(`Gagal menambahkan produk: ${err.message}`)
      }
    }
  }
*/
