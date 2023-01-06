![Shenanigames header](/src/components/nav/header.shenanigames.png)

# ShenaniGAMES

**ShenaniGAMES** is an application that displays a wide collection of tabletop games. Users can build and display their own collection of games or make a wish list to store a list of games the user doesn’t yet have. Admin users have the ability to add new games to be displayed by the app or edit existing games on the app.

## Current Features

- Discover Games Page

![Screenshot Discover Page Admin View](/src/images/screenshot-dicover-page-admin-view.jpg)

- User Collection Page

![Screenshot User Collection Page](/src/images/screenshot-user-collection-page.jpg)

- User Wish List Page

![Screenshot User Wish List Page](/src/images/screenshot-user-wish-list-page.jpg)

- Community List (Users) Page

![Screenshot Community Page](/src/images/screenshot-community-page.jpg)

- Add New Game Component

![Screenshot Add Game Component](/src/images/screenshot-add-game-component.jpg)

- Edit Game Component

![Screenshot Edit Game Component](/src/images/screenshot-edit-game-component.jpg)

## Future Features

- Ability to view other users' collections and wish lists
- Create functioning buttons to sort by various methods
- Link with each game to go to site to purchase game

## How to Use

To clone and run this application, you'll need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/download/) which comes with [npm](https://www.npmjs.com/) installed on your computer. From your command line:

<!-- `# Clone this repository` -->
`$ git clone git@github.com:dhollifield/e20-capstone-shenanigames.git`

<!-- `# Go into the repository -->
`$ cd e20-capstone-shenanigames/`

<!-- `# Install dependencies` -->
`$ npm install`

<!-- `# Go into the data folder and run database on localhost -->
`$ cd data/`
`$ json-server -p 8088 -w shenanigames-db.json`

Ctrl+click on the link in the terminal to view the JSON in your browser.

<!-- `# Navigate back and run the app` -->
`$ cd ..`
`$ npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Acknowledgements

Special thanks goes out to Lead Instructor [Lynn Samuelson](https://github.com/lynnsamuelson), Junior Instructors [Sydney Noh](https://github.com/TheByteSizeDev) and [Trevor Guinn](https://github.com/trev-of-ev) and the many fine people making up the E20 Cohort of [Nashville SoftWare School](https://github.com/nss-evening-web-development).

## License

MIT License

Copyright (c) [2022] [Deanna Hollifield](https://github.com/dhollifield)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.