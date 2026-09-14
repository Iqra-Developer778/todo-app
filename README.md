 📝 Todo App — React Native + Supabase

A simple cross-platform Todo application built with **React Native (Expo)** and **Supabase** for authentication and real-time database management.

✨ Features

- 🔐 **User Authentication** — Sign up and log in securely using Supabase Auth
- ✅ **Create, Read, Update, Delete (CRUD)** — Add, complete, and delete todos
- 🔄 **Persistent Sessions** — Stay logged in using AsyncStorage
- 📱 **Cross-Platform** — Runs on both iOS and Android from a single codebase
- ⚡ **Real-time Ready** — Built on Supabase, easily extendable to real-time updates

🛠 Tech Stack

- **Frontend:** React Native, Expo Router
- **Backend / Database:** Supabase (Auth, Database)
- **Storage:** AsyncStorage (session persistence)
- **Language:** JavaScript

 📂 Project Structure

```
├── app/
│   ├── index.jsx      # Home screen — Todo list (CRUD operations)
│   ├── login.jsx       # Login screen
│   └── signup.jsx       # Signup screen
├── lib/
│   └── supabase.js     # Supabase client configuration
└── README.md
```

 🚀 Getting Started

 Prerequisites

- Node.js installed
- Expo CLI (`npm install -g expo-cli`)
- A [Supabase](https://supabase.com/) account and project

 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials
   ```
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development server
   ```bash
   npx expo start
   ```

Supabase Setup

In your Supabase project, create a `todos` table with the following columns:

| Column        | Type        | Notes                        |
|---------------|-------------|-------------------------------|
| `id`          | `int8`      | Primary key, auto-increment  |
| `title`       | `text`      | Todo text                    |
| `is_complete` | `bool`      | Default: `false`             |
| `user_id`     | `uuid`      | References `auth.users(id)`  |
| `created_at`  | `timestamp` | Default: `now()`             |

 💡 Don't forget to enable **Row Level Security (RLS)** and add policies so users can only access their own todos.

 📱 Screens

- **Login** — Email/password authentication
- **Signup** — New account creation
- **Home** — View, add, complete, and delete todos
 🔮 Future Improvements

- [ ] Real-time sync using Supabase Realtime
- [ ] Due dates and reminders
- [ ] Categories / tags for todos
- [ ] Dark mode support

 👩‍💻 Author
Iqra

React Native & Flutter Developer




