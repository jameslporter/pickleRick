import { StyleSheet, FlatList } from 'react-native';
import { RootTabScreenProps } from '../types';
import { ThemeProvider, ListItem, Image, Text } from 'react-native-elements';
const styles = StyleSheet.create({
    list: {
      width: '100%',
      backgroundColor: '#000',
    },
    item: {
      aspectRatio: 1,
      flex: 1,
    },
});
const renderEpisode = ({item} :{item:any}) => (
    <ListItem key={item.id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
)
export default function CharacterDetailScreen({ route, navigation }: RootTabScreenProps<'TabOne'>) {
    let data = route.params;
    console.log(route.params)
    navigation.setOptions({title:data.name})
    return (<ThemeProvider>
        <ListItem.Content>

        <Image
            source={{ uri: data.image }}
            containerStyle={styles.item}
            />
        </ListItem.Content>

        <Text h3>Species: {data.species}</Text>
        <Text h3>Gender: {data.gender}</Text>
        <Text h3>Status: {data.status}</Text>
        <Text h3>Episodes:</Text>
        <FlatList
      keyExtractor={(location) => location.id.toString()}
      initialNumToRender={20}
      data={data.episode}
      renderItem={renderEpisode}
      ></FlatList>
    </ThemeProvider>);
}