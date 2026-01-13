# 📇 Contact Manager (React + Stein + Tailwind)

A simple, elegant contact manager built with **React**, **TailwindCSS**, and the **Stein API** (Google Sheets as backend).
It supports live fetching, adding, updating, deleting, and searching contacts.

---

## 🔗 Links

- **GitHub Project Repository:** [https://github.com/MeghaSinghall/Contact-management-system]
- **Vercel Deployment:** [https://contact-management-system-orcin.vercel.app/]

---

##  All Details of the Project

##  Tech Stack

* **React (TypeScript)**
* **TailwindCSS**
* **Axios**
* **Stein API**
* **React Hot Toast**
* **React Phone Input 2**
* **Lucide Icons**
* **Google Sheets**


---

##  Features

- Fetch contacts directly from a Google Sheet (via Stein API)
- Real-time updates for Add / Edit / Delete contact
- Fuzzy search (by name, email, phone)
- Table View ↔ Card View toggle
- Country-based phone number input
- Only valid phone number and email input
- Client-side validation
- Toast notifications for all actions
- Beautiful TailwindCSS styling

## Required Google Sheet Schema 

Google Sheet **must contain** the following columns:

| Column Name    | Description                        |
| -------------- | ---------------------------------- |
| `id`           | Unique string ID for each contact  |
| `name`         | Full name of the contact           |
| `phone_number` | Contact number (with country code) |
| `email`        | Valid email address                |

⚠️ Ensure your Google Sheet tab name **exactly matches** the value of `SHEET_NAME` in the code (default is `Sheet1`).

---

## 🧠 Validation Rules

| Field     | Rule                                                  |
| --------- | ---------------------------------                     |
| **Name**  | Required, non-empty                                   |
| **Email** | Required, must match email format                     |
| **Phone** | Required, minimum 10 digits (or as per country code)  |

---

## 🔎 Searching

Type in the search bar to filter contacts by:

* Name
* Email
* Phone number

Search is **case-insensitive** and updates results live.

---

##  Toast Notifications

All operations (fetch, add, edit, delete) show success or error toasts using **react-hot-toast**.

Example:

* ✅ Success: “Contact added successfully!”
* ❌ Error: “Failed to fetch contacts: Network Error”

---

## 🗂️ Folder Structure

The project is organized into a clean, modular structure for better scalability and maintainability:

```plaintext
src/
├── components/             # All reusable UI components
│   ├── ContactFormModal.tsx    # Modal for adding/editing contacts
│   ├── ContactTable.tsx        # Table view for displaying contacts
│   ├── ContactCardView.tsx     # Card/grid view for displaying contacts
│   ├── DeleteModal.tsx         # Confirmation modal for contact deletion
│   └── HeaderControls.tsx      # Search bar, view toggle & Add button
│
├── utils/                  # Helper functions and API configuration
│   ├── api.ts                  # Axios setup & Stein API methods
│   ├── helpers.ts              # Utility functions (ID generation, etc.)
│   └── validators.ts           # Input validation logic
│
├── types/                  # TypeScript type definitions
│   └── index.ts                # Shared interfaces (Contact type, etc.)
│
└── App.tsx                 # Root component rendering the Contact Manager
```

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/MeghaSinghall/Contact-management-system.git

# Move into the project folder
cd Contact-management-system

# Install dependencies
npm install
npm install axios react-hot-toast react-phone-input-2 lucide-react

# Create .env file (see .env.example)
VITE_STEIN_API_URL=your_stein_api_url
VITE_SHEET_NAME=Sheet1    # Sheet1 is the tab name of the Google Sheet

# Start the dev server
npm run dev
```

---

## Instructions for generating API Key

- Visit **[https://steinhq.com/]**.
- Sign in with your Google account
- Go to the dashboard and click **New API from Sheet**
- Paste the Google sheet link 
- After connecting, Stein will generate a unique API URL.
