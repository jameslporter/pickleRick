import { Platform, StyleSheet, FlatList } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Button, ThemeProvider, ListItem, Image } from 'react-native-elements';
const styles = StyleSheet.create({
    list: {
      width: '100%',
      backgroundColor: '#000',
    },
    item: {
      aspectRatio: 1,
      width: '100%',
      flex: 1,
    },
  });
const renderCharacter = ({item} :{item:any}) => (
    <ListItem key={item.id} bottomDivider onPress={()=>{
      
    }}>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.species}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Content>
      <Image
        source={{ uri: item.image }}
        containerStyle={styles.item}
        />
      </ListItem.Content>
    </ListItem>
  )

export default function LocationDetailsScreen({ route, navigation }: RootTabScreenProps<'TabOne'>) {
    let data = route.params;
    console.log(route.params)
    return (<ThemeProvider>
        <ListItem.Content>
        <ListItem.Title>{data.name}</ListItem.Title>
        <ListItem.Subtitle>{data.type}</ListItem.Subtitle>
      </ListItem.Content>
      <FlatList
      keyExtractor={(location) => location.id.toString()}
      initialNumToRender={20}
      data={data.residents}
      renderItem={renderCharacter}
      ></FlatList>
    </ThemeProvider>);
}