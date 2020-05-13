import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../../components/StyledText';

export default function NoticeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.post}>
        <Text style={styles.postTitle}>Notice</Text>
        <Button title='+' style={styles.postButton}/>
      </View>
      <View style={styles.post}>
        <Text style={styles.postTitle}>Notice</Text>
        <Button title='+' style={styles.postButton}/>
      </View>
      <View style={styles.post}>
        <Text style={styles.postTitle}>Notice</Text>
        <Button title='+' style={styles.postButton}/>
      </View>
      <View style={styles.post}>
        <Text style={styles.postTitle}>Notice</Text>
        <Button title='+' style={styles.postButton}/>
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 0,
  },
  post: {
    backgroundColor: '#CCC',
    padding: 3,
    flexDirection: 'row',
  },
  postTitle: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  postButton: {
    alignSelf: 'flex-end'
  },
});
