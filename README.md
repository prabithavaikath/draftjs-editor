# Draft.js Custom Editor

This project is a **ReactJS-based text editor** built with **Draft.js**, featuring custom formatting rules. The editor allows users to apply styles dynamically by typing specific characters at the beginning of a line, followed by a space.

## Features

- **Custom Formatting Rules:**
  - Typing `#` followed by a space applies a **Heading** style to the line.
  - Typing `*` followed by a space applies **Bold** formatting to the text.
  - Typing `**` followed by a space changes the text color to **Red**.
  - Typing `***` followed by a space applies **Underline** formatting.
- **Data Persistence:**
  - Pressing the **Save** button saves the editor's content to `localStorage`.
  - The editor automatically reloads saved content on page refresh.

## Installation and Setup

Follow these steps to run the project locally:

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 17+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository

git clone https://github.com/prabithavaikath/draftjs-editor.git
cd draftjs-editor

### 2. Install Dependencies
Install the required dependencies using npm or yarn:

npm install

yarn install



### 3. Run the Application
Start the development server:

npm start
or

yarn start

The app will be available at `http://localhost:3000/` in your browser.



### 4. Build for Production
To create a production build of the project:

npm run build

The output will be in the `build/` directory.

## Usage Instructions

### Formatting Rules
1. **Heading:**
   - Type `#` followed by a space to apply a heading style. The `#` will disappear, and the text will be formatted as a heading.
2. **Bold:**
   - Type `*` followed by a space to apply bold formatting. The `*` will disappear, and the text will appear bold.
3. **Red Text:**
   - Type `**` followed by a space to change the text color to red. The `**` will disappear, and the text will appear red.
4. **Underline:**
   - Type `***` followed by a space to underline the text. The `***` will disappear, and the text will appear underlined.

### Save and Reload
- After typing content, press the **Save** button to persist the content in `localStorage`.
- Refresh the page, and the editor will reload the saved content automatically.


## Dependencies

The project uses the following dependencies:
- **React**: JavaScript library for building user interfaces.
- **Draft.js**: Rich text editor framework for React.
- **React Scripts**: Provides default configuration for React apps.
- **CSS**: For custom styling.


