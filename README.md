# 📇 Contact Manager (React + Stein + Tailwind)

A simple, elegant contact manager built with **React**, **TailwindCSS**, and the **Stein API** (Google Sheets as backend).
It supports live fetching, adding, updating, deleting, and searching contacts.

---

## 🔗 Links

- **GitHub Project Repository:** [https://github.com/MeghaSinghall/Contact-management-system]
- **Vercel Deployment:** [https://contact-management-system-git-main-meghas-projects-36ca7805.vercel.app/]
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

✅ Fetch contacts directly from a Google Sheet (via Stein API)
✅ Real-time updates for Add / Edit / Delete contact
✅ Fuzzy search (by name, email, phone)
✅ Table View ↔ Card View toggle
✅ Country-based phone number input
✅ Only valid phone number and email input
✅ Client-side validation
✅ Toast notifications for all actions
✅ Beautiful TailwindCSS styling


## Required Google Sheet Schema 

Google Sheet **must contain** the following columns:

| Column Name    | Description                        |
| -------------- | ---------------------------------- |
| `id`           | Unique string ID for each contact  |
| `name`         | Full name of the contact           |
| `email`        | Valid email address                |
| `phone_number` | Contact number (with country code) |

⚠️ Ensure your Google Sheet tab name **exactly matches** the value of `SHEET_NAME` in the code (default is `Sheet1`).

---

## ⚙️ Setup Instructions

### 1. Prerequisites

* Node.js ≥ 16
* React app (CRA, Vite, Next.js, etc.)
* TailwindCSS configured
* Stein API account connected to your Google Sheet

### 2. Installed dependencies

```bash
npm install axios react-hot-toast react-phone-input-2 lucide-react
```

### 3. Configure Stein API

In your code, replace this with your actual Stein API storage URL:

```ts
const STEIN_API_URL = 'https://api.steinhq.com/v1/storages/YOUR_STORAGE_ID';
const SHEET_NAME = 'Sheet1';
```

Alternatively, use environment variables (used in this project):

```env
VITE_STEIN_API_URL=https://api.steinhq.com/v1/storages/YOUR_STORAGE_ID
VITE_SHEET_NAME=Sheet1
```


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




