
import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import ProductSell from './ProductSell';
import BuyProductList from './BuyProductList';
import DetailProduct from './DetailProduct';
import MyPurchaseList from './MyPurchaseList';
import CameraApp from './CameraApp';
import Wallpaper from './Wallpaper';

const AppNavigator = createStackNavigator({
  Login:        { screen: Login },
  Home:         { screen: Home },
  Registration:     { screen: Registration },
  ProductSell:  { screen: ProductSell },
  BuyProductList:  { screen: BuyProductList},
  DetailProduct: { screen: DetailProduct},
  MyPurchaseList: {screen:MyPurchaseList},
  Wallpaper:    {screen: Wallpaper},
  CameraApp:  { screen: CameraApp}
});

const Navigation = createAppContainer(AppNavigator);

export default Navigation;
