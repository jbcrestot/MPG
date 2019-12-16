// @flow

import React from 'react';
import {StyleSheet, Text} from 'react-native';

export type NetworkError = {
  statusText: string,
  status: number,
};

type Props = {|
  error: NetworkError,
|};

export default (props: Props) => {
  const message =
    props.error && props.error.status > 400
      ? 'Vous avez des problèmes réseaux'
      : 'Nous ne parvenons pas a joindre les serveurs';

  console.log(props.error);

  return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
  error: {
    margin: 20,
    padding: 30,
    backgroundColor: '#b00020',
    color: '#ffffff',
    textAlign: 'center',
  },
});
