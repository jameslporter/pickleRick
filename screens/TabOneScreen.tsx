import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button, ThemeProvider } from 'react-native-elements';
import {
  useQuery,
  gql
} from "@apollo/client";
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const query = gql`{
    locations{
      results{
        id name type dimension
        residents{
          id name species
        }
      }
    }
  }`
  const { loading, error, data } = useQuery(query);
  if (loading) return <View style={styles.container}>
  <Text style={styles.title}>loading</Text></View>;
  if (error) return <View style={styles.container}>
  <Text style={styles.title}>Error</Text></View>;
  console.log(data);
  /*
  */
  return (<ThemeProvider>
    <Button title="Hey!" />
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
