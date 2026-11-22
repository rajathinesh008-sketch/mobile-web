# TECHNOVA — Premium Mobile Store

A premium, fully responsive smartphone e-commerce frontend built with **HTML5, CSS3 and Vanilla JavaScript**. TECHNOVA is designed to look and feel like a modern international electronics brand, with a dark theme, electric-blue highlights, glassmorphism surfaces and polished micro-interactions.

> ⚠️ **Important:** This is a **frontend demonstration project**. Cart, wishlist, checkout, sign-in, contact and newsletter features run locally in the browser only. There is **no backend, no real payments, no order processing and no emails are sent**. All products, prices, specifications, reviews and contact details are fictional sample data created for demonstration purposes.

---

## ✨ Main Features

- Modern sticky navigation with transparent-to-solid scroll transition, animated links and responsive hamburger menu
- Immersive full-screen hero with animated phone presentation, floating chips and CTA buttons
- Six interactive shop-by-category cards
- Featured smartphone catalogue with **8 products** and rich product cards
- Accessories collection with **6 products** sharing the same cart system
- Functional product discovery: live search, brand filter, price-range filter, availability filter and multiple sort modes
- Empty-state message when no products match
- Exclusive deals section with three promotional banners and a clearly labelled **demo countdown timer**
- "Why Shop With Us" feature cards
- Product details modal with gallery, colour swatches, storage options, quantity selector and animated open/close
- Shopping cart drawer with quantity controls, subtotal, delivery charge, grand total and localStorage persistence
- Wishlist drawer with save, remove and move-to-cart actions (also persisted locally)
- Customer review carousel with previous/next controls and pagination dots
- Newsletter form with email validation and success toast
- Contact section with fictional details and a validated contact form
- Demo account panel with local validation
- Toast notifications, back-to-top button, scroll-reveal animations using `IntersectionObserver`
- Keyboard accessibility, visible focus rings, Escape-key support and `prefers-reduced-motion` handling

---

## 🛠 Technologies Used

| Layer | Technology |
| --- | --- |
| Markup | HTML5 (semantic elements, accessible forms, SEO & Open Graph metadata) |
| Styling | CSS3 (custom properties, Flexbox, Grid, animations, media queries) |
| Logic | Vanilla JavaScript (ES6+, modules via separate files, no frameworks) |
| Icons | Inline SVG icon sprite (no external icon CDN dependency) |
| Fonts | Google Fonts — Inter, Poppins, Space Grotesk |
| Imagery | Locally generated SVG product illustrations (no broken external images) |
| Persistence | Browser `localStorage` |

No React, Angular, Vue, Bootstrap, Tailwind or jQuery is used.

---

## 📁 Project Structure

```
technova-mobile-store/
├── index.html                  # Complete semantic markup for all 14 sections
├── css/
│   └── style.css               # Design system, components, animations, breakpoints
├── js/
│   ├── products.js             # Product, accessory, category & review data
│   ├── cart.js                 # Cart + wishlist logic and localStorage persistence
│   └── script.js               # Rendering, filters, modals, drawers, forms, effects
├── assets/
│   ├── images/                 # SVG phone, accessory and avatar illustrations
│   └── icons/
│       └── favicon.svg         # Brand favicon
└── README.md                   # This documentation
```

The product visuals in `assets/images/` are **stylized vector illustrations** generated for this demo. They are deliberately generic so that no real product model is misrepresented. Swap them with properly licensed product photography before any real-world use.

---

## 🚀 Installation & Running

### Option 1 — VS Code Live Server (recommended)

1. Install the **Live Server** extension in Visual Studio Code.
2. Open the `technova-mobile-store` folder in VS Code.
3. Right-click `index.html` and choose **"Open with Live Server"**.
4. Your browser opens the site (usually at `http://127.0.0.1:5500`).

### Option 2 — Any static server

From inside the project folder, run one of:

```bash
# Node.js
npx serve .

# Python
python -m http.server 8000
```

Then visit `http://localhost:8000`.

> Opening `index.html` directly with `file://` will display the site, but some browsers restrict `localStorage` on local files. Use a local server for full cart persistence.

---

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)
- Modern mobile browsers (iOS Safari, Chrome Android)

Requires JavaScript and CSS custom property support. Responsive layouts are tested conceptually for 1920px, 1440px, 1024px, 768px, 425px, 375px and 320px viewports.

---

## 🧪 Testing Checklist

- Add / remove products, change quantities, verify totals and delivery charge
- Reload the page — cart and wishlist should persist
- Search, filter, sort and clear filters
- Open product details, switch gallery images, colours and storage, change quantity
- Toggle wishlist from cards and the modal
- Navigate the review carousel with buttons and dots
- Submit newsletter, contact and account forms with invalid then valid data
- Open the mobile menu at narrow widths and press Escape to close overlays

---

## 🔮 Future Improvements

- Real backend API for catalogue, authentication, orders and payments
- Server-side search, pagination and faceted filtering
- User accounts with saved addresses and order history
- Real product photography with per-variant images
- Multi-language and multi-currency support
- Unit/integration tests and accessibility audit automation

---

**© 2026 TECHNOVA. All Rights Reserved.**
