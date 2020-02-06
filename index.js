/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import Navigation from './pages/Navigation'
// import BuyProductList from './pages/BuyProductList';
// import ProductSell from './pages/ProductSell';
// import DevTools from './pages/DeveTools';
import {name as appName} from './app.json';
// import Wallpaper from './pages/Wallpaper';
// import MyPurchaseList from './pages/MyPurchaseList';
// import CameraApp from './pages/CameraApp';
// import Home from './pages/Home';
// import { NativeViewGestureHandler } from 'react-native-gesture-handler';
// import Login from './pages/Login';

AppRegistry.registerComponent(appName, () => Navigation);
