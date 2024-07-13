import { OneSignal } from "react-native-onesignal";

// UMA ÚNICA TAG
export function tagUserEmailCreate(email: string) {
  OneSignal.User.addTag('user_email', email)
}

export function tagUserEmailRemove() {
  OneSignal.User.removeTag('user_email')
}

// VÁRIAS TAGS
export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: 'Lubni Morais',
    user_email: 'lubnidev@gmail.com',
  })
}