/* ============================================================
   TECHNOVA — Main application
   ============================================================ */
(() => {
  'use strict';

  const store = window.TechnovaStore;
  const $  = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const state = {
    search: '', brand: 'all', price: 'all', sort: 'featured', availability: 'all',
    accessoryCategory: 'all'
  };

  const modalContext = { product: null, color: '', storage: '', qty: 1, lastFocused: null };
  let reviewIndex = 0;
  let perView = 3;

  /* ---------- Small helpers ---------- */
  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const discountOf = (p) => Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  const stockLabel = (p) => p.stock === 'low-stock' ? 'Low Stock' : 'In Stock';

  function stars(rating) {
    const filled = Math.round(rating);
    let html = '<span class="review-stars" aria-label="' + rating + ' out of 5 stars">';
    for (let i = 1; i <= 5; i++) html += icon(i <= filled ? 'star-fill' : 'star');
    return html + '</span>';
  }

  function ratingLine(rating, count) {
    return `<div class="rating" aria-label="Rated ${rating} out of 5 from ${count} reviews">${icon('star-fill')} <strong>${rating.toFixed(1)}</strong> <span class="rating-count">(${count})</span></div>`;
  }

  function showToast(message, type = 'success') {
    const container = $('#toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = icon(type === 'error' ? 'close' : type === 'info' ? 'sparkle' : 'check') + `<span></span>`;
    $('span', toast).textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 420);
    }, 3400);
  }

  function syncBodyScroll() {
    const anyOpen = !!$('.modal-overlay.open') || !!$('.drawer-overlay.open');
    document.body.classList.toggle('no-scroll', anyOpen);
  }

  /* ---------- Product rendering ---------- */
  function productCardHTML(product, accessory = false) {
    const discount = discountOf(product);
    return `
      <article class="product-card" data-product-card="${product.id}">
        <div class="product-image">
          <span class="discount-pill">${discount}% OFF</span>
          <span class="stock-pill ${product.stock === 'low-stock' ? 'low' : ''}">${stockLabel(product)}</span>
          <img src="${product.image}" alt="Stylized illustration of ${product.name}" loading="lazy"
               onerror="this.onerror=null;this.src='${accessory ? 'assets/images/acc-case.svg' : 'assets/images/phone-iphone.svg'}'" />
          <button class="wish-btn ${store.isWishlisted(product.id) ? 'active' : ''}" type="button"
                  data-action="wish" data-id="${product.id}" data-wish-id="${product.id}"
                  aria-label="${store.isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}: ${product.name}"
                  aria-pressed="${store.isWishlisted(product.id)}" title="Wishlist">${icon('heart')}</button>
        </div>
        <div class="product-body">
          <span class="product-brand">${product.brand}</span>
          <h3 class="product-name">${product.name}</h3>
          ${ratingLine(product.rating, product.reviews)}
          <div class="product-specs">${product.specs.slice(0, accessory ? 3 : 4).map(s => `<span>${s}</span>`).join('')}</div>
          <div class="product-price">
            <span class="price">${formatINR(product.price)}</span>
            <del class="old-price">${formatINR(product.oldPrice)}</del>
          </div>
          <div class="product-actions">
            <button class="btn btn-primary" type="button" data-action="add" data-id="${product.id}">${icon('cart')} Add to Cart</button>
          </div>
          <button class="detail-btn" type="button" data-action="detail" data-id="${product.id}">${icon('eye')} View Details</button>
        </div>
      </article>`;
  }

  function getFilteredProducts() {
    let list = [...TECHNOVA_PRODUCTS];

    if (state.search) {
      const term = state.search.toLowerCase();
      list = list.filter(p => `${p.brand} ${p.name}`.toLowerCase().includes(term));
    }
    if (state.brand !== 'all') list = list.filter(p => p.brand === state.brand);
    if (state.availability !== 'all') list = list.filter(p => p.stock === state.availability);
    if (state.price !== 'all') {
      const [min, max] = state.price.split('-').map(Number);
      list = list.filter(p => p.price >= min && p.price <= max);
    }

    switch (state.sort) {
      case 'low-high': list.sort((a, b) => a.price - b.price); break;
      case 'high-low': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews); break;
      case 'discount': list.sort((a, b) => discountOf(b) - discountOf(a)); break;
      default: break;
    }
    return list;
  }

  function renderProducts() {
    const grid = $('#productGrid');
    const list = getFilteredProducts();
    grid.innerHTML = list.map(p => productCardHTML(p)).join('');
    $('#resultsCount').textContent = `Showing ${list.length} of ${TECHNOVA_PRODUCTS.length} products`;
    $('#noResults').hidden = list.length > 0;
  }

  function renderAccessories() {
    const list = state.accessoryCategory === 'all'
      ? TECHNOVA_ACCESSORIES
      : TECHNOVA_ACCESSORIES.filter(p => p.category === state.accessoryCategory);

    $('#accessoriesGrid').innerHTML = list.map(p => productCardHTML(p, true)).join('');

    const notice = $('#accessoryNotice');
    if (notice) {
      notice.hidden = state.accessoryCategory === 'all';
      if (state.accessoryCategory !== 'all') {
        $('[data-notice-text]', notice).textContent = `Showing: ${state.accessoryCategory}`;
      }
    }
  }

  function refreshWishButtons(id) {
    const active = store.isWishlisted(id);
    $$( `[data-wish-id="${id}"]` ).forEach(btn => {
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('aria-label', `${active ? 'Remove from' : 'Add to'} wishlist: ${getProductById(id)?.name || 'product'}`);
    });
  }

  function refreshAllWishButtons() {
    $$('[data-wish-id]').forEach(btn => refreshWishButtons(btn.dataset.wishId));
  }

  /* ---------- Badges ---------- */
  function updateBadges() {
    const cart = store.cartCount();
    const wish = store.wishlistCount();
    const cartBadge = $('#cartBadge');
    const wishBadge = $('#wishlistBadge');
    cartBadge.textContent = cart;
    cartBadge.hidden = cart === 0;
    wishBadge.textContent = wish;
    wishBadge.hidden = wish === 0;
  }

  /* ---------- Cart & wishlist drawers ---------- */
  function cartLineHTML(line) {
    return `
      <div class="drawer-item">
        <div class="drawer-item-img"><img src="${line.product.image}" alt="${line.product.name}" /></div>
        <div class="drawer-item-info">
          <h4>${line.product.name}</h4>
          <small>${[line.color, line.storage].filter(Boolean).join(' · ') || line.product.brand}</small>
          <span class="unit-price">${formatINR(line.product.price)} each</span>
          <div class="drawer-item-bottom">
            <div class="mini-qty">
              <button type="button" data-action="qty" data-key="${line.key}" data-step="-1" aria-label="Decrease quantity">${icon('minus')}</button>
              <span>${line.qty}</span>
              <button type="button" data-action="qty" data-key="${line.key}" data-step="1" aria-label="Increase quantity">${icon('plus')}</button>
            </div>
            <span class="line-total">${formatINR(line.lineTotal)}</span>
            <button class="remove-btn" type="button" data-action="remove" data-key="${line.key}" aria-label="Remove ${line.product.name} from cart" title="Remove">${icon('trash')}</button>
          </div>
        </div>
      </div>`;
  }

  function renderCart() {
    const lines = store.cartLines();
    const list = $('#cartItems');
    $('#cartSubtitle').textContent = `${store.cartCount()} item${store.cartCount() === 1 ? '' : 's'}`;
    $('#cartFoot').hidden = lines.length === 0;

    if (!lines.length) {
      list.innerHTML = `<div class="drawer-empty">${icon('cart')}<h3>Your cart is empty</h3><p>Browse our collection and add something you love.</p><button class="btn btn-primary" type="button" data-action="close-cart">Start Shopping</button></div>`;
    } else {
      list.innerHTML = lines.map(cartLineHTML).join('');
    }

    $('#cartSubtotal').textContent = formatINR(store.subtotal());
    $('#cartDelivery').textContent = store.deliveryCharge() === 0 ? 'FREE' : formatINR(store.deliveryCharge());
    $('#cartTotal').textContent = formatINR(store.grandTotal());
    updateBadges();
  }

  function wishlistLineHTML(product) {
    return `
      <div class="drawer-item">
        <div class="drawer-item-img"><img src="${product.image}" alt="${product.name}" /></div>
        <div class="drawer-item-info">
          <h4>${product.name}</h4>
          <small>${product.brand}</small>
          <span class="unit-price">${formatINR(product.price)}</span>
          <div class="drawer-item-bottom">
            <button class="btn btn-outline" style="min-height:34px;padding:6px 12px;font-size:.76rem" type="button" data-action="move-to-cart" data-id="${product.id}">${icon('cart')} Move to Cart</button>
            <button class="remove-btn" type="button" data-action="wish-remove" data-id="${product.id}" aria-label="Remove ${product.name} from wishlist" title="Remove">${icon('trash')}</button>
          </div>
        </div>
      </div>`;
  }

  function renderWishlist() {
    const lines = store.wishlistLines();
    $('#wishlistSubtitle').textContent = `${lines.length} saved item${lines.length === 1 ? '' : 's'}`;
    $('#wishlistItems').innerHTML = lines.length
      ? lines.map(wishlistLineHTML).join('')
      : `<div class="drawer-empty">${icon('heart')}<h3>Nothing saved yet</h3><p>Tap the heart on any product to save it here.</p><button class="btn btn-primary" type="button" data-action="close-wishlist">Browse Products</button></div>`;
    refreshAllWishButtons();
    updateBadges();
  }

  function openOverlay(overlay, panel) {
    overlay.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      overlay.classList.add('open');
      panel.classList.add('open');
    });
    syncBodyScroll();
    const focusable = $('button, input, select, textarea, a[href]', panel);
    if (focusable) focusable.focus();
  }

  function closeOverlay(overlay, panel) {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!overlay.classList.contains('open')) overlay.hidden = true;
      syncBodyScroll();
    }, 320);
  }

  const openCart     = () => { renderCart(); openOverlay($('#cartOverlay'), $('#cartDrawer')); };
  const closeCart    = () => closeOverlay($('#cartOverlay'), $('#cartDrawer'));
  const openWishlist = () => { renderWishlist(); openOverlay($('#wishlistOverlay'), $('#wishlistDrawer')); };
  const closeWishlist= () => closeOverlay($('#wishlistOverlay'), $('#wishlistDrawer'));

  /* ---------- Product details modal ---------- */
  function openModal(product) {
    modalContext.product = product;
    modalContext.color = product.colors?.[0]?.name || '';
    modalContext.storage = product.storage?.[0] || '';
    modalContext.qty = 1;
    modalContext.lastFocused = document.activeElement;

    const discount = discountOf(product);
    $('#modalMainImage').src = product.gallery?.[0] || product.image;
    $('#modalMainImage').alt = `Stylized illustration of ${product.name}`;
    $('#modalBrand').textContent = product.brand;
    $('#modalTitle').textContent = product.name;
    $('#modalRating').innerHTML = `${stars(product.rating)} <span>${product.rating.toFixed(1)} · ${product.reviews} reviews</span>`;
    $('#modalPrice').textContent = formatINR(product.price);
    $('#modalOldPrice').textContent = formatINR(product.oldPrice);
    $('#modalDiscount').textContent = `${discount}% OFF`;
    $('#modalDesc').textContent = product.description;
    $('#modalSpecs').innerHTML = (product.highlights || product.specs.map((s, i) => [`Feature ${i + 1}`, s]))
      .map(([label, value]) => `<div><strong>${label}</strong><span>${value}</span></div>`).join('');
    $('#modalQty').textContent = '1';
    $('#modalWishlist').innerHTML = `${icon('heart')} ${store.isWishlisted(product.id) ? 'Remove From Wishlist' : 'Add To Wishlist'}`;

    $('#modalThumbs').innerHTML = (product.gallery || [product.image]).map((src, i) => `
      <button type="button" class="${i === 0 ? 'active' : ''}" data-gallery-index="${i}" aria-label="View image ${i + 1}">
        <img src="${src}" alt="${product.name} view ${i + 1}" loading="lazy" />
      </button>`).join('');

    $('#modalColors').innerHTML = (product.colors || []).map((c, i) => `
      <button type="button" class="swatch ${i === 0 ? 'active' : ''}" data-color="${c.name}" aria-label="${c.name}" title="${c.name}"><span style="background:${c.hex}"></span></button>`).join('');

    const storageWrap = $('#storageOption');
    if (product.storage?.length) {
      storageWrap.hidden = false;
      $('#modalStorage').innerHTML = product.storage.map((s, i) => `
        <button type="button" class="${i === 0 ? 'active' : ''}" data-storage="${s}">${s}</button>`).join('');
    } else {
      storageWrap.hidden = true;
      $('#modalStorage').innerHTML = '';
    }

    openOverlay($('#modalOverlay'), $('#productModal'));
    $('#modalClose').focus();
  }

  function closeModal() {
    closeOverlay($('#modalOverlay'), $('#productModal'));
    if (modalContext.lastFocused?.focus) setTimeout(() => modalContext.lastFocused.focus(), 80);
  }

  function openAccount() {
    openOverlay($('#accountOverlay'), $('.account-modal'));
    $('#accountEmail').focus();
  }
  function closeAccount() { closeOverlay($('#accountOverlay'), $('.account-modal')); }

  /* ---------- Reviews carousel ---------- */
  function computePerView() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 560) return 2;
    return 1;
  }

  function renderReviews() {
    $('#reviewTrack').innerHTML = TECHNOVA_REVIEWS.map(review => `
      <article class="review-card">
        <div class="review-top">
          <div class="review-avatar"><img src="${review.avatar}" alt="Avatar of ${review.name}" loading="lazy" /></div>
          <div class="review-person"><strong>${review.name}</strong><small>Verified Demo Customer</small></div>
        </div>
        ${stars(review.rating)}
        <p class="review-text">“${review.text}”</p>
        <div class="review-product">${icon('check')} Purchased: ${review.product}</div>
      </article>`).join('');
  }

  function updateCarousel() {
    perView = computePerView();
    const maxIndex = Math.max(0, TECHNOVA_REVIEWS.length - perView);
    reviewIndex = Math.min(reviewIndex, maxIndex);
    const track = $('#reviewTrack');
    const card = $('.review-card', track);
    if (card) {
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '20') || 20;
      const offset = reviewIndex * (card.getBoundingClientRect().width + gap);
      track.style.transform = `translateX(-${offset}px)`;
    }
    $('#reviewDots').innerHTML = Array.from({ length: maxIndex + 1 }, (_, i) =>
      `<button type="button" class="${i === reviewIndex ? 'active' : ''}" data-review-dot="${i}" aria-label="Go to review page ${i + 1}"></button>`).join('');
    $('#reviewPrev').disabled = reviewIndex === 0;
    $('#reviewNext').disabled = reviewIndex === maxIndex;
  }

  /* ---------- Demo countdown ---------- */
  function startCountdown() {
    let remaining = 8 * 3600 + 42 * 60 + 15;
    const total = remaining;
    const h = $('#cdHours'), m = $('#cdMinutes'), s = $('#cdSeconds');
    const pad = n => String(n).padStart(2, '0');
    function tick() {
      if (remaining <= 0) remaining = total;
      h.textContent = pad(Math.floor(remaining / 3600));
      m.textContent = pad(Math.floor((remaining % 3600) / 60));
      s.textContent = pad(remaining % 60);
      remaining--;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Forms ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setFieldError(input, message) {
    if (!input) return;
    input.classList.toggle('invalid', !!message);
    input.setAttribute('aria-invalid', String(!!message));
    const err = $(`[data-error-for="${input.id}"]`);
    if (err) { err.textContent = message; err.hidden = !message; }
  }

  function setupForms() {
    $('#newsletterForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = $('#newsletterEmail');
      const error = $('#newsletterError');
      const value = input.value.trim();
      if (!EMAIL_RE.test(value)) {
        error.textContent = 'Please enter a valid email address.';
        error.hidden = false;
        input.focus();
        return;
      }
      error.hidden = true;
      input.value = '';
      showToast('Demo subscription successful — no email was sent.');
    });

    $('#contactForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const fields = {
        contactName:  v => v.length >= 2 || 'Please enter your name (at least 2 characters).',
        contactEmail: v => EMAIL_RE.test(v) || 'Please enter a valid email address.',
        contactSubject: v => v.length >= 3 || 'Please enter a subject (at least 3 characters).',
        contactMessage: v => v.length >= 10 || 'Please write at least 10 characters.'
      };
      let valid = true;
      let firstInvalid = null;
      Object.entries(fields).forEach(([id, validator]) => {
        const input = $('#' + id);
        const result = validator(input.value.trim());
        setFieldError(input, result === true ? '' : result);
        if (result !== true && !firstInvalid) firstInvalid = input;
        if (result !== true) valid = false;
      });
      if (!valid) { firstInvalid?.focus(); return; }
      event.target.reset();
      showToast('Demo message validated — nothing was delivered to a business.');
    });

    $('#accountForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const email = $('#accountEmail');
      const password = $('#accountPassword');
      const error = $('#accountError');
      let message = '';
      if (!EMAIL_RE.test(email.value.trim())) message = 'Please enter a valid email address.';
      else if (password.value.length < 6) message = 'Password must be at least 6 characters.';
      error.textContent = message;
      error.hidden = !message;
      if (message) return;
      event.target.reset();
      closeAccount();
      showToast('Demo sign-in successful — no account data was stored.');
    });
  }

  /* ---------- Global delegated actions ---------- */
  function setupDelegatedActions() {
    document.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-action]');
      if (!btn) return;
      const { action, id, key, step } = btn.dataset;

      switch (action) {
        case 'add': {
          store.addToCart(id);
          updateBadges();
          showToast(`${getProductById(id).name} added to cart.`);
          break;
        }
        case 'wish': {
          const result = store.toggleWishlist(id);
          refreshWishButtons(id);
          updateBadges();
          if (result.added) showToast(`${getProductById(id).name} saved to wishlist.`);
          else showToast('Removed from wishlist.', 'info');
          if (!$('#wishlistDrawer').classList.contains('open')) renderWishlist();
          break;
        }
        case 'wish-remove': {
          store.removeFromWishlist(id);
          renderWishlist();
          refreshAllWishButtons();
          updateBadges();
          showToast('Removed from wishlist.', 'info');
          break;
        }
        case 'move-to-cart': {
          store.addToCart(id);
          store.removeFromWishlist(id);
          renderWishlist();
          refreshAllWishButtons();
          updateBadges();
          showToast(`${getProductById(id).name} moved to cart.`);
          break;
        }
        case 'detail': {
          const product = getProductById(id);
          if (product) openModal(product);
          break;
        }
        case 'qty': {
          const item = store.items.find(entry => entry.key === key);
          if (item) store.updateQuantity(key, item.qty + Number(step));
          renderCart();
          break;
        }
        case 'remove': {
          store.removeFromCart(key);
          renderCart();
          showToast('Item removed from cart.', 'info');
          break;
        }
        case 'close-cart': closeCart(); break;
        case 'close-wishlist': closeWishlist(); break;
        default: break;
      }
    });
  }

  /* ---------- Event wiring ---------- */
  function setupEvents() {
    // Mobile menu
    const menuToggle = $('#menuToggle');
    const primaryNav = $('#primaryNav');
    menuToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menuToggle.innerHTML = icon(open ? 'close' : 'menu');
    });
    $$('.nav-link').forEach(link => link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = icon('menu');
    }));

    // Nav icon buttons
    $('#cartToggle').addEventListener('click', openCart);
    $('#wishlistToggle').addEventListener('click', openWishlist);
    $('#accountToggle').addEventListener('click', openAccount);
    $('#searchToggle').addEventListener('click', () => {
      $('#smartphones').scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => $('#searchInput').focus({ preventScroll: true }), 500);
    });

    // Filters
    $('#searchInput').addEventListener('input', e => { state.search = e.target.value.trim(); renderProducts(); });
    $('#brandFilter').addEventListener('change', e => { state.brand = e.target.value; renderProducts(); });
    $('#priceFilter').addEventListener('change', e => { state.price = e.target.value; renderProducts(); });
    $('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });
    $('#availabilityFilter').addEventListener('change', e => { state.availability = e.target.value; renderProducts(); });

    function clearAllFilters() {
      state.search = ''; state.brand = 'all'; state.price = 'all';
      state.sort = 'featured'; state.availability = 'all';
      $('#searchInput').value = '';
      $('#brandFilter').value = 'all';
      $('#priceFilter').value = 'all';
      $('#sortSelect').value = 'featured';
      $('#availabilityFilter').value = 'all';
      renderProducts();
    }
    $('#clearFilters').addEventListener('click', clearAllFilters);
    $('#resetFilters').addEventListener('click', clearAllFilters);

    // Category navigation
    $$('.category-card').forEach(card => card.addEventListener('click', () => {
      const category = card.dataset.category;
      if (category === 'Smartphones') {
        state.accessoryCategory = 'all';
        renderAccessories();
        clearAllFilters();
        $('#smartphones').scrollIntoView({ behavior: 'smooth' });
        showToast('Explore our smartphone collection.', 'info');
      } else {
        state.accessoryCategory = category;
        renderAccessories();
        $('#accessories').scrollIntoView({ behavior: 'smooth' });
        showToast(`Showing ${category}.`, 'info');
      }
    }));

    // Accessory notice clear
    $('#accessoryNotice')?.addEventListener('click', (e) => {
      if (e.target.closest('[data-clear-category]')) {
        state.accessoryCategory = 'all';
        renderAccessories();
      }
    });

    // Offer links
    $$('[data-offer-category]').forEach(link => link.addEventListener('click', () => {
      const category = link.dataset.offerCategory;
      if (category === 'Accessories') {
        state.accessoryCategory = 'all';
        renderAccessories();
      } else {
        clearAllFilters();
      }
    }));

    // Drawer & modal close controls
    $('#cartClose').addEventListener('click', closeCart);
    $('#cartOverlay').addEventListener('click', closeCart);
    $('#continueShopping').addEventListener('click', closeCart);
    $('#wishlistClose').addEventListener('click', closeWishlist);
    $('#wishlistOverlay').addEventListener('click', closeWishlist);
    $('#wishlistContinue').addEventListener('click', closeWishlist);
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalOverlay').addEventListener('click', (e) => { if (e.target === $('#modalOverlay')) closeModal(); });
    $('#accountClose').addEventListener('click', closeAccount);
    $('#accountOverlay').addEventListener('click', (e) => { if (e.target === $('#accountOverlay')) closeAccount(); });

    // Checkout demo
    $('#checkoutBtn').addEventListener('click', () => {
      showToast('Demo checkout — no real order or payment is processed.', 'info');
    });

    // Modal controls
    $('#modalThumbs').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-gallery-index]');
      if (!btn) return;
      const product = modalContext.product;
      $('#modalMainImage').src = product.gallery[Number(btn.dataset.galleryIndex)];
      $$('#modalThumbs button').forEach(b => b.classList.toggle('active', b === btn));
    });
    $('#modalColors').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-color]');
      if (!btn) return;
      modalContext.color = btn.dataset.color;
      $$('#modalColors .swatch').forEach(b => b.classList.toggle('active', b === btn));
    });
    $('#modalStorage').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-storage]');
      if (!btn) return;
      modalContext.storage = btn.dataset.storage;
      $$('#modalStorage button').forEach(b => b.classList.toggle('active', b === btn));
    });
    $('#modalQtyMinus').addEventListener('click', () => {
      modalContext.qty = Math.max(1, modalContext.qty - 1);
      $('#modalQty').textContent = modalContext.qty;
    });
    $('#modalQtyPlus').addEventListener('click', () => {
      modalContext.qty = Math.min(10, modalContext.qty + 1);
      $('#modalQty').textContent = modalContext.qty;
    });
    $('#modalAddToCart').addEventListener('click', () => {
      if (!modalContext.product) return;
      store.addToCart(modalContext.product.id, modalContext.qty, {
        color: modalContext.color, storage: modalContext.storage
      });
      closeModal();
      updateBadges();
      showToast(`${modalContext.product.name} added to cart.`);
    });
    $('#modalWishlist').addEventListener('click', () => {
      const product = modalContext.product;
      if (!product) return;
      const result = store.toggleWishlist(product.id);
      refreshWishButtons(product.id);
      updateBadges();
      $('#modalWishlist').innerHTML = `${icon('heart')} ${result.added ? 'Remove From Wishlist' : 'Add To Wishlist'}`;
      showToast(result.added ? 'Saved to wishlist.' : 'Removed from wishlist.', result.added ? 'success' : 'info');
    });

    // Carousel
    $('#reviewPrev').addEventListener('click', () => { reviewIndex = Math.max(0, reviewIndex - 1); updateCarousel(); });
    $('#reviewNext').addEventListener('click', () => { reviewIndex = Math.min(TECHNOVA_REVIEWS.length - perView, reviewIndex + 1); updateCarousel(); });
    $('#reviewDots').addEventListener('click', (e) => {
      const dot = e.target.closest('[data-review-dot]');
      if (dot) { reviewIndex = Number(dot.dataset.reviewDot); updateCarousel(); }
    });

    // Back to top
    $('#backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Escape key closes overlays
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!$('#modalOverlay').hidden) closeModal();
      else if (!$('#accountOverlay').hidden) closeAccount();
      else if (!$('#cartOverlay').hidden) closeCart();
      else if (!$('#wishlistOverlay').hidden) closeWishlist();
      else if ($('#primaryNav').classList.contains('open')) {
        $('#primaryNav').classList.remove('open');
        $('#menuToggle').setAttribute('aria-expanded', 'false');
      }
    });

    // Scroll effects
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        $('#siteHeader').classList.toggle('scrolled', window.scrollY > 40);
        $('#backToTop').classList.toggle('visible', window.scrollY > 500);
        ticking = false;
      });
    }, { passive: true });

    // Resize carousel
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCarousel, 120);
    });

    // Image fallback safety net
    document.addEventListener('error', (e) => {
      const img = e.target;
      if (img.tagName !== 'IMG' || img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      img.src = img.src.includes('avatar') ? 'assets/images/avatar-a1.svg'
              : img.src.includes('acc-') ? 'assets/images/acc-case.svg'
              : 'assets/images/phone-iphone.svg';
    }, true);
  }

  /* ---------- Brand options & observers ---------- */
  function buildBrandOptions() {
    const brands = [...new Set(TECHNOVA_PRODUCTS.map(p => p.brand))];
    $('#brandFilter').insertAdjacentHTML('beforeend', brands.map(b => `<option value="${b}">${b}</option>`).join(''));
  }

  function createAccessoryNotice() {
    const notice = document.createElement('div');
    notice.id = 'accessoryNotice';
    notice.className = 'category-notice';
    notice.hidden = true;
    notice.innerHTML = `${icon('filter')} <span data-notice-text></span> <button type="button" data-clear-category>${icon('close')} Clear</button>`;
    $('#accessoriesGrid').before(notice);
  }

  function setupObservers() {
    const revealItems = $$('[data-reveal]');
    revealItems.forEach(el => {
      const siblings = [...el.parentElement.children].filter(child => child.hasAttribute('data-reveal'));
      const index = siblings.indexOf(el);
      el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 0.08}s`);
    });

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealItems.forEach(el => revealObserver.observe(el));

      const sectionIds = ['home', 'smartphones', 'accessories', 'deals', 'about', 'contact'];
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          $$('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        });
      }, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' });
      sectionIds.forEach(id => { const section = document.getElementById(id); if (section) sectionObserver.observe(section); });
    } else {
      revealItems.forEach(el => el.classList.add('visible'));
    }
  }

  /* ---------- Boot ---------- */
  function init() {
    buildBrandOptions();
    createAccessoryNotice();
    renderProducts();
    renderAccessories();
    renderReviews();
    renderCart();
    renderWishlist();
    updateBadges();
    setupDelegatedActions();
    setupEvents();
    setupForms();
    setupObservers();
    updateCarousel();
    startCountdown();
    syncBodyScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
