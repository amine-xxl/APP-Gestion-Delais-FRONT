# SETAS — Frontend 🇲🇦

### Système de Suivi et de Traitement des Affaires — المندوبية الإقليمية للشؤون الإسلامية بفاس

---

## 📌 About

SETAS is a correspondence management system built for the **Ministère des Habous et des Affaires Islamiques** — Fès regional office.
It allows the director to track, manage, and respond to incoming correspondence with full deadline management and automated reminders.

---

## 🚀 Tech Stack

| Technology            | Usage                    |
| --------------------- | ------------------------ |
| React 18              | Frontend framework       |
| Redux Toolkit         | State management         |
| Axios                 | API communication        |
| Bootstrap 5           | UI styling               |
| React Router v6       | Navigation               |
| Docxtemplater         | Word document generation |
| React Bootstrap Icons | Icons                    |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Acceuil.jsx      # Home page with carousel + reminder banner
│   ├── Entries.jsx      # Add new correspondence form
│   ├── Exits.jsx        # Correspondence table with edit/delete
│   ├── Edit.jsx         # Edit correspondence page
│   ├── Stats.jsx        # Statistics dashboard
│   ├── Navbar.jsx       # Navigation bar
│   └── Footer.jsx       # Footer
├── store/
│   ├── store.js         # Redux store configuration
│   └── courrierSlice.js # Redux slice (CRUD actions)
├── hooks/
│   └── useReminders.js  # Desktop notification hook
├── data.js              # Carousel slides data
├── App.jsx              # Main app component
└── index.js             # Entry point
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/APP-Gestion-Delais-FRONT.git

# Navigate to the project
cd APP-Gestion-Delais-FRONT

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_BACKEND_URL=http://localhost:8000" > .env

# Start the development server
npm start
```

---

## 🌍 Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

---

## ✨ Features

* 📥 **البريد الوارد** — Add incoming correspondence with auto-calculated deadlines
* 📤 **المخرجات** — View, edit, delete all correspondence
* 📊 **الإحصائيات** — Statistics dashboard with monthly filter
* 🖨️ **طباعة** — Generate filled Word documents from templates
* 🔔 **Desktop Notifications** — Browser notifications for upcoming deadlines
* ⚠️ **Reminder Banner** — Red alert on homepage for deadlines within 5 days
* 🌙 **RTL Support** — Full Arabic right-to-left interface

---

## 👨‍💻 Author

**Mohammed-Amine Rhazi**

* **Email:** [mohammedaminerhazi@gmail.com](mailto:mohammedaminerhazi@gmail.com)
* **GitHub:** [https://github.com/amine-xxl](https://github.com/amine-xxl)

Réalisé pour le Chef de Service de l'Enseignement Traditionnel et des Affaires Sociales
© 2026 Application de Suivi des Délais — SETAS
