# React Native Simple Chat App

# Description :
this application uses React Native by exchanging data in realtime using websocket (socket.io)

Features:
* Google Maps Tracking
* Realtime Chat With Another Users

### Built With
* [React Native](https://facebook.github.io/react-native/)
* [Nodejs](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [React Navigation](https://reactnavigation.org/)
* [SocketIo](https://socket.io)
* [MySQL](https://mysql.com)
* [React-Native-Maps (Google Maps for React Native)](https://github.com/react-native-community/react-native-maps)

<!-- GETTING STARTED -->
## Getting Started

This Project has 2 repositories :
* [Frontend](https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps)
* [Backend](https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps-backend)

To setting this project in your devices follow these steps.

### Prerequisites

* npm
```sh
npm install npm@latest -g
```
```sh
npm install -g react-native-cli
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps.git
```
2. Clone the repo
```sh
git clone https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps-backend.git
```

3. Update some scrips:
- \android\app\src\main\AndroidManifest.xml
```
...
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="REPLACE_WITH_YOUR_GMAPS_API_KEY"/>
...
```
- \URL.js
```
const realURL = 'REPLACE_WITH_YOUR_BACKEND_DOMAIN'
```

then run npm install on each folders root

3. Install NPM packages
```sh
npm install
```

<!-- USAGE EXAMPLES -->
## Usage

1. Go to backend folder root and start the server
```sh
npm start
```
2. Make sure you have running android emulator then, go to the frontend folder root to start the app
```sh
react-native run-android
```
## Screenshot from the app
<p align='center'>
  <span>
  <img src='https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps/blob/master/screenshot/Screenshot_1563605090.png' width=200 />
  <img src='https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps/blob/master/screenshot/Screenshot_1563605112.png' width=200 />
  <img src='https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps/blob/master/screenshot/Screenshot_1563605123.png' width=200 />
  <img src='https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps/blob/master/screenshot/Screenshot_1563605138.png' width=200 />
  <img src='https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps/blob/master/screenshot/Screenshot_1563605147.png' width=200 />
  <img src='https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps/blob/master/screenshot/Screenshot_1563605152.png' width=200 />
  <img src='https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps/blob/master/screenshot/Screenshot_1563605155.png' width=200 />
  <img src='https://github.com/Lukm4nZ3r0/rn-chatapp-gmaps/blob/master/screenshot/Screenshot_1563605160.png' width=200 />
  </span>
</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
