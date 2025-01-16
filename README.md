# Club Website

This project is a website for a club, designed based on a [Figma design](https://www.figma.com/proto/mPwmGIqylFV2Al63Zff5EG/Club-Website?node-id=4%3A3&scaling=scale-down&page-id=0%3A1&starting-point-node-id=4%3A3) created by a fellow club member. The website is designed to manage and display events for the club, providing an intuitive interface for users. The site is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Chakra UI for the front-end user interface.

## Features

- **Responsive Design**: The website is designed to work on both desktop and mobile devices, though some features (like the navbar) currently do not function properly in mobile view.
- **Event Listing**: Events are displayed in a calendar view, filtered by the chosen month, allowing users to easily see upcoming events for the selected time period.
- **Event Creation**: There is a hidden page (`/create`) where you can create new events for the club.
- **Slideshow**: The slideshow currently just runs through raw data as a placeholder. In the future, it should grab today's event and display their information.

## Tech Stack

- **MongoDB**: For database management, storing event data, and user information.
- **Express.js**: Backend web framework for handling server-side logic and API routes.
- **React.js**: Frontend JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime for building the backend server.
- **Chakra UI**: React component library for building the user interface with a focus on accessibility and user experience.

## Known Issues

- The navbar is not functioning in mobile view. This is a known issue and will be addressed in future updates.
- Some functionality is incomplete, and some features may not be working as intended, including the slideshow which currently only runs through placeholder data.

## How to Access the Hidden Page

To create new events, visit the `/create` page. This page is not linked from the main navigation, so you will need to manually enter the URL.
