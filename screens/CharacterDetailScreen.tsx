import { StyleSheet, FlatList, View, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { RootTabScreenProps } from '../types';
import { ThemeProvider, ListItem, Image, Text, Icon, Button } from 'react-native-elements';
import { ApolloClient, InMemoryCache, gql, useQuery, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v1 as uuidv1 } from 'uuid';

const storeData = async (key:string,value:string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log(e)
  }
}
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
    },
    item: {
      flex: 1,
      width: '100%',
      resizeMode: 'contain',
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
    const [getID, setID] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [noteText,setNoteText] = useState('')
    let mutationOptions = {'client':client,refetchQueries: [getNotesQuery, 'getNotes']}
    const [updateNote, { updateNoteData }] = useMutation(updateNoteQuery,mutationOptions);
    const [createNote, { createNoteData }] = useMutation(createNoteQuery,mutationOptions);
    let character = route.params;
    const getData = (key:string) => {
      AsyncStorage.getItem(key).then((value)=>{
        console.log('async value',value)
        if(value != null){
          setID(value);
        }else{
          let newID = uuidv1();
          setID(newID)
          storeData(key,newID)
        }
      })
    }
    function save(){
      if(data.getMyNotes.length > 0){
        updateNote({variables:{input:{body:noteText,characterID:character.id,userID:getID}}})
      }else{
        createNote({variables:{input:{body:noteText,characterID:character.id,userID:getID}}})
      }
      setEditMode(false)
    }
    function edit(){
      setEditMode(true)
    }
    getData('uniqueID')
    console.log(route.params)
    navigation.setOptions({title:character.name})
    console.log(getID,character.id);
    const { loading, error, data, fetchMore } = useQuery(getNotesQuery,{variables:{"userId": getID,"characterId":character.id},'client':client});
    if (loading) return <View>
    <Text>loading</Text></View>;
    if (error){
      console.log(error)
      return <View>
    <Text>Error</Text></View>;
    }
    let text = ''
    if(data.getMyNotes.length > 0) text = data.getMyNotes[0].body
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
        {character.episode.length > 0 ?
        <View>
        <Text h3>Episodes:</Text>
        <FlatList
        keyExtractor={(location) => location.id.toString()}
        initialNumToRender={20}
        data={character.episode}
        renderItem={renderEpisode}
        style={{height:200,flexGrow: 0}}
        ></FlatList>
        </View>: <View><Text h3>No episode information available.</Text></View>
      }
      {editMode === true ?
        <View>
          <TextInput multiline={true} onChangeText={(value)=>setNoteText(value)} numberOfLines={5} defaultValue={text} style={{ height:100, textAlignVertical: 'top',borderColor:'black',borderWidth:1}}></TextInput>
          <Button onPress={save} title='Save Note' />
        </View>: <View></View>
      }
        
      { data.getMyNotes.length > 0 ?
      <View>
        <Text h3>Notes:</Text>
        <Text h4>{data.getMyNotes[0].body}</Text><Icon onPress={edit} name="edit"/>
      </View>
      : <View><Text>No note.</Text><Icon onPress={edit} name="edit"/></View>}
      <View></View>
    </ThemeProvider>);
}