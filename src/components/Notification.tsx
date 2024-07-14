import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { HStack, Text, IconButton, CloseIcon, Icon, Pressable } from 'native-base';

import * as Linking from 'expo-linking';

import { Ionicons } from '@expo/vector-icons';

import { OSNotification } from 'react-native-onesignal';


type Props = {
  data: OSNotification;
  onClose: () => void;
}

type CustomOSNotification = {
  custom: any
  u: string
}

// type AdditionalDataProps = {
//   route?: string;
//   product_id?: string;
// }

export function Notification({ data, onClose }: Props) {
  // const navigation = useNavigation()

  const handleOnPress = useCallback(() => {
    // NAVEGANDO POR DEEP LINKING
    const { custom }: CustomOSNotification = JSON.parse(data.rawPayload.toString());
    const { u: uri }: CustomOSNotification = JSON.parse(custom.toString())
    
    if (uri) {
      Linking.openURL(uri)

      onClose()
    }


    // NAVEGAR POR ROTAS UTILIZANDO DADOS ADICIONAIS
    // const { route, product_id } = data.additionalData as AdditionalDataProps;

    // if (route === 'details' && product_id) {
    //   navigation.navigate("details", { productId: product_id })

    //   onClose();
    // }
  }, [])

  return (
    <Pressable
      w="full"
      p={4}
      pt={12}
      bgColor="gray.200"
      position="absolute"
      top={0}
      onPress={handleOnPress}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"  
      >
        <Icon as={Ionicons} name="notifications-outline" size={5} color="black" mr={2} />

        <Text fontSize="md" color="black" flex={1}>
          {data.title}
        </Text>

        <IconButton
          variant="unstyled"
          _focus={{ borderWidth: 0 }}
          icon={<CloseIcon size="3" />}
          _icon={{ color: "coolGray.600" }}
          color="black"
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}