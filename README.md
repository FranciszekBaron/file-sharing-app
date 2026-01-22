# File Sharing App

**File Sharing App** — a frontend web application inspired by Google Drive for managing files and folders in the browser. Users can **browse, upload, download, delete, and share files** using a modern React + TypeScript UI. It focuses on providing a responsive and intuitive experience for users to interact with files, managing folder structure and sharing them. 

## Description
This project is a **React + TypeScript + Vite frontend application** that .


## Technologies Used
- **React** — UI library for building interactive interfaces  
- **TypeScript** — typed superset of JavaScript for safer code  
- **Vite** — fast build tool & development server  
- **CSS / Custom Styles** —  for layout and UI  
- **Fetch** — to communicate with a backend API  
- **React Router** — for page routing  


## Configuration
To run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/FranciszekBaron/file-sharing-app.git
   cd file-sharing-app
   ```
2. **Install dependencies**
```bash
 install npm 
 ```
3. **Start the development server**
```bash
 npm run dev 
 ```
4. **Open in your browser at http://localhost:5173.**
> _Note: this repo is frontend-only and expects a backend API provided at https://github.com/FranciszekBaron/FileSharing. Configure your API base URL in the environment variables or config file as needed.._


## Features
- Browse files and folder structure
- Upload files and create folders
- Download files
- Delete and restore files
- Authentication UI (JWT / secure cookies handled by backend)
- Star files or mark favorites
- Share files between users


## What I Learned
#### TypeScript & React Practices
- Leveraging TypeScript for type safety
- Creating reusable and modular UI components
- Lifting State Up to control parent changes in children component
- Handling async state and API requests cleanly with fetchWrapper

#### React Rendering & Hooks
Learned how React rendering works and how to optimize it using hooks:
- **useEffect** – running side effects on mount, unmount, or when dependencies change.
- **useMemo / useCallback** – memoizing values or functions to avoid unnecessary re-renders.
- Understanding component lifecycle **mount,unmount,update**

#### UI/UX & State Management
- Managing global app state in context components (allFiles, displayedFiles, selectedItems etc.)
- Designing a responsive, intuitive UI
- Handling edge states (loading, error messages)

#### Secure Client-Side Storage & Authentication
Working on this project helped me improve how authentication and secure storage works in a web app. 
Key takeaways:
- User data is fetched only from the /me endpoint
- Tokens stored in secure, HttpOnly cookies with security flags (HttpOnly, Secure, SameSite)
- How React makes user inputs **sanitized and escaped** to prevent execution of scripts or malicious code.

## Challenges & Decisions
#### Modular Component Architecture
To maintain a clean structure,components such as FileItemList,DropdownButton,Searchbar etc. were designed as independent components — improving reusability and maintainability.
#### Pessimstic Update in FilesContext
To prevent too many unnecessary API calls with refreshFiles() method, pessimstic update was introduced to all FilesContext methods. This approach ensures the frontend is always consistent with the backend, sometimes at the expense of UI response time.  


## Future Improvements
- Implement editing files, as it was implemented with mocked version of all files
- Add drag-and-drop file upload
- Add user panel and registration
- Add offline caching 
- Implement unit/UI tests (Jest / React Testing Library)

