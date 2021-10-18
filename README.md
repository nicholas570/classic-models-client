<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This application is a authentication form page. So far, there is no server endpoint. Credentials are "mylogin" and "mypassword".
The purpose is to handle the authentication process and state in several finite state machines using Xstate.

### Built With

- [React](https://reactjs.org/)
- [Xstate](https://xstate.js.org/)
- [Material UI](https://mui.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- node > 12
  ```sh
  npm install node@latest -g
  ```

### Installation <br/>

Also works with Yarn

1. Clone the repo
   ```sh
   git clone https://github.com/nicholas570/xstate-auth.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the server
   ```sh
   npm start
   ```

<!-- ENV -->

### Env

Needed to enable hot reloading with CRA 4+ <br/>

FAST_REFRESH=false
