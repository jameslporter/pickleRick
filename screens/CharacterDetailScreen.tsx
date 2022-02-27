import { StyleSheet, FlatList, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import { ThemeProvider, ListItem, Image, Text } from 'react-native-elements';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
const client = new ApolloClient({
  uri: 'https://2fdc-216-62-160-73.ngrok.io/graphql',
  cache: new InMemoryCache()
});
const getNotesQuery = gql`query getNotes($userId: ID!, $characterId: String!) {
  getMyNotes(userID: $userId,characterID: $characterId) {
    characterID body userID
  }
}`
const updateNoteQuery = gql`mutation UpdateNote($input: NoteInput!) {
  updateNote(input: $input) {
    characterID body
  }
}`
const createNoteQuery = gql`mutation CreateNote($input: NoteInput!) {
  createNote(input: $input) {
    characterID body
  }
}`
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
    let character = route.params;
    console.log(route.params)
    navigation.setOptions({title:character.name})
    const { loading, error, data, fetchMore } = useQuery(getNotesQuery,{variables:{"userId": "1234mongo","characterId":"34"},'client':client});
    if (loading) return <View>
    <Text style={styles.title}>loading</Text></View>;
    if (error){
      console.log(error)
      return <View>
    <Text style={styles.title}>Error</Text></View>;
    } 
    console.log(data)
    return (<ThemeProvider>
        <ListItem.Content>

        <Image
            source={{ uri: character.image }}
            containerStyle={styles.item}
            />
        </ListItem.Content>

        <Text h3>Species: {character.species}</Text>
        <Text h3>Gender: {character.gender}</Text>
        <Text h3>Status: {character.status}</Text>
        <Text h3>Episodes:</Text>
        <FlatList
      keyExtractor={(location) => location.id.toString()}
      initialNumToRender={20}
      data={character.episode}
      renderItem={renderEpisode}
      ></FlatList>
    </ThemeProvider>);
}