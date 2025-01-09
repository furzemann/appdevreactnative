import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs>

      <Tabs.Screen
        name="index"
        options={{headerShown: false}}
      />
      <Tabs.Screen
      name='search'
        options={{headerShown: false}}
      />
<Tabs.Screen
      name='saved'
        options={{headerShown: false}}
      />
    </Tabs>
  );
}
