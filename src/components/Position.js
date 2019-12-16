// @flow

import React from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {|
  ultraPosition: number,
|};

export default (props: Props) => {
  let translatedPosition = 'Inconnue';

  switch (props.ultraPosition) {
    case 10:
      translatedPosition = 'Gardien';
      break;
    case 20:
      translatedPosition = 'Défenseur';
      break;
    case 21:
      translatedPosition = 'Latéral';
      break;
    case 31:
      translatedPosition = 'Milieu défensif';
      break;
    case 32:
      translatedPosition = 'Milieu offensif';
      break;
    case 40:
      translatedPosition = 'Attaquant';
      break;
  }

  return <Text style={styles.text}>{translatedPosition}</Text>;
};

const styles = StyleSheet.create({
  text: {paddingRight: 10},
});
