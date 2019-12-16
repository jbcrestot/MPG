// @flow

import React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RadioButton, Toolbar} from 'react-native-material-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import mpgApi from '../modules/mpgApi';

import PlayerDetails from './PlayerDetails';
import PlayerList from './PlayerList';
import Error from './Error';
import type {NetworkError} from './Error';
import type {Player} from './PlayerList';

export default () => {
  const fetchedPlayerList = React.useRef([]);
  (fetchedPlayerList.current: Array<Player>);
  const [playerList, setPlayerList] = React.useState([]);
  (playerList: $ReadOnlyArray<Player>);
  const [apiError, setApiError] = React.useState(null);
  (apiError: NetworkError | null);
  const [nameFilter, setNameFilter] = React.useState('');
  (nameFilter: string);
  const [positionFilter, setPositionFilter] = React.useState(0);
  (positionFilter: number);
  const [playerDetailsId, setPlayerDetailsId] = React.useState('');
  (playerDetailsId: string);

  // did mount
  React.useEffect(() => {
    mpgApi
      .getPlayerList()
      .then(response => {
        fetchedPlayerList.current = response.data;
        setPlayerList(response.data);
      })
      .catch(response => setApiError(response.response));
  }, []);

  // filter by position
  const filterByPosition = React.useCallback(
    (fbpPlayerList: $ReadOnlyArray<Player>) =>
      positionFilter === 0
        ? fbpPlayerList
        : fbpPlayerList.filter(
            player => player.ultraPosition === positionFilter,
          ),
    [positionFilter],
  );

  // filter by name
  const filterByName = React.useCallback(
    (fbnPlayerList: $ReadOnlyArray<Player>): $ReadOnlyArray<Player> =>
      nameFilter === ''
        ? fbnPlayerList
        : fbnPlayerList.filter(
            player =>
              (player.lastname && player.lastname.includes(nameFilter)) ||
              (player.firstname && player.firstname.includes(nameFilter)),
          ),
    [nameFilter],
  );

  // will update filter content on user input
  const filterPlayer = React.useCallback(() => {
    if (fetchedPlayerList.current.length === 0) {
      return;
    }
    const filteredPlayersByPos = filterByPosition(fetchedPlayerList.current);
    const filteredPlayersByName = filterByName(filteredPlayersByPos);
    setPlayerList(filteredPlayersByName);
  }, [filterByPosition, filterByName]);

  React.useEffect(() => {
    filterPlayer();
  }, [filterPlayer]);

  const radioSpecifiStyle = {
    container: {
      flexDirection: 'column',
    },
    label: {fontSize: 10, marginLeft: 0},
  };

  const handlePlayerSelected = (playerId: string) => {
    setPlayerDetailsId(playerId);
  };

  const handleBackPress = () => {
    console.log('handleBackPress');
    setPlayerDetailsId('');
  };

  return (
    <View style={styles.container}>
      <Toolbar
        centerElement={
          <Text style={styles.title}>
            <FontAwesome5 name={'futbol'} style={styles.title} /> MPG test
          </Text>
        }
        style={{
          centerElementContainer: {
            alignItems: 'center',
          },
        }}
      />
      <View style={styles.filterInput}>
        <TextInput
          placeholder={'Nom du joueur'}
          onChangeText={(text: string) => setNameFilter(text)}
          style={styles.textInput}
        />
        <FontAwesome5 name={'search'} style={styles.search} />
      </View>
      <View style={styles.positionFilter}>
        <RadioButton
          label="Toutes"
          value={0}
          checked={positionFilter === 0}
          onSelect={value => setPositionFilter(value)}
          style={radioSpecifiStyle}
        />
        <RadioButton
          label="Gardien"
          value={10}
          checked={positionFilter === 10}
          onSelect={value => setPositionFilter(value)}
          style={radioSpecifiStyle}
        />
        <RadioButton
          label="Défenseur"
          value={20}
          checked={positionFilter === 20}
          onSelect={value => setPositionFilter(value)}
          style={radioSpecifiStyle}
        />
        <RadioButton
          label="Latéral"
          value={21}
          checked={positionFilter === 21}
          onSelect={value => setPositionFilter(value)}
          style={radioSpecifiStyle}
        />
        <RadioButton
          label="Milieu déf."
          value={31}
          checked={positionFilter === 31}
          onSelect={value => setPositionFilter(value)}
          style={radioSpecifiStyle}
        />
        <RadioButton
          label="Milieu off."
          value={32}
          checked={positionFilter === 32}
          onSelect={value => setPositionFilter(value)}
          style={radioSpecifiStyle}
        />
        <RadioButton
          label="Attaquant"
          value={40}
          checked={positionFilter === 40}
          onSelect={value => setPositionFilter(value)}
          style={radioSpecifiStyle}
        />
      </View>

      {playerDetailsId !== '' ? (
        <Modal
          transparent={true}
          visible={true}
          onRequestClose={handleBackPress}>
          <PlayerDetails id={playerDetailsId} onBackPress={handleBackPress} />
        </Modal>
      ) : fetchedPlayerList.current.length === 0 && playerList.length === 0 ? (
        <ActivityIndicator />
      ) : apiError ? (
        <Error error={apiError} />
      ) : (
        <PlayerList
          playerList={playerList}
          onPlayerSelected={handlePlayerSelected}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
  },
  filterInput: {
    borderColor: '#6e6e6e',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  textInput: {
    color: 'black',
    fontSize: 20,
    alignContent: 'center',
  },
  search: {
    position: 'absolute',
    top: 12,
    right: 0,
    marginRight: 10,
    fontSize: 20,
  },
  positionFilter: {
    borderColor: '#6e6e6e',
    borderWidth: 1,
    flexDirection: 'row',
    height: 70,
    marginHorizontal: 10,
  },
});
