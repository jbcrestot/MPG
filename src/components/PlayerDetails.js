// @flow

import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Position from './Position';
import {Toolbar} from 'react-native-material-ui';
import type {Player} from './PlayerList';

import mpgApi from '../modules/mpgApi';

type Props = {|
  id: string,
  onBackPress: () => void,
|};

export default ({id, onBackPress}: Props) => {
  const [toolbarPos] = React.useState(new Animated.Value(-100));
  const [contentPos] = React.useState(new Animated.Value(700));
  const [playerDatails, setPlayerDetails] = React.useState(undefined);
  (playerDatails: ?Player);

  let {height} = Dimensions.get('window');

  // did mount
  React.useEffect(() => {
    // toolbar
    Animated.timing(toolbarPos, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // content
    Animated.timing(contentPos, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    // get player details
    mpgApi
      .getPlayer(id.substring(7))
      .then(response => {
        setPlayerDetails(response.data);
      })
      .catch(e => console.log('playerDetails error', e));
  }, [id]);

  const handleBackPress = React.useCallback(() => {
    console.log('wesh');
    onBackPress();
  }, [onBackPress]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: toolbarPos,
            },
          ],
        }}>
        <Toolbar
          leftElement={
            <Text style={styles.toolbarTitle} onPress={handleBackPress}>
              {' '}
              <FontAwesome5 name={'arrow-left'} style={styles.toolbarIcon} />
            </Text>
          }
          centerElement={
            playerDatails
              ? (playerDatails.lastname ?? '') +
                ' ' +
                (playerDatails.firstname ?? '')
              : '...'
          }
          style={{
            leftElement: {
              color: 'white',
            },
          }}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.content,
          {height: height - 90},
          {
            transform: [
              {
                translateY: contentPos,
              },
            ],
          },
        ]}>
        {playerDatails ? (
          <>
            <Text>
              Poste : <Position ultraPosition={playerDatails.ultraPosition} />
            </Text>
            <Text>Equipe : {playerDatails.teamId}</Text>
            <Text>Club : {playerDatails.club}</Text>
            <Text>Ratio moyen : {playerDatails.stats.avgRate}</Text>
            <Text>Nombre de but : {playerDatails.stats.sumGoals}</Text>
            <Text>
              Championnat en cours : {playerDatails.stats.currentChampionship}
            </Text>
          </>
        ) : (
          <ActivityIndicator style={styles.act} />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    padding: 10,
  },
  toolbarTitle: {
    textAlign: 'center',
  },
  toolbarIcon: {
    color: 'white',
    fontSize: 20,
    marginRight: 10,
  },
  act: {
    alignSelf: 'center',
  },
});
