# SocialCake

### What is SocialCake

SocialCake allows content creators of all kinds to sell digital goods directly to their audience. Artists, musicians, writers, and more can sell digital content simply by sharing a message.

### How it Works

Using SocialCake is easy. First, users can upload a file and specify how much the file costs, what address should receive payments, and how many Mosaics should be created for the file in question (or unlimited). Then, the file will be uploaded to SocialCake’s Firebase database (in the future we plan to decentralize this by using a blockchain storage platform) and a Mosaic is created in the “socialcake” namespace.

This Mosaic is very important because it’s description includes the file name, last modified date, the file’s MD5 and SHA1 hashes, and a levy to credit the user in the event of a sale. The file hashes in the description are especially critical because they serve as proof of ownership for the file in question, and can be used to assert the integrity of the file they download at any time. The app then displays a unique ID that can be shared to purchase the file.

When a buyer comes along to purchase the file, they simply send a payment of the specified amount to SocialCake’s NEM address and include the unique ID in the message body. In return, the buyer will automatically receive a Mosaic with an encrypted message containing the download link for their file. The levy on the Mosaic will deduct the fees from SocialCake and fund the original uploader. This is a great way to guarantee that the profits from the transaction go directly to the creator.  

### Screenshots

<p align='center'><img src='https://i.imgur.com/bOFdkvl.jpg' width='800' alt='SocialCake upload'></p><br />

<p align='center'><img src='https://i.imgur.com/jSWHimx.jpg' width='800' alt='SocialCake share'></p>

### Tech Stack

This project was bootstraped with [React Firebase Starter][rfs] by [Kriasoft][kriasoft].

* [Create React App][cra] for development and test infrastructure (see [user guide][cradocs])
* [Material UI][mui] to reduce development time by integrating Google's [Material Design][material]
* [Styled Components][sc] for component friendly CSS styles ([docs][scdocs])
* [Firebase][firebase] for serverless architecture, authentication and free CDN hosting ([docs][fbdocs])
* [Universal Router][router] + [history][history] for declarative routing and client-side navigation

### Directory Layout

```bash
├── node_modules/                  # 3rd-party libraries and utilities
├── public/                        # Static files such as favicon.ico etc.
├── src/                           # Application source code
│   ├── components/                # Shared React components
│   ├── nem/                       # Nem utilities and services
│   ├── routes/                    # Components for pages/screens + routing information
│   ├── auth.js                    # Authentication manager
│   ├── history.js                 # Client-side navigation manager
│   ├── index.js                   # <== Application entry point (main) <===
│   ├── registerServiceWorker.json # This list of application routes
│   ├── relay.js                   # Relay Modern client
│   ├── graphql.schema             # GraphQL schema obtained from a GraphQL API
│   └── theme.js                   # Overrides for Material UI default styles
├── package.json                   # The list of project dependencies + NPM scripts
└── setup.js                       # Customizations for create-react-app
```

### Prerequisites

* [Node.js][nodejs] v8.9 or higher + [Yarn][yarn] v1.3 or higher &nbsp; (_HINT: On Mac install
  them via [Brew][brew]_)
* [VS Code][vc] editor (preferred) + [Project Snippets][vcsnippets], [EditorConfig][vceditconfig],
  [ESLint][vceslint], [Flow][vcflow], [Prettier][vcprettier], and [Babel JavaScript][vcjs] plug-ins

### Getting Started

Just clone the repo and start hacking:

```bash
$ git clone https://github.com/amrue/SocialCake.git MyApp
$ cd MyApp
$ yarn install                     # Install project dependencies listed in package.json
$ yarn start                       # Compiles the app and opens it in a browser with "live reload"
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

<p align='center'><img src='https://camo.githubusercontent.com/506a5a0a33aebed2bf0d24d3999af7f582b31808/687474703a2f2f692e696d6775722e636f6d2f616d794e66434e2e706e67' width='600' alt='npm start'></p>

### How to Test

```bash
$ yarn lint                        # Check JavaScript and CSS code for potential issues
$ yarn fix                         # Attempt to automatically fix ESLint warnings
$ yarn test                        # Run unit tests. Or, `yarn test -- --watch`
```

### How to Deploy

```bash
$ yarn build                      # Build the app for production
$ firebase deploy                 # Deploy to Firebase
```

### License

Copyright © 2018-present SocialCake. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/SocialCake/SocialCake/blob/master/LICENSE.txt) file.

---

♥

[rfs]: https://github.com/kriasoft/react-firebase-starter
[kriasoft]: https://www.kriasoft.com/
[cra]: https://github.com/facebookincubator/create-react-app
[mui]: https://material-ui-next.com/
[material]: https://material.io/
[cradocs]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
[html]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css]: https://developer.mozilla.org/en-US/docs/Web/CSS
[js]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[es2015]: http://babeljs.io/learn-es2015/
[react]: https://facebook.github.io/react/
[relay]: https://facebook.github.io/relay/
[firebase]: https://firebase.google.com/
[fbdocs]: https://firebase.google.com/docs/web
[router]: https://github.com/kriasoft/universal-router
[history]: https://github.com/ReactTraining/history
[sc]: https://www.styled-components.com/
[scdocs]: https://www.styled-components.com/docs
[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[brew]: https://brew.sh/
[wm]: https://facebook.github.io/watchman/
[relaycompiler]: http://facebook.github.io/relay/docs/relay-compiler.html
[vc]: https://code.visualstudio.com/
[vcsnippets]: https://marketplace.visualstudio.com/items?itemName=rebornix.project-snippets
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[vcflow]: https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode
[vcprettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[vcjs]: https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel
