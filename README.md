# Brew Bliss Cafe

A single-page coffee shop menu website built with plain HTML, CSS, and JavaScript.

## Run the website

No installation or build command is required.

1. Open `index.html` in a browser.
2. For the best editing experience, open the project folder in VS Code.
3. Install the optional VS Code extension `Live Server` if you want automatic browser refresh while editing.
4. Right-click `index.html` and choose **Open with Live Server**.

The page also works by opening the HTML file directly.

## Project files

- `index.html` contains the page sections, menu containers, contact form, and order form.
- `styles.css` contains colors, layout, responsive rules, buttons, cards, and animations.
- `script.js` contains the dummy menu data and all interactive behavior.

## How the JavaScript works

1. The `menuItems` array stores each product name, description, price, category, image, and popularity status.
2. `renderPopularItems()` displays only products marked with `popular: true`.
3. `renderMenuItems()` displays all products or only the selected category.
4. The order buttons open a small order form in a modal window.
5. Submitting the order form displays a thank-you message without reloading the page.
6. Submitting the contact form displays a separate thank-you message.

These forms are front-end demonstrations. They do not send data to a server yet.

## Replace the dummy data

### Menu data

Open `script.js` and edit the objects inside `menuItems`:

```javascript
{
  name: 'Your Coffee Name',
  description: 'A short description of the drink',
  price: 5.50,
  category: 'coffee',
  icon: 'coffee',
  popular: true,
  image: 'your-image-url'
}
```

Available categories are `coffee`, `cold`, and `bites`. Use `popular: true` for products that should appear in the separate popular section.

### Contact details

Open `index.html` and replace:

- `hello@brewbliss.example`
- `+1 (555) 014-2789`
- `142 Maple Street, Brightwood`
- The opening hours in the hero section

### Real forms

To receive real messages or orders, connect the forms to a backend, email service, or hosted form provider. Add server-side validation before using real customer data.

## Main features

- Responsive desktop and mobile layout
- Popular products section
- Category filtering
- Order modal with confirmation message
- Contact form with confirmation message
- Dummy location map and contact information
- Accessible labels, buttons, focus states, and live feedback regions
