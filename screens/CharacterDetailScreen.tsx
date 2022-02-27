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
      flex: 1,
    },
});

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
        <Text h2>{data.species}</Text>
    </ThemeProvider>);
}