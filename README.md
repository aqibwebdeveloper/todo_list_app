Todo List App 📝

A simple and interactive Todo List App built using HTML, CSS, and JavaScript. This application helps users manage their daily tasks by adding, editing, deleting, and completing todos.

🚀 Features
Add Todo: Add new tasks to your todo list.
Edit Todo: Update existing tasks whenever needed.
Delete Todo: Remove individual tasks from the list.
Delete All: Clear all todos with a single click.
Mark as Completed: Mark tasks as completed.
Firebase Firestore: Store and manage todos in Firebase Cloud Firestore, so tasks remain available even after refreshing the page or reopening the browser.
Dynamic UI: Todos are dynamically displayed using JavaScript.
Dark Theme: Clean and modern dark-themed user interface.
Font Awesome Icons: Uses icons for edit, delete, and completed actions.
🛠️ Technologies Used
HTML5 – For creating the application structure.
CSS3 – For styling and designing the user interface.
JavaScript (Vanilla JS) – For handling todo functionality and DOM manipulation.
Firebase Firestore – For storing, retrieving, updating, and deleting todo data in the cloud.
Font Awesome – For displaying action icons.
📂 Project Structure
text
Todo-App/
│
├── index.html
│
├── css/
│   └── style.css
│
└── js/
    ├── app.js
    └── config.js

⚙️ Installation & Setup

Follow these steps to run the project on your local machine:

1. Clone the repository

bash
git clone https://github.com/aqibwebdeveloper/todo_list_app.git


2. Navigate to the project folder

bash
cd todo_list_app


3. Firebase Setup

Create a Firebase project in the Firebase Console.
Enable Cloud Firestore in your Firebase project.
Configure your Firebase project credentials in config.js.

4. Open the project

Open the index.html file using a local development server.

You can also use the Live Server extension in Visual Studio Code.

💻 How to Use
Enter your task in the input field.
Click the Add button to create a new todo.
Click the Edit icon to update an existing task.
Click the Delete icon to remove a task.
Click the Check icon to mark a task as completed.
Click Delete All to remove all tasks.
💾 Data Storage

This application uses Firebase Cloud Firestore to store and manage todo items.

Todos are stored in a Firestore collection.
New todos are saved directly to Firestore.
Existing todos can be updated using Firestore update operations.
Completed tasks are managed and their completion status is stored in Firestore.
Deleted todos are removed from Firestore.
Todos remain available across page refreshes and browser sessions because data is stored in the cloud.
🎨 User Interface

The application features a dark-themed design with a simple and user-friendly layout.

👨‍💻 Author

aqibwebdeveloper

📄 License

This project is created for learning and educational purposes.

⭐ If you like this project, don't forget to give it a star!
