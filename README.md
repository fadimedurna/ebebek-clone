# ebebek-clone: Product Carousel Case

A responsive product carousel implementation inspired by the ebebek website. This project demonstrates a fully functional product carousel with responsive design, favorites functionality, and mobile-friendly navigation.

## 📋 Features

- **Responsive Product Carousel**: Displays products in a horizontally scrollable carousel
- **Favorites System**: Add/remove products to favorites with persistent storage
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu
- **Product Details**: Display of product information including:
  - Product image
  - Product name
  - Original price (if discounted)
  - Current price
  - Discount percentage (automatically calculated)
- **Caching**: Products are cached in localStorage to improve performance
- **Smooth Animations**: Button click effects and smooth scrolling

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ebebek-clone.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ebebek-clone
   ```
3. Open test.html in your browser.

## 💻 Usage
The carousel automatically initializes when the page loads. You can:
- Click the left/right arrows to navigate through products
- Click the heart icon to add/remove products from favorites
- Click on a product to open its details page
- Use the responsive navigation menu on mobile devices

## 🛠️ Technical Implementation

### Structure
- case.js: Contains all the JavaScript functionality
- test.html: Simple HTML file that loads the script

### Key Components
1. Dynamic Loading:
- jQuery is loaded dynamically using a Promise-based approach
- HTML and CSS are generated programmatically
2. Data Management:
- Products are fetched from an external API
- Data is cached in localStorage for improved performance
- Favorites are stored persistently in localStorage
3. Responsive Design:
- Adapts to different screen sizes (desktop, tablet, mobile)
- Mobile-friendly navigation with hamburger menu
- Responsive product card layout