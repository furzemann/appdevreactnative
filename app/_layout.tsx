import { Stack } from "expo-router";

export default function RootLayout() {
  return (<Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
    <Stack.Screen name="profile" options={{headerShown: false}}/>
    <Stack.Screen name="pages/[id]" options={{headerShown:false}}/>
    <Stack.Screen name="index" options={{headerShown:false}}/>
    <Stack.Screen name="+not-found"/>
  </Stack>);
}
