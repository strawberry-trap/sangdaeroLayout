import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default class DonationScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.post}>
          <Text style={styles.postCategory}>Category</Text>
          <Text style={styles.postTitle}>Notice</Text>
          <Button title='+' style={styles.postButton}/>
        </View>
        <View style={styles.post}>
          <Text style={styles.postCategory}>Category</Text>
          <Text style={styles.postTitle}>Notice</Text>
          <Button title='+' style={styles.postButton}/>
        </View>
        <View style={styles.post}>
          <Text style={styles.postCategory}>Category</Text>
          <Text style={styles.postTitle}>Notice</Text>
          <Button title='+' style={styles.postButton}/>
        </View>
        <View style={styles.post}>
          <Text style={styles.postCategory}>Category</Text>
          <Text style={styles.postTitle}>Notice</Text>
          <Button title='+' style={styles.postButton}/>
        </View>
      </ScrollView>
    )
  }
}

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
  postCategory: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  postTitle: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  postButton: {
    alignSelf: 'flex-end'
  },
});
