# Club Website

This project is a website for a club, designed based on a [Figma design](https://www.figma.com/proto/mPwmGIqylFV2Al63Zff5EG/Club-Website?node-id=4%3A3&scaling=scale-down&page-id=0%3A1&starting-point-node-id=4%3A3) created by a fellow club member. The website is designed to manage and display events for the club, providing an intuitive interface for users. The site is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Chakra UI for the front-end user interface.

## Features  

✅ **Responsive Design**  
- Works on both desktop and mobile.  

✅ **Event Listing**  
- Events are displayed in a calendar view.  
- Users can filter events by month to see upcoming events.  

✅ **Event Creation**  
- Only accessible to officers or higher-level members.  

✅ **Slideshow**  
- Now fetches "featured" events (configurable in the admin panel).  

✅ **Google Calendar Integration (Planned)**  
- "Add to Google Calendar" button is a placeholder.  
- Will integrate with Google Calendar API for event addition.  

✅ **Google OAuth Login (In Progress)**  
- Login page is implemented.  
- Currently has email domain restrictions (can be modified for school emails only).  
- Google OAuth integration is pending.  

✅ **Admin Panel**  
- Fully implemented.  
- Allows control over events and user roles.  

✅ **Discord Bot Integration (Planned)**  
- The bot will post new events automatically to a Discord channel.  

## Needs Implementation  

🔹 **Google Calendar Integration**  
- "Add to Google Calendar" button needs API integration.  

🔹 **Google OAuth for Login**  
- Email restriction is in place, but OAuth is not implemented yet.  

🔹 **Discord Bot Integration**  
- Future update to automate event posts in Discord.  

## Tech Stack  

- **MongoDB** – Database for event data and user information.  
- **Express.js** – Backend framework for API and server logic.  
- **React.js** – Frontend library for building the UI.  
- **Node.js** – Backend runtime environment.  
- **Chakra UI** – Component library for UI accessibility & styling.  
- **Google Calendar API (Planned)** – For event integration.  

## Testing Admin Account  

- **Email:** `test1@gmail.com`  
- **Password:** `test321`  

## Known Issues  

⚠️ **Google Calendar Button** – Currently non-functional.  
⚠️ **Google OAuth Login** – Pending OAuth integration.  