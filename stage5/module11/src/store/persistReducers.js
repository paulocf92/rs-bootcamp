import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber', // storage key name
      storage: AsyncStorage, // localStorage (default storage)
      whitelist: ['auth', 'user'], // reducers (state) to store
    },
    reducers,
  );

  return persistedReducer;
};
