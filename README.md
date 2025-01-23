#Ticket Onclick
Problem Statement
In today's fast-paced world, people are constantly looking for ways to discover and attend events that interest them. However, there are often challenges with finding reliable event ticketing platforms that provide easy access to tickets and streamline the booking process for both event organizers and attendees. Many existing platforms are either too complex or lack essential features, such as a simple user interface, secure payment processing, and real-time ticket availability updates.

Solution
Our platform aims to simplify the event discovery and booking process by offering a user-friendly interface, secure payment processing, and real-time ticket availability updates. It caters to both event organizers and attendees, ensuring a seamless experience for all users.

Team
Full Stack: React (Frontend) & Flask (Backend)
MVP Features
Required Features
JWT Bearer: Secure authentication using JWT.
User Defined Roles: Define user roles with preset permissions.
Event Creation: Organizers can create events and set the number of available tickets.
Tiered Pricing: Different pricing tiers (Early booking, MVP, Regular).
Add to Calendar: Customers can add events to their calendar.
Account Management: Customers can register an account and view previously bought tickets.
Payment Integration: Customers can pay for tickets using MPESA STK.
Search Functionality: Events can be searched and found through selecting a location, tags, or categories.
Technical Expectations
Backend: Flask
Database: PostgreSQL
Wireframes: Canva (Should be mobile friendly)
Frontend: ReactJs & Redux Toolkit (state management)
Getting Started
Prerequisites
npm
Python and pip
PostgreSQL
Installation
Backend Setup

Navigate to the backend directory:
cd backend
Create a virtual environment and activate it:
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
Install the required packages:
pip install -r requirements.txt
Set up the PostgreSQL database and update the database URI in the environment variables.
Frontend Setup

Navigate to the frontend directory:
cd frontend
Install the required packages:
npm install
Running the Application
Start the Backend Server

flask run
Start the Frontend Server

npm start
Testing
Backend Testing
pytest
Frontend Testing
npm test
Contributing
We welcome contributions! Please fork the repository and submit pull requests.
