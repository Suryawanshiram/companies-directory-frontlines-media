# 🏢 Companies Directory - Frontend Application

A modern, responsive React-based web application for browsing and filtering company data with an intuitive user interface.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](your-demo-link-here)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📸 Screenshots

### Card View
![Card View](screenshots/card-view.png)

### Table View
![Table View](screenshots/table-view.png)

### Filters & Search
![Filters](screenshots/filters.png)

## 🚀 Live Demo

Check out the live application: [**Companies Directory**](your-vercel-link-here)

## ✨ Features

### Core Functionality
- 🔍 **Advanced Search** - Real-time search by company name or location
- 🏷️ **Smart Filtering** - Filter by industry and location
- 📊 **Multiple Sort Options** - Sort by name, employees, revenue, or founding year
- 📑 **Pagination** - Clean pagination with 6 items per page
- 🎨 **Dual View Modes** - Switch between card and table layouts
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

### User Experience
- ⚡ **Lightning Fast** - Optimized with React hooks and memoization
- 🎯 **Loading States** - Professional loading indicators
- ❌ **Error Handling** - Graceful error messages and retry options
- 🧹 **Clear Filters** - One-click filter reset
- 🎭 **Smooth Animations** - Polished transitions and hover effects

### Technical Highlights
- ⚛️ **Modern React** - Hooks (useState, useEffect, useMemo)
- 🎨 **Tailwind CSS** - Utility-first responsive styling
- 🏗️ **Component Architecture** - Clean, maintainable code
- 🔧 **No External State Management** - Pure React state management
- 📦 **Mock API Integration** - Easy to swap with real backend

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.x
- **Styling:** Tailwind CSS 3.x
- **Icons:** Lucide React
- **Build Tool:** Vite / Next.js
- **Deployment:** Vercel

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## 🚀 Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/companies-directory.git
cd companies-directory
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
```
Navigate to http://localhost:3000
```

## 📁 Project Structure

```
companies-directory/
├── src/
│   ├── components/
│   │   └── CompaniesDirectory.jsx    # Main component
│   ├── data/
│   │   └── mockCompanies.js          # Mock data
│   ├── App.jsx                        # Root component
│   └── index.css                      # Tailwind imports
├── public/
│   └── screenshots/                   # Application screenshots
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Key Features Explained

### 1. Search Functionality
Real-time search that filters companies by name or location as you type.

### 2. Filter System
- **Industry Filter:** Dropdown with all available industries
- **Location Filter:** Dropdown with all unique locations
- **Clear All:** Reset all filters with one click

### 3. Sorting Options
Sort companies by:
- Name (A-Z or Z-A)
- Number of Employees
- Revenue
- Year Founded

Toggle between ascending and descending order.

### 4. Pagination
- 6 companies per page
- Page number buttons
- Previous/Next navigation
- Results counter

### 5. View Modes
- **Card View:** Visual cards with company information
- **Table View:** Compact table format for quick scanning

## 🔌 API Integration

### Using Mock Data (Current)
The app currently uses mock data from `mockCompanies.js`. This is perfect for development and demonstration.

### Connecting to Real API

Replace the mock data fetch in `CompaniesDirectory.jsx`:

```javascript
// Replace this:
const fetchCompanies = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  setCompanies(mockCompanies);
};

// With this:
const fetchCompanies = async () => {
  try {
    const response = await fetch('YOUR_API_ENDPOINT/companies');
    const data = await response.json();
    setCompanies(data);
  } catch (err) {
    setError('Failed to fetch companies');
  } finally {
    setLoading(false);
  }
};
```

### Setting Up JSON Server (Optional Backend)

1. **Install JSON Server**
```bash
npm install -g json-server
```

2. **Create `db.json`**
```json
{
  "companies": [
    {
      "id": 1,
      "name": "TechCorp Solutions",
      "location": "San Francisco, CA",
      "industry": "Technology",
      "employees": 500,
      "revenue": "$50M",
      "founded": 2015
    }
  ]
}
```

3. **Run JSON Server**
```bash
json-server --watch db.json --port 3001
```

4. **Update API endpoint**
```javascript
const response = await fetch('http://localhost:3001/companies');
```

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Adjusting Items Per Page
In `CompaniesDirectory.jsx`:
```javascript
const [itemsPerPage] = useState(6); // Change to desired number
```

### Adding New Filters
1. Add state for the new filter
2. Update the filtering logic in `useMemo`
3. Add UI elements in the filters section

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow the prompts** and your app will be live!

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Drag and drop** the `dist` folder to Netlify

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Search functionality works correctly
- [ ] All filters apply properly
- [ ] Sorting works in both directions
- [ ] Pagination displays correct items
- [ ] View modes switch correctly
- [ ] Responsive on mobile devices
- [ ] Loading states appear
- [ ] Error handling works

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ram Suryawanshi**
- GitHub: [@ySuryawanshiram](https://github.com/Suryawanshiram)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Built with [React](https://reactjs.org/)

## 📧 Contact

For questions or feedback, please reach out:
- Project Link:companies-directory-frontlines-medi.vercel.app

---

⭐ If you found this project helpful, please give it a star!

Made with ❤️ by [Ram Suryawanshi]
