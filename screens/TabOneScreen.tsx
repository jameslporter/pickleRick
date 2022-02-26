import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button, ThemeProvider, ListItem } from 'react-native-elements';
import {
  useQuery,
  gql
} from "@apollo/client";
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const query = gql`query GetLocations($page:Int){
    locations(page:$page){
      results{
        id name type dimension
        residents{
          id name species image
        }
      }
    }
  }`
  const renderLocation = ({item} :{item:any}) => (
    <ListItem key={item.id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.id} - {item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
  const [page,setPage] = useState(1)
  const { loading, error, data, fetchMore } = useQuery(query,{variables:{page}});
  if (loading) return <View>
  <Text style={styles.title}>loading</Text></View>;
  if (error) return <View>
  <Text style={styles.title}>Error</Text></View>;
  return (<ThemeProvider>
    <Button title={page.toString()} />
    <Text>{page}</Text>
    <FlatList data={data.locations.results} renderItem={renderLocation} onEndReached={()=>{
      fetchMore({
        variables: {
          page: page+1
        },
      })
      setPage(page+1);
    }}
    onEndReachedThreshold={.5}
    >

    </FlatList>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
