## Table of Contents

-   [Indecision App](#indecision-app)
    -   [Getting Started](#getting-started)
        -   [Installation](#installation)
    -   [Running the tests](#running-the-tests)
    -   [Design Considerations](#design-considerations)
    -   [Built With](#built-with)
    -   [Acknowledgements](#acknowledgements)
    -   [Contact](#contact)

# Indecision App

A simple app that will randomly pick a choice for you based on the options that you've provided.

Built with [React v17](https://reactjs.org/) (create-react-app) and [MUI](https://mui.com/).

**URL:** https://par-indecision-app-v2.herokuapp.com/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

Follow below steps to setup the project on your local machine.

1.  Clone the project
    ```
    git clone https://github.com/kayepar/indecision-app-v2
    ```
2.  Get project dependencies
    ```
    yarn install
    ```
3.  Build the app for development and run the server

    ```
    yarn start
    ```

    A new browser tab should be automatically opened for you with the URL, http://localhost:3000/.

## Running the tests

-   Start automated tests

    ```
    yarn test
    ```

    ** Example result: **

    ```
    PASS  src/tests/components/AddForm.test.js (11.176 s)
    PASS  src/tests/components/OptionsMenu.test.js (12.678 s)
    PASS  src/tests/components/ConfirmationModal.test.js (13.526 s)
    PASS  src/tests/components/ActionModal.test.js
    PASS  src/tests/components/ActionButton.test.js
    PASS  src/tests/components/Options.test.js
    PASS  src/tests/components/Header.test.js
    PASS  src/tests/reducers/pickedOptionReducer.test.js
    PASS  src/tests/reducers/paginationReducer.test.js
    PASS  src/tests/reducers/optionsReducer.test.js
    PASS  src/tests/components/Option.test.js
    PASS  src/tests/components/OptionsFooter.test.js (21.808 s)

    Test Suites: 12 passed, 12 total
    Tests:       64 passed, 64 total
    Snapshots:   0 total
    Time:        24.227 s, estimated 50 s
    Ran all test suites.
    ```

## Design Considerations

While working on the app, I wanted to learn more about how rendering works and how to optimize the code in such a way that there were no needless re-rendering of components. I've read quite a few articles on best practices and utilities and one of the tricks that I've picked up was a tool called [WDYR](https://github.com/welldone-software/why-did-you-render) (Why Did You Render). WDYR notifies you why a component is rendered therefore giving you a clue on how you could potentially avoid a re-render if it is unnecessary.

WDYR is active in development only and for it to work properly, I had to use [CRACO](https://github.com/gsoft-inc/craco) and modify some of Babel's config. So instead of seeing the usual `react-scripts start` in package.json, the app uses the script `craco start` instead.

For the state management, I have tried making use of the `context API` but then later scrapped the idea. I have learned that the best use case for the API is for states that do not change too often (i.e. theme, authentication) and I don't have those in the app. Also, I noticed that I kept on having re-renders because that is just the way it is with contexts - all the components under the context will re-render if one of the state values changes.

I then switched to `useState` and `useReducer`. I find the combination of these two hooks gets the job done because this is just a simple app, to begin with. The code for the context API is still there, though, mostly for my reference.

## Built With

-   [React](https://reactjs.org/) - Front-end JS library
-   [yarn](https://yarnpkg.com/) - Package management
-   [Jest](https://jestjs.io/) - Testing framework
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utility
-   [Material UI](https://mui.com/) - Front-end framework

## Acknowledgements

-   [Heroku](https://www.heroku.com/)
-   [Why Did You Render](https://github.com/welldone-software/why-did-you-render)
-   [CRACO](https://github.com/gsoft-inc/craco)

## Contact

Catherine Par - kaye.cenizal@gmail.com

LinkedIn - https://www.linkedin.com/in/catherine-par-bbba221a2/
