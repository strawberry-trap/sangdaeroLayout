import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Login: 'login',
        Interest: 'interest',
        Activity: 'activity',
        Request: 'request',
        Detail: 'detail',
        Mypage: 'mypage ',
      },
    },
  },
};
