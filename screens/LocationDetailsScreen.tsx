import { Platform, StyleSheet, FlatList } from 'react-native';
import { RootTabScreenProps } from '../types';
import { Button, ThemeProvider, ListItem, Image, Text } from 'react-native-elements';
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

export default function LocationDetailsScreen({ route, navigation }: RootTabScreenProps<'TabOne'>) {
    const renderCharacter = ({item} :{item:any}) => (
        <ListItem key={item.id} bottomDivider onPress={()=>{
            navigation.navigate('CharacterDetailScreen',item)
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
    let data = route.params;
    console.log(route.params)
    navigation.setOptions({title:data.name})
    return (<ThemeProvider>
        <Text h3>Type: {data.type}</Text>

      { data.residents.length > 0 ?
      <FlatList
      keyExtractor={(location) => location.id.toString()}
      initialNumToRender={20}
      data={data.residents}
      renderItem={renderCharacter}
      ></FlatList>
      : <Text h4>No characters documented yet.</Text>
    }
    </ThemeProvider>);
}