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
          id name status type gender origin{name} location { name } episode {id name } species image
        }
      }
    }
  }`
  const renderLocation = ({item} :{item:any}) => (
    <ListItem key={item.id} bottomDivider onPress={()=>{
      navigation.navigate('LocationDetailsScreen',item)
    }}>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
  const [page,setPage] = useState(1)
  const [locations, setLocations] = useState([]);
  const { loading, error, data, fetchMore } = useQuery(query,{variables:{page}});
  if (loading) return <View>
  <Text style={styles.title}>loading</Text></View>;
  if (error) return <View>
  <Text style={styles.title}>Error</Text></View>;
  //console.log(data)
  if(locations.length == 0)
    setLocations(data.locations.results);
  let endReached = false;
  return (<ThemeProvider>
    <FlatList
      keyExtractor={(location) => location.id.toString()}
      initialNumToRender={20}
      data={locations}
      renderItem={renderLocation}
      onEndReached={()=>{
        if(!endReached){
          const more = fetchMore({
            variables: {
              page: page+1
            },
          })
          more.then((v)=>{
            console.log(v.data.locations.results);
            setLocations(locations.concat(v.data.locations.results))
            if(v.data.locations.results.length < 20){
              endReached=true
            }else{
              setPage(page+1);
            }
          })
        }
      }}
      onEndReachedThreshold={.7}
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
