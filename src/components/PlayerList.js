// @flow

import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {ListItem} from 'react-native-material-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Position from './Position';

export type Player = {|
  id: string,
  firstname: string,
  lastname: string,
  position: number,
  ultraPosition: number,
  teamId: number,
  quotation: number,
  club: string,
  stats: {
    avgRate: number,
    sumGoals: number,
    currentChampionship: number,
    percentageStarter: number,
  },
|};

type Props = {|
  playerList: $ReadOnlyArray<Player>,
  onPlayerSelected: (playerId: string) => void,
|};

export default (props: Props) => {
  const handleItemPress = (playerId: string) => {
    // on démonte tout
    console.log(playerId);
    props.onPlayerSelected(playerId);
  };

  return props.playerList.length > 0 ? (
    <FlatList
      data={props.playerList}
      renderItem={({item}) => (
        <ListItem
          divider
          style={{
            container: {
              height: 30,
            },
          }}
          dense={true}
          leftElement={<FontAwesome5 name={'user'} />}
          centerElement={{
            primaryText: item.lastname + ' ' + item.firstname,
          }}
          rightElement={<Position ultraPosition={item.ultraPosition} />}
          onPress={handleItemPress}
          onPressValue={item.id}
        />
      )}
      style={styles.list}
    />
  ) : (
    <Text style={styles.noResult}>
      Aucun joueur ne correspond à votre recherche
    </Text>
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    marginBottom: 30,
  },
  noResult: {
    margin: 10,
    textAlign: 'center',
  },
});
