// VECTOR Market · swap item — zero dependencies.
// <section class="vm" data-assets="assets/"></section> becomes the whole grocery app: home and order #48217.
// The picker could not find the barista oat drink and offers one with no added sugar.
// "Accept replacement" slides the green carton onto the pale one, then the choice folds into the first row
// of "In the bag": the same photo lands there, the list rises, the total drops by the same −$0.20.
;(() => {
  'use strict';

  const svg = (d, o = {}) => `<svg width="${o.s || 18}" height="${o.s || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${o.w || 1.8}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const P = {
    home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
    shop: '<path d="M4 7h16l-1 4H5zM6 11v9h12v-9M10 15h4"/>',
    deals: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
    orders: '<path d="M5 7h14l-1 13H6zM9 7a3 3 0 0 1 6 0"/>',
    lists: '<path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1"/>',
    recipes: '<path d="M6 3h10l2 3v15H6zM9 9h6M9 13h6M9 17h3"/>',
    favs: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.4"/>',
    cart: '<path d="M3 4h3l2 11h11l2-8H7"/><circle cx="10" cy="19" r="1.4"/><circle cx="18" cy="19" r="1.4"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    swap: '<path d="M4 8h14l-4-4M20 16H6l4 4"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    cup: '<path d="M7 4h10l-1 16H8z M7 8h10"/>',
    tomato: '<circle cx="9" cy="14" r="4"/><circle cx="16" cy="11" r="4"/><path d="M16 7V4"/>',
    cheese: '<path d="M4 9l8-4 8 4v8l-8 3-8-3z M4 9l8 3 8-3 M12 12v8"/>',
  };
  const NAV = [['home', 'Home'], ['shop', 'Shop'], ['deals', 'Deals'], ['orders', 'Orders'], ['lists', 'Lists'], ['recipes', 'Recipes'], ['favs', 'Favourites'], ['help', 'Help']];
  const AGAIN = [
    ['strawberries', 'Strawberries 400 g', 'Bought 6 times', '$4.20'],
    ['sourdough', 'Rye sourdough 800 g', 'Baked this morning', '$5.80'],
    ['avocados', 'Ripe avocados × 3', 'Ready to eat', '$3.90'],
    ['eggs', 'Free-range eggs × 6', 'Bought 9 times', '$2.95'],
  ];
  const BAG = [['strawberries', 'Strawberries 400 g', 2, '$8.40'], ['sourdough', 'Rye sourdough 800 g', 1, '$5.80'], ['avocados', 'Ripe avocados × 3', 1, '$3.90'], ['eggs', 'Free-range eggs × 6', 2, '$5.90']];
  const TODO = [['cup', 'Greek yoghurt 500 g', 1, '$2.40'], ['tomato', 'Cherry tomatoes 250 g', 2, '$3.80'], ['cheese', 'Feta 200 g', 1, '$2.99']];
  // what the order says before and after the answer
  const STATE = {
    pending: { inBag: 14, items: '$59.69', swaps: '1 waiting', swapInk: 'var(--vm-tangerine-text)', total: '$64.18' },
    confirmed: { inBag: 15, items: '$59.49', swaps: '1 · −$0.20', swapInk: 'var(--vm-leaf)', total: '$63.98' },
  };

  class MarketApp {
    constructor(root) {
      this.root = root;
      const A = root.dataset.assets || 'assets/';
      const ph = (n, alt, cls = '', st = '') => `<span class="vm-ph ${cls}" style="${st}"><img src="${A}${n}.jpg" alt="${alt}"></span>`;
      const pair = (a, b, cls = '') => `<div class="vm-pair"><span class="vm-soft">${a}</span><span class="vm-num ${cls}">${b}</span></div>`;
      root.innerHTML = `
<nav class="vm-side" aria-label="Main">
  <div class="vm-logo"><svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><path d="M4 9h18l-2 13H6z" fill="none" stroke="#FF8A3D" stroke-width="2" stroke-linejoin="round"/><path d="M9 9V7a4 4 0 0 1 8 0v2" fill="none" stroke="#EDEAE3" stroke-width="2"/></svg><b>VECTOR</b><span>Market</span></div>
  ${NAV.map(([k, t]) => `<a class="vm-nav" href="#" data-nav="${k}">${svg(P[k])}${t}${k === 'orders' ? '<span class="vm-badge">1</span>' : ''}</a>`).join('')}
  <div class="vm-side-foot">
    <div class="vm-plus"><div class="vm-m" style="margin:0">VECTOR Plus</div><div class="vm-num" style="font-size:14px;font-weight:600;margin-top:2px">$38.40 saved on delivery</div><div class="vm-soft" style="font-size:12px;margin-top:4px">Renews Dec 12</div></div>
    <div class="vm-me"><span class="vm-av">NH</span><div><div style="font-size:13.5px;font-weight:600">Noor Haddad</div><div class="vm-soft" style="font-size:12px">14 Alder Street</div></div></div>
  </div>
</nav>
<div class="vm-col">
  <header class="vm-top">
    <label class="vm-search">${svg(P.search, { s: 16, w: 2 })}<input type="search" aria-label="Search" placeholder="Search 6,200 products"></label>
    <span class="vm-chip"><span style="color:var(--vm-tangerine);display:flex">${svg(P.pin, { s: 15, w: 2 })}</span>Home · 14 Alder St</span>
    <div class="vm-top-r">
      <button class="vm-ib" type="button" aria-label="Basket for next order, 2 items">${svg(P.cart, { s: 19 })}<span class="vm-ib-n vm-num">2</span></button>
      <button class="vm-ib" type="button" aria-label="Notifications">${svg(P.bell, { s: 19 })}<span class="vm-ib-dot"></span></button>
      <span class="vm-av">NH</span>
    </div>
  </header>
  <div class="vm-views">

    <div class="vm-view vm-home" data-view="home">
      <main class="vm-main">
        <div><h1 class="vm-h1">Good evening, Noor</h1><p class="vm-sub">Your order is being picked at VECTOR Market Riverside</p></div>
        <section class="vm-card vm-order" aria-label="Order in progress">
          <div class="vm-order-h">
            ${ph('picker-dana', 'Dana, your picker', 'vm-round', 'width:52px;height:52px')}
            <div style="flex:1;min-width:0"><div style="font-size:16px;font-weight:600">Dana is picking your order</div><div class="vm-num vm-soft" style="font-size:13px;margin-top:3px">Order #48217 · 18 items · $64.18</div></div>
            <div style="text-align:right"><div class="vm-soft" style="font-size:12.5px">Arriving today</div><div class="vm-num" style="font-size:20px;font-weight:600;margin-top:2px">18:30–19:00</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:14px"><div class="vm-track"><span style="transform:scaleX(.78)"></span></div><span class="vm-num" style="font-size:13px;color:var(--vm-ink-mid)">14 of 18 in the bag</span></div>
          <div style="display:flex;gap:22px"><span class="vm-step"><span class="vm-dot done"></span>Placed 16:52</span><span class="vm-step is-now"><span class="vm-dot now"></span>Picking</span><span class="vm-step"><span class="vm-dot"></span>On the way</span><span class="vm-step"><span class="vm-dot"></span>Delivered</span></div>
          <div class="vm-oos">
            ${ph('oat-barista', 'Barista oat drink', '', 'width:56px;height:56px')}
            <div style="flex:1;min-width:0"><div style="font-size:14.5px;font-weight:600">Barista Oat Drink 1 L is out of stock</div><div style="font-size:13px;color:var(--vm-tangerine-text);margin-top:3px">Dana suggests a replacement · reply within 9 min</div></div>
            <button class="vm-cta vm-review" type="button" data-review>Review replacement</button>
          </div>
        </section>
        <section aria-label="Buy again">
          <div class="vm-sec-h"><h2>Buy again</h2><a class="vm-link" href="#">See all 46</a></div>
          <div class="vm-again">${AGAIN.map(([n, t, m, p]) => `
            <article class="vm-card">${ph(n, t)}<div><div class="vm-t">${t}</div><div class="vm-m">${m}</div></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span class="vm-num" style="font-size:15px;font-weight:600">${p}</span><button class="vm-add" type="button" aria-label="Add ${t}">+</button></div></article>`).join('')}
          </div>
        </section>
        <section aria-label="Your lists">
          <div class="vm-sec-h"><h2>Your lists</h2><a class="vm-link" href="#">New list</a></div>
          <div class="vm-lists">
            <a class="vm-list" href="#"><span>Weekly basics</span><span class="vm-num vm-soft" style="font-size:13px;width:90px">14 items</span><span class="vm-num vm-soft" style="font-size:13px;width:110px">last Sun</span><span class="vm-num" style="font-size:13.5px;width:64px;text-align:right">$52.30</span></a>
            <a class="vm-list" href="#"><span>Sunday brunch for six</span><span class="vm-num vm-soft" style="font-size:13px;width:90px">9 items</span><span class="vm-num vm-soft" style="font-size:13px;width:110px">Nov 17</span><span class="vm-num" style="font-size:13.5px;width:64px;text-align:right">$38.75</span></a>
          </div>
        </section>
      </main>
      <aside class="vm-aside" aria-label="Delivery and budget">
        <section class="vm-card vm-box" style="gap:14px">
          <div class="vm-sec-h"><h2 style="font-size:15px">Delivery</h2><span class="vm-soft" style="font-size:12.5px">Today</span></div>
          <div style="display:flex;align-items:center;gap:12px">${ph('courier-sam', 'Sam, your courier', 'vm-round', 'width:40px;height:40px')}<div style="flex:1"><div style="font-size:13.5px;font-weight:600">Sam brings it by bike</div><div class="vm-soft" style="font-size:12px;margin-top:2px">Leaves the store at 18:15</div></div></div>
          <div style="display:flex;flex-direction:column;gap:8px">${pair('Window', '18:30–19:00')}${pair('Address', '14 Alder St, flat 6')}${pair('Drop-off', 'Hand to me')}</div>
        </section>
        <section class="vm-card vm-box">
          <div class="vm-sec-h"><h2 style="font-size:15px">November groceries</h2><span class="vm-soft vm-num" style="font-size:12.5px">of $500</span></div>
          <div class="vm-num" style="font-size:22px;font-weight:600">$412.60</div>
          <div class="vm-track" style="flex:none"><span style="transform:scaleX(.82);background:#C9A27A"></span></div>
          <div class="vm-soft" style="font-size:12.5px">5 orders · $87.40 left for 5 days</div>
        </section>
        <section class="vm-card vm-box">
          <div class="vm-sec-h"><h2 style="font-size:15px">Deals on your usuals</h2><a class="vm-link" href="#" style="font-size:12.5px">All</a></div>
          ${[['Greek yoghurt 500 g', '−25%', '$2.40'], ['Cherry tomatoes 250 g', '−20%', '$1.90'], ['Ground coffee 250 g', '2 for $9', '$5.20']].map(([a, b, c]) => `<div style="display:flex;align-items:center;gap:10px;font-size:13px"><span style="flex:1">${a}</span><span class="vm-num" style="color:var(--vm-leaf)">${b}</span><span class="vm-num" style="width:44px;text-align:right">${c}</span></div>`).join('')}
        </section>
        <section class="vm-card vm-box" style="gap:10px;font-size:13px">
          <div class="vm-sec-h"><h2 style="font-size:15px">Past orders</h2><a class="vm-link" href="#" style="font-size:12.5px">All 23</a></div>
          ${[['Nov 21', '22 items · on time', '$71.40'], ['Nov 14', '17 items · 1 swap', '$58.15'], ['Nov 8', '25 items · on time', '$83.90']].map(([a, b, c]) => `<div style="display:flex;gap:10px"><span class="vm-num vm-soft" style="width:52px">${a}</span><span style="flex:1">${b}</span><span class="vm-num">${c}</span></div>`).join('')}
        </section>
      </aside>
    </div>

    <div class="vm-view vm-ord" data-view="order">
      <main class="vm-main">
        <div class="vm-head">
          <div style="flex:1;min-width:0">
            <div class="vm-crumbs"><a href="#" data-nav="orders">Orders</a><span>/</span><span>Today</span></div>
            <h1 class="vm-num">Order #48217</h1>
            <div class="vm-num vm-soft" style="font-size:13.5px;margin-top:5px">Arriving 18:30–19:00 · 18 items · VECTOR Market Riverside</div>
          </div>
          <button class="vm-ghost" type="button">${svg(P.chat, { s: 15, w: 2 })}Message Dana</button>
          <button class="vm-ghost" type="button">Add items</button>
        </div>
        <div class="vm-progress">
          <span class="vm-step"><span class="vm-dot done"></span>Placed 16:52</span>
          <span class="vm-step is-now"><span class="vm-dot now"></span>Picking</span>
          <div class="vm-track"><span data-bar></span></div>
          <span class="vm-num" style="font-size:13px;color:var(--vm-ink-mid)"><span data-in-bag></span> of 18 in the bag</span>
          <span class="vm-step"><span class="vm-dot"></span>On the way</span>
        </div>
        <section class="vm-ask vm-if-wait" aria-label="Replacement for Barista Oat Drink" data-ask>
          <div class="vm-ask-h" style="display:flex;align-items:baseline;gap:12px"><h2 style="font-size:16px;font-weight:600;flex:1">1 item needs your OK</h2><span class="vm-num" style="font-size:13px;color:var(--vm-tangerine-text)">8:42 left to reply</span></div>
          <div class="vm-pick">
            <div class="vm-carton vm-old">
              <span class="vm-ph"><img src="${A}oat-barista.jpg" alt="Barista Oat Drink carton"><span class="vm-tag">Out of stock</span></span>
              <div><div style="font-size:14px;font-weight:600;color:var(--vm-ink-mid)">Barista Oat Drink</div><div class="vm-m" style="margin-top:3px">Northfield · 1 L</div><div class="vm-num vm-soft" style="font-size:14px;margin-top:4px">$3.49</div></div>
            </div>
            <div class="vm-arrow">${svg(P.swap, { s: 26, w: 2 })}</div>
            <div class="vm-carton vm-new" data-new>
              <span class="vm-ph"><img src="${A}oat-nosugar.jpg" alt="Meadow and Oak oat drink, no added sugar"><span class="vm-tag leaf">No added sugar</span></span>
              <div class="vm-new-cap"><div style="font-size:14px;font-weight:600;white-space:nowrap">Oat Drink, No Added Sugar</div><div class="vm-m" style="margin-top:3px">Meadow &amp; Oak · 1 L</div><div class="vm-num" style="font-size:14px;font-weight:600;margin-top:4px">$3.29 <span style="font-size:12.5px;font-weight:500;color:var(--vm-leaf);padding-left:4px">−$0.20</span></div></div>
            </div>
            <div class="vm-note">
              <div style="display:flex;gap:10px;align-items:flex-start">
                ${ph('picker-dana', 'Dana', 'vm-round', 'width:36px;height:36px')}
                <div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600">Dana <span class="vm-soft" style="font-weight:400">· 17:41</span></div><div style="font-size:13px;color:var(--vm-ink-mid);line-height:1.45;margin-top:3px">The barista one sold out this afternoon. This one is the same litre, no added sugar, best before Dec 14.</div></div>
              </div>
              <div class="vm-soft" style="display:flex;gap:16px;font-size:12.5px"><span>Shelf 7B</span><span class="vm-num">Best before Dec 14</span><span>Chilled</span></div>
              <div style="margin-top:auto;display:flex;flex-direction:column;gap:8px">
                <button class="vm-cta vm-accept" type="button" data-accept>Accept replacement</button>
                <div style="display:flex;gap:8px"><button class="vm-ghost" type="button" style="flex:1">Choose another</button><button class="vm-ghost" type="button" style="flex:1">Remove item</button></div>
              </div>
            </div>
          </div>
        </section>
        <section class="vm-bag" aria-label="Items" data-flip>
          <div class="vm-bag-h"><h2>In the bag</h2><span class="vm-num vm-soft" style="font-size:12.5px"><span data-in-bag></span> items</span></div>
          <div class="vm-swaprow vm-if-done" data-swap-row>
            ${ph('oat-nosugar', 'Meadow and Oak oat drink, no added sugar')}
            <div style="flex:1;min-width:0"><div style="font-size:15px;font-weight:600">Oat Drink, No Added Sugar</div><div class="vm-m" style="margin-top:3px">Meadow &amp; Oak · 1 L · instead of Barista Oat Drink</div></div>
            <span class="vm-ok">${svg(P.check, { s: 15, w: 2.6 })}Replacement confirmed</span>
            <span class="vm-num vm-price" style="font-weight:600">$3.29</span>
          </div>
          ${BAG.map(([n, t, q, p]) => `<div class="vm-row">${ph(n, t)}<span class="vm-row-t">${t}</span><span class="vm-num vm-qty">× ${q}</span><span class="vm-picked">Picked</span><span class="vm-num vm-price">${p}</span></div>`).join('')}
          <a class="vm-row vm-soft" href="#" style="height:48px;font-size:13.5px"><span class="vm-num" style="width:44px;text-align:center;flex:none">+10</span><span style="flex:1">Milk, bananas, pasta and 7 more picked items</span><span class="vm-num vm-price">$23.01</span></a>
          <div class="vm-if-done">
            <div class="vm-bag-h" style="padding-top:16px"><h2>Still to pick</h2><span class="vm-num vm-soft" style="font-size:12.5px">3 items · Dana is in dairy</span></div>
            ${TODO.map(([i, t, q, p]) => `<div class="vm-row"><span class="vm-todo">${svg(P[i])}</span><span class="vm-row-t" style="color:var(--vm-ink-mid)">${t}</span><span class="vm-num vm-qty">× ${q}</span><span class="vm-num vm-price" style="color:var(--vm-ink-mid)">${p}</span></div>`).join('')}
          </div>
        </section>
      </main>
      <aside class="vm-aside" aria-label="Picker and order total">
        <section class="vm-card vm-box" style="gap:14px">
          <div style="display:flex;align-items:center;gap:12px">${ph('picker-dana', 'Dana, your picker', 'vm-round', 'width:44px;height:44px')}<div style="flex:1"><div style="font-size:14px;font-weight:600">Dana Ruiz</div><div class="vm-num vm-soft" style="font-size:12.5px;margin-top:2px">Your picker · 4.9 · 1,240 orders</div></div></div>
          <div class="vm-bubble">Barista oat drink sold out, sent you a swap with no added sugar.</div>
          <div class="vm-bubble me vm-if-done">Accepted, thank you!<div class="vm-num" style="font-size:11.5px;color:var(--vm-tangerine-text);margin-top:4px">17:43 · seen</div></div>
          <div class="vm-msg vm-if-wait">Message Dana</div>
        </section>
        <section class="vm-card vm-box vm-sum" style="gap:10px" data-flip>
          <h2 style="margin-bottom:4px">Order total</h2>
          <div class="vm-pair"><span class="vm-soft">Items (18)</span><span class="vm-num" data-items data-tick></span></div>
          ${pair('Delivery', '$2.99')}
          ${pair('Service', '$1.50')}
          <div class="vm-pair"><span class="vm-soft">Replacements</span><span class="vm-num" data-swaps data-tick></span></div>
          <div style="border-top:1px solid var(--vm-well-line);padding-top:12px;margin-top:2px;display:flex;justify-content:space-between;align-items:baseline"><span style="font-weight:600">Total</span><span class="vm-num" style="font-size:20px;font-weight:600" data-total data-tick></span></div>
          <div class="vm-soft" style="font-size:12px">Card ending 4821 · charged after delivery</div>
        </section>
        <section class="vm-card vm-box vm-rule" style="gap:10px" data-flip>
          <h2 style="margin-bottom:2px">If something is out of stock</h2>
          <label><input type="radio" name="vm-oos" checked>Ask me first<span class="vm-soft" style="margin-left:auto;font-size:12px">10 min to reply</span></label>
          <label><input type="radio" name="vm-oos">Picker chooses the best match</label>
          <label><input type="radio" name="vm-oos">Remove and refund</label>
        </section>
        <section class="vm-card vm-box" data-flip>
          <div style="display:flex;align-items:center;gap:12px">${ph('courier-sam', 'Sam, your courier', 'vm-round', 'width:40px;height:40px')}<div style="flex:1"><div style="font-size:13.5px;font-weight:600">Sam brings it by bike</div><div class="vm-num vm-soft" style="font-size:12px;margin-top:2px">Leaves the store at 18:15</div></div></div>
          <div class="vm-pair"><span class="vm-soft">14 Alder St, flat 6</span><span class="vm-num">18:30–19:00</span></div>
        </section>
      </aside>
    </div>
  </div>
</div>`;
      this.q = s => root.querySelector(s);
      this.navs = [...root.querySelectorAll('.vm-nav')];
      this.views = [...root.querySelectorAll('.vm-view')];
      this.q('[data-review]').addEventListener('click', () => this.go('order'));
      this.q('[data-accept]').addEventListener('click', () => this.accept());
      root.querySelectorAll('[data-nav="home"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); this.go('home'); }));
      root.querySelectorAll('[data-nav="orders"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); this.go('order'); }));
      this.reset();
    }

    go(view, quiet = false) {
      if (quiet) this.root.classList.add('is-instant');
      this.root.dataset.view = view;
      this.views.forEach(v => v.classList.toggle('is-on', v.dataset.view === view));
      this.navs.forEach(n => n.classList.toggle('is-on', n.dataset.nav === (view === 'order' ? 'orders' : 'home')));
      if (quiet) requestAnimationFrame(() => requestAnimationFrame(() => this.root.classList.remove('is-instant')));
    }

    // the order's numbers come from one table, so the list, the bar and the total always agree
    fill(state) {
      const s = STATE[state];
      this.root.dataset.swap = state;
      this.root.querySelectorAll('[data-in-bag]').forEach(el => { el.textContent = s.inBag; });
      this.q('[data-bar]').style.transform = `scaleX(${s.inBag / 18})`;
      this.q('[data-items]').textContent = s.items;
      this.q('[data-swaps]').textContent = s.swaps;
      this.q('[data-swaps]').style.color = s.swapInk;
      this.q('[data-total]').textContent = s.total;
    }

    // step 1, 0.6 s: the green carton slides onto the pale one; the note and the buttons step aside
    accept() {
      if (this.root.dataset.swap !== 'pending' || this.timer) return;
      const k = this.scale(), from = this.q('[data-new]'), to = this.q('.vm-old');
      from.style.transform = `translateX(${(to.getBoundingClientRect().left - from.getBoundingClientRect().left) / k}px)`;
      this.root.classList.add('is-swapping');
      this.timer = setTimeout(() => this.fold(k), 600);
    }

    // step 2, 0.6 s: the choice folds away, the same photo lands in the first row of "In the bag", the list rises
    fold(k) {
      const ask = this.q('[data-ask]'), flips = [...this.root.querySelectorAll('[data-flip]')];
      const photo = this.q('[data-new] .vm-ph').getBoundingClientRect();
      const first = flips.map(el => el.getBoundingClientRect().top);
      Object.assign(ask.style, { top: `${ask.offsetTop}px`, left: `${ask.offsetLeft}px`, width: getComputedStyle(ask).width });
      this.fill('confirmed');
      const shift = flips.map((el, i) => (first[i] - el.getBoundingClientRect().top) / k);
      flips.forEach((el, i) => { el.style.transform = `translateY(${shift[i]}px)`; });
      const ph = this.q('[data-swap-row] .vm-ph'), p = ph.getBoundingClientRect();
      ph.style.transform = `translate(${(photo.left - p.left) / k}px, ${(photo.top - p.top) / k}px) scale(${photo.width / p.width})`;
      this.root.getBoundingClientRect();   // commit the inverted positions before they animate home
      this.root.classList.add('is-flipping');
      flips.forEach(el => { el.style.transform = ''; });
      ph.style.transform = '';
      this.timer = setTimeout(() => this.settle(), 650);
    }

    settle() {
      clearTimeout(this.timer); this.timer = null;
      this.root.classList.remove('is-swapping', 'is-flipping');
      this.root.querySelectorAll('[data-new], [data-flip], [data-swap-row] .vm-ph').forEach(el => { el.style.transform = ''; });
      Object.assign(this.q('[data-ask]').style, { top: '', left: '', width: '' });
    }

    scale() { return this.root.getBoundingClientRect().width / this.root.offsetWidth || 1; }

    reset() {
      this.settle();
      this.fill('pending');
      this.go('home', true);
    }
  }

  document.querySelectorAll('.vm').forEach(el => { el.marketApp = new MarketApp(el); });
})();
