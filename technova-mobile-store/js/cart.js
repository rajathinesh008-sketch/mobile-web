/* ============================================================
   TECHNOVA — Cart & wishlist logic (localStorage backed)
   ============================================================ */

const FREE_DELIVERY_ABOVE = 49999;
const DELIVERY_FEE = 499;
const MAX_QTY = 10;

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(Number(amount) || 0);
}

function getAllProducts() {
  return [...TECHNOVA_PRODUCTS, ...TECHNOVA_ACCESSORIES];
}

function getProductById(id) {
  return getAllProducts().find(product => product.id === id) || null;
}

class TechnovaStore {
  constructor() {
    this.cartKey = 'technova_cart_v1';
    this.wishlistKey = 'technova_wishlist_v1';
    this.items = this._load(this.cartKey)
      .filter(item => item && typeof item.id === 'string' && Number.isFinite(item.qty));
    this.wishlist = this._load(this.wishlistKey)
      .filter(id => typeof id === 'string' && !!getProductById(id));
  }

  _load(key) {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Technova: could not read saved data.', error);
      return [];
    }
  }

  _save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Technova: could not persist data.', error);
    }
  }

  _saveCart() { this._save(this.cartKey, this.items); }
  _saveWishlist() { this._save(this.wishlistKey, this.wishlist); }

  static makeKey(id, color, storage) {
    return [id, color || '', storage || ''].join('|');
  }

  /* ---------- Cart ---------- */
  addToCart(id, qty = 1, options = {}) {
    const product = getProductById(id);
    if (!product) return { ok: false, reason: 'Product not found' };

    const key = TechnovaStore.makeKey(id, options.color, options.storage);
    const existing = this.items.find(item => item.key === key);
    if (existing) {
      existing.qty = Math.min(MAX_QTY, existing.qty + Math.max(1, Number(qty) || 1));
    } else {
      this.items.push({
        key, id, qty: Math.min(MAX_QTY, Math.max(1, Number(qty) || 1)),
        color: options.color || '', storage: options.storage || ''
      });
    }
    this._saveCart();
    return { ok: true, product };
  }

  removeFromCart(key) {
    this.items = this.items.filter(item => item.key !== key);
    this._saveCart();
  }

  updateQuantity(key, qty) {
    const item = this.items.find(entry => entry.key === key);
    if (!item) return;
    const next = Math.max(1, Math.min(MAX_QTY, Number(qty) || 1));
    item.qty = next;
    this._saveCart();
  }

  clearCart() { this.items = []; this._saveCart(); }

  cartCount() { return this.items.reduce((sum, item) => sum + item.qty, 0); }

  cartLines() {
    return this.items.map(item => {
      const product = getProductById(item.id);
      return product ? { ...item, product, lineTotal: product.price * item.qty } : null;
    }).filter(Boolean);
  }

  subtotal() {
    return this.cartLines().reduce((sum, line) => sum + line.lineTotal, 0);
  }

  deliveryCharge() {
    if (!this.items.length) return 0;
    return this.subtotal() >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  }

  grandTotal() { return this.subtotal() + this.deliveryCharge(); }

  /* ---------- Wishlist ---------- */
  toggleWishlist(id) {
    if (!getProductById(id)) return { ok: false };
    const index = this.wishlist.indexOf(id);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this._saveWishlist();
      return { ok: true, added: false };
    }
    this.wishlist.push(id);
    this._saveWishlist();
    return { ok: true, added: true };
  }

  removeFromWishlist(id) {
    this.wishlist = this.wishlist.filter(entry => entry !== id);
    this._saveWishlist();
  }

  isWishlisted(id) { return this.wishlist.includes(id); }
  wishlistCount() { return this.wishlist.length; }
  wishlistLines() {
    return this.wishlist.map(id => getProductById(id)).filter(Boolean);
  }
}

window.formatINR = formatINR;
window.getAllProducts = getAllProducts;
window.getProductById = getProductById;
window.TechnovaStore = new TechnovaStore();
