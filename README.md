# Introduction & Environment

I've designed the app from the bottom, but of course not without some dependencies which i value a lot. All the dependencies are listed below and i will also share my developer environment if needed below. As i don't own a macbook, The only version I will release is for android.

## Environment

- **OS**
    
    - Arch Linux - 5.16.4-zen  kernel.
- **Android Studio**
    
    - Bumblebee v2021.1.1
- **Visual Studio Code**
    
    - Version 1.63.2
- **Java Runtime (JRE) - Build 17.0.1+12**
    
    - Version 11.0.11+0-b60-7590822 amd64
- **Java Developmen Kit (JDK) - Build 17.0.1+12**
    
    - 64 Bit
    
    # Setup step by step

- **Step 1**

Start out with getting all the dependencies etc. installed by running the command `Yarn` or `npm install`.

- **Step 2**

Check the environment for possible need at [reactnative.dev](https://reactnative.dev/docs/environment-setup).

- **Step 3**

Run the javascript server first with `npx react-native start` & then run the application, wither over adb or as an emulator with `npx react-native run-android`.

# Mandatory & useful extension Dependencies

- [react](https://www.npmjs.com/package/react)
- [react-native](https://www.npmjs.com/package/react-native)
- [react-native-divider](https://www.npmjs.com/package/react-native-divider)
- [react-native-gifted-chat](https://www.npmjs.com/package/react-native-gifted-chat)
- [react-native-keyboard-aware-scroll-view](https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view)
- [react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context)
- [react-native-screens](https://www.npmjs.com/package/react-native-screens)
- [react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen)
- [react-native-svg](https://www.npmjs.com/package/react-native-svg)
- [react-native-vector icons](https://www.npmjs.com/package/react-native-vector-icons)
- [firebase](https://www.npmjs.com/package/firebase)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/runtime](https://www.npmjs.com/package/@babel/runtime)
- [@react-native-community/eslint-config](https://www.npmjs.com/package/@react-native-community/eslint-config)
- @types/firebase
- [@types/react-native](https://www.npmjs.com/package/@types/react-native)
- @types/react-native-vector-svg
- [eslint](https://www.npmjs.com/package/eslint)
- [metro-react-native-babel-preset](https://www.npmjs.com/package/metro-react-native-babel-preset)
- [typescript](https://www.npmjs.com/package/typescript)
- [@types/react](https://www.npmjs.com/package/@types/react)

# UI/Component Dependencies

- [@eva-design/eva](https://www.npmjs.com/package/@eva-design/eva)
- [@ui-kitten/components](https://www.npmjs.com/package/@ui-kitten/components)
- [@ui-kitten/eva-icons](https://www.npmjs.com/package/@ui-kitten/eva-icons)
- [@ui-kitten/metro-config](https://www.npmjs.com/package/@ui-kitten/metro-config)

# Bugs & future fixes

- [x] The Textinput in the chat area has white text.
- [x] Google & Facebook does not work yet.
