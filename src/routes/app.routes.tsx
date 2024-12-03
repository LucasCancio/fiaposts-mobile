import { Platform } from "react-native";
import { useTheme } from "native-base";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import Plus from "@assets/plus.svg";

import { Home } from "@screens/Home";
import { Post } from "@screens/Post";
import { Administration } from "@screens/Administration";
import { Profile } from "@screens/Profile";
import { SavePost } from "@screens/SavePost";
import { useAuth } from "@hooks/useAuth";
import { TableProperties } from "lucide-react-native";

type AppRoutes = {
  home:
    | {
        refresh: boolean;
      }
    | undefined;
  post: {
    postId: number;
  };
  savePost: {
    postId?: number;
  };
  profile: undefined;
  administration: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const { user } = useAuth();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
        unmountOnBlur: true,
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      {user?.isTeacher && (
        <>
          <Screen
            name="savePost"
            initialParams={{ postId: undefined }}
            component={SavePost}
            options={{
              tabBarIcon: ({ color }) => (
                <Plus color={color} width={iconSize} height={iconSize} />
              ),
            }}
          />

          <Screen
            name="administration"
            component={Administration}
            options={{
              tabBarIcon: ({ color }) => (
                <TableProperties
                  color={color}
                  width={iconSize}
                  height={iconSize}
                />
              ),
            }}
          />
        </>
      )}

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="post"
        component={Post}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
