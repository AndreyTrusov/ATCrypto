# VUE.JS Web Application

This project is a **Vue.js** based web application as a part of my Frontend Technologies course requirement at university. 

## Project Overview

This project is a **Vue.js** based web application for showcasing the features of the `ATCrypto` platform. It is structured to demonstrate reusable components, a clean UI, and robust state management using **Pinia**. This application includes a **login/registration** system built with Vuetify, a **database setup** for storing user and cryptocurrency data, a dashboard component, and a **full wallet page**.

I earned a 95% grade for this frontend technologies course project at the university:
<img width="766" alt="image" src="https://github.com/user-attachments/assets/abb2586a-b346-451e-95ed-5fa5e38ec596" />

Web page photos:

![image](https://github.com/user-attachments/assets/eb80cc91-75d5-4151-9cc9-c9c81c9c13e4)

![image](https://github.com/user-attachments/assets/375a262f-01fa-4b9b-b168-560ab8e70ab9)

![image](https://github.com/user-attachments/assets/4c9bb897-25c8-4a26-bffd-9be2b389a709)

![image](https://github.com/user-attachments/assets/e72aa54c-31ba-4ff6-bf19-91d224edaef1)


---

## Requirements

This project meets the following requirements:

- **Vue Router** for handling navigation between several subpages.
- **Pinia** for state management.
- **5+ reusable components** used across different parts of the site (e.g., Team Members, Services, Why Us section).
- Built using **Vue.js 3** (Options API).
- Proper **HTML5** and **CSS3** usage with a responsive design.
- No errors or warnings at the JavaScript level.
- The website uses **Bootstrap** for styling and responsive layout.
- Hosted on **GitHub** for public access.

---

## Features

- **Multiple Pages**: 
  - The app contains several subpages: Home, About Us, Services, Team, Why Us, Login, Register, Wallet, Dashboard.
  - All pages are dynamically loaded using **Vue Router**.
 
- **Authentication**: 
  - The app has a login and registration system built with Vuetify components, allowing users to securely access their accounts

- **Database Integration**: 
  - The application is integrated with a database to store user profiles, cryptocurrency data, and transaction history.

- **Dashboard**: 
  - The app includes a dashboard component that provides an overview of the user's cryptocurrency holdings and portfolio performance.
 
- **Wallet Page**: 
  - The wallet page allows users to view their cryptocurrency balances, transaction history, and perform buy/sell operations.

- **State Management**: 
  - The app uses **Pinia** for global state management, including navigation settings and team member data.

- **Reusable Components**: 
  - Components like `ServiceCard`, `TeamCard`, `WhyUsSection`, and others are reused across multiple pages for consistency.

- **Responsive Design**:
  - The website is responsive and adapts to various screen sizes using **Bootstrap** grid system.

- **Vue.js Options API**:
  - The app is built using **Vue.js Options API**, ensuring a structured and readable codebase.

---

## Technologies Used

- **Vue.js 3.x** (Options API)
- **Pinia** for state management
- **Axios** for API calls
- **Database** ( MongoDB )for storing user and cryptocurrency data
- **Vue Router** for page navigation
- **HTML5**, **CSS3**
- **Bootstrap** for layout and styling
- **Font Awesome** for icons
- **Owl Carousel** for carousel functionality

---

## Installation

To run this project locally, follow these steps:

```bash
  git clone https://github.com/yourusername/your-repository-name.git

  cd your-repository-name

  npm install

  npm run dev 
```

Import database and run /backed:

```bash
  cd ./backed

  npm start
```

Open the app in your browser:

http://localhost:8080/
