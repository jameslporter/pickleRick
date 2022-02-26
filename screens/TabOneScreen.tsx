import { StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button, ThemeProvider, ListItem } from 'react-native-elements';
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
          id name species image
        }
      }
    }
  }`
  const { loading, error, data } = useQuery(query);
  if (loading) return <View>
  <Text style={styles.title}>loading</Text></View>;
  if (error) return <View>
  <Text style={styles.title}>Error</Text></View>;
  return (<ThemeProvider>
    <Button title="Hey!" />
    <ScrollView>
  {
    data.locations.results.map((l:any, i:any) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{l.name}</ListItem.Title>
          <ListItem.Subtitle>{l.type}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    ))
  }
    </ScrollView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
