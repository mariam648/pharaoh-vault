Pharaoh Vault
Pharaoh Vault is a full-stack e-commerce website inspired by the richness and elegance of ancient Egyptian design. The project was built as a complete online store experience that combines a visually distinctive brand identity with real full-stack functionality.

The website allows users to browse products, search and filter items, view product details, manage a shopping cart and favorites list, complete a checkout process, and interact with additional features such as theme switching, language switching, currency conversion, and a small interactive playground.
It also includes a simple admin side for product management.

Live Demo
Live Website: [pharaoh-vault-production.up.railway.app]
GitHub Repository: https://github.com/mariam648/pharaoh-vault.git

Project Idea
The idea behind Pharaoh Vault was to create an online furniture and décor store that reflects the beauty of ancient Egyptian aesthetics in a modern e-commerce experience. The store offers products such as beds, wardrobes, doors, carpets, tables, vases, antiques, mirrors, accessories, and more, all presented through a themed and responsive user interface.

The goal of the project was not only to build an attractive website, but also to apply full-stack development concepts in a realistic business scenario, including frontend development, backend APIs, database design, deployment, and testing.

Main Features
User Features
Responsive home page with navbar, hero section, and featured products
Products page with category filtering and search
Product details page
Shopping cart with quantity update and dynamic total calculation
Favorites page
Checkout form
About Us page
Contact Us page
Dark / Light mode toggle
Arabic / English language support
Currency switch
Interactive playground section with mini games
Toast messages, loading states, and improved empty states
Admin Features
Admin login flow
Admin dashboard
Add new product
Edit existing product
Delete product
Product image upload support
Technologies Used
Frontend
React
JavaScript
Tailwind CSS
HTML5
CSS3
React Router
Axios
Framer Motion
React Hot Toast
React Icons
Backend
Laravel
PHP
RESTful API
Database
MySQL
Tools and Platforms
GitHub
Railway
VS Code
Project Structure
The project is organized into two main parts:

backend/
→ Laravel API, database, migrations, seeders, and backend logic
frontend/
→ React application, pages, components, context, and assets
Backend Structure
app/Models
→ Eloquent models
app/Http/Controllers
→ API controllers
routes/api.php
→ API routes
database/migrations
→ Database schema
database/seeders
→ Initial data
Frontend Structure
src/components
→ Reusable UI components
src/pages
→ Main pages
src/context
→ State management
src/assets
→ Images and static assets
src/hooks
→ Custom hooks
src/App.jsx
→ Main app routing
Database Overview
The project uses MySQL as the main database. The core tables include:

categories
products
orders
order_items
contact_messages
users
personal_access_tokens
These tables support product organization, customer interaction, order creation, and admin-related functionality.

API Endpoints
Some of the main API endpoints used in the project include:

GET /api/products
GET /api/products/featured
GET /api/products/{id}
GET /api/categories
POST /api/contact
POST /api/checkout
POST /api/admin/products
PUT /api/admin/products/{id}
DELETE /api/admin/products/{id}
UI / UX Direction
One of the key goals of this project was to create a strong visual identity instead of building a generic online store. The interface was designed around an ancient Egyptian theme using colors such as gold, blue, beige, brown, navy, and turquoise. The design focuses on making the website feel premium, memorable, and visually engaging while keeping navigation clear and user-friendly.

Responsiveness was also a major priority, so the layout was adjusted to work across desktop, tablet, and mobile screens.

State Management and Dynamic Behavior
The project includes dynamic frontend behavior and state management for several areas, including:

Shopping cart state
Favorites state
Theme state
Language state
Currency state
Product fetching from the backend
Search and filtering logic
Admin product management actions
Deployment
The project was deployed using Railway.

The deployment setup includes:

Laravel backend hosted on Railway
MySQL database hosted on Railway
React frontend built and served through Laravel
Public live link for accessing the website online
This setup made it possible to deploy the full project as one connected application.

Local Setup
To run the project locally:

1. Clone the repository
git clone https://github.com/mariam648/pharaoh-vault.git

2. Open the project folder
cd pharaoh-vault

3. Backend setup
Go to the backend folder
Install dependencies using Composer
Configure the
.env
file
Run migrations and seeders
Start the Laravel server
4. Frontend setup
Go to the frontend folder
Install dependencies using npm
Start the React development server
Basic Run Steps
Backend
composer install
create
.env
configure database
php artisan key:generate
php artisan migrate --seed
php artisan serve
Frontend
npm install
npm run dev
Testing
The project was manually tested to verify:

Navigation between pages
Product fetching and rendering
Search and filtering
Add to cart / remove from cart
Checkout flow
Favorites functionality
Theme switching
Language switching
Currency switching
Admin dashboard actions
Responsive behavior on different screen sizes
Challenges
During development, I worked through several practical challenges related to routing, API connection, CORS, frontend/backend integration, production deployment, Tailwind build configuration, and database connection. Solving these issues helped me improve the project structure and gain more confidence in handling real full-stack development problems.

What I Learned
This project helped me strengthen my skills in:

building a full-stack application from idea to deployment
connecting a React frontend with a Laravel backend
designing and structuring REST APIs
working with MySQL databases
managing state and dynamic UI behavior
handling deployment issues in a real environment
improving responsive design and user experience
Future Improvements
Possible future improvements include:

more advanced admin authentication and authorization
dashboard analytics
order management system
product image gallery improvements
stronger validation and error handling
payment gateway integration
user accounts and order history
Author
Mariam
Full Stack Web Developer
