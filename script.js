const menuItems = [
  { name: 'House Latte', description: 'Velvety espresso, steamed milk, maple', price: 5.5, category: 'coffee', icon: '☕', popular: true, image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=600&q=80' },
  { name: 'Honey Oat Cortado', description: 'Double espresso, oat milk, wildflower honey', price: 5, category: 'coffee', icon: '🍯', popular: true, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
  { name: 'Bliss Cold Brew', description: '24-hour steep, orange peel, brown sugar', price: 5.25, category: 'cold', icon: '🧊', popular: true, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Classic Cappuccino', description: 'Rich espresso, silky foam, cocoa dust', price: 4.75, category: 'coffee', icon: '☕', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80' },
  { name: 'Rosemary Mocha', description: 'Dark chocolate, espresso, rosemary cream', price: 5.75, category: 'coffee', icon: '🌿', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Citrus Iced Tea', description: 'Black tea, lemon, grapefruit, mint', price: 4.25, category: 'cold', icon: '🍋', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
  { name: 'Cardamom Bun', description: 'Soft baked bun, cardamom sugar, glaze', price: 4.5, category: 'bites', icon: '🥐', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sea Salt Cookie', description: 'Brown butter, dark chocolate, sea salt', price: 3.25, category: 'bites', icon: '🍪', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80' }
];

const popularGrid = document.querySelector('#popular-grid');
const menuGrid = document.querySelector('#menu-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const orderModal = document.querySelector('#order-modal');
const orderForm = document.querySelector('#order-form');
const contactForm = document.querySelector('#contact-form');
const orderFeedback = document.querySelector('#order-feedback');
const contactFeedback = document.querySelector('#contact-feedback');
const selectedItem = document.querySelector('#selected-item');
const orderItem = document.querySelector('#order-item');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function renderPopularItems() {
  popularGrid.innerHTML = menuItems.filter(item => item.popular).map(item => `
    <article class="popular-card">
      <div class="popular-card-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="popular-badge">Popular</span></div>
      <div class="popular-card-body"><div><h3>${item.name}</h3><p>${item.description}</p></div><span class="price">${formatPrice(item.price)}</span></div>
    </article>
  `).join('');
}

function renderMenuItems(category = 'all') {
  const visibleItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
  menuGrid.innerHTML = visibleItems.map(item => `
    <article class="menu-card">
      <div class="menu-card-icon" aria-hidden="true">${item.icon}</div>
      <div class="menu-card-info"><h3>${item.name}</h3><p>${item.description}</p></div>
      <div class="menu-card-aside"><span class="price">${formatPrice(item.price)}</span><button class="order-button" type="button" data-order="${item.name}">Order <span aria-hidden="true">&#8594;</span></button></div>
    </article>
  `).join('');
}

function openOrderModal(itemName) {
  selectedItem.textContent = itemName;
  orderItem.value = itemName;
  orderFeedback.textContent = '';
  orderFeedback.classList.remove('error');
  orderForm.reset();
  orderItem.value = itemName;
  orderModal.hidden = false;
  document.body.classList.add('modal-open');
  document.querySelector('#order-name').focus();
}

function closeOrderModal() {
  orderModal.hidden = true;
  document.body.classList.remove('modal-open');
}

renderPopularItems();
renderMenuItems();

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(filter => filter.classList.remove('active'));
    button.classList.add('active');
    renderMenuItems(button.dataset.filter);
  });
});

menuGrid.addEventListener('click', event => {
  const orderButton = event.target.closest('[data-order]');
  if (orderButton) openOrderModal(orderButton.dataset.order);
});

document.querySelector('.modal-close').addEventListener('click', closeOrderModal);
orderModal.addEventListener('click', event => {
  if (event.target === orderModal) closeOrderModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !orderModal.hidden) closeOrderModal();
});

orderForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = new FormData(orderForm).get('name').trim();
  const quantity = new FormData(orderForm).get('quantity');
  orderFeedback.textContent = `Thank you, ${name}! Your order for ${quantity} ${quantity === '1' ? 'serving' : 'servings'} of ${orderItem.value} is being prepared.`;
  orderForm.reset();
  orderItem.value = selectedItem.textContent;
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = new FormData(contactForm).get('name').trim();
  contactFeedback.classList.remove('error');
  contactFeedback.textContent = `Thanks, ${name}! Your message is on its way. We will reply soon.`;
  contactForm.reset();
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});
