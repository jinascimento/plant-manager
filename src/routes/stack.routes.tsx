import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../pages/Welcome";
import { Confirmation } from "../pages/Confirmation";
import { UserIdentification } from "../pages/UserIdentification";
import AuthRoutes from "./tab.routes";
import { NewPlant } from "../pages/NewPlant";

import colors from "../styles/colors";
import { MyPlants } from "../pages/MyPlants";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <stackRoutes.Screen name="Welcome" component={Welcome} />
    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <stackRoutes.Screen name="Confirmation" component={Confirmation} />
    <stackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
    <stackRoutes.Screen name="NewPlant" component={NewPlant} />
    <stackRoutes.Screen name="MyPlants" component={AuthRoutes} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
