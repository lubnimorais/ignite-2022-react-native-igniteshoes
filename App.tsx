import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { OneSignal} from 'react-native-onesignal';

import { Routes } from './src/routes';

import { tagUserEmailCreate } from './src/notificiations/notificationsTags';

import { THEME } from './src/theme';

import { CartContextProvider } from './src/contexts/CartContext';

import { Loading } from './src/components/Loading';


const oneSignalAppId = Platform.OS === 'ios' ? '' : '09fdc346-ed69-44eb-90fc-bd298aa440aa'

OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserEmailCreate('lubnidev@gmail.com')

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}