import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { NotificationClickEvent, OneSignal} from 'react-native-onesignal';

import { Routes } from './src/routes';

import { tagUserInfoCreate } from './src/notificiations/notificationsTags';

import { THEME } from './src/theme';

import { CartContextProvider } from './src/contexts/CartContext';

import { Loading } from './src/components/Loading';
import { useEffect } from 'react';

const oneSignalAppId = Platform.OS === 'ios' ? '' : '09fdc346-ed69-44eb-90fc-bd298aa440aa'

OneSignal.initialize(oneSignalAppId);
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result;

      switch(actionId) {
        case "1":
          console.log('Ver todos');
          break;
        case "2":
          console.log('Ver pedido')
          break;
        default:
          console.log('Nenhum botão de ação selecionado')
          break;
      }
    }

    OneSignal.Notifications.addEventListener('click', handleNotificationClick)

    return () => OneSignal.Notifications.removeEventListener('click', handleNotificationClick)
  }, [])

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