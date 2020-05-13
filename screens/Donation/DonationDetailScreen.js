import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function DonationDetailScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.title}>
        <Text style={styles.postCategory}>Category</Text>
        <Text style={styles.postTitle}>Title</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.postContent}>Donation Content</Text>
      </View>
      <View style={styles.account}>
        <Text style={styles.accountMessage}>Bank Account</Text>
        <Text style={styles.accountMessage}>Explanation</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>Receipt</Text>
          <Text style={styles.formContent}>Content</Text>  
        </View>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>Name</Text>  
          <Text style={styles.formContent}>Content</Text>  
        </View>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>Phone number</Text>  
          <Text style={styles.formContent}>Content</Text>  
        </View>
        <View style={styles.formCategory}>
          <Text style={styles.formTitle}>Business License</Text>  
          <Text style={styles.formContent}>Content</Text>  
        </View>
      </View>
      <Button title="Submit"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  },
  contentContainer: {
    paddingTop: 0,
    alignItems: 'center',
    padding: 3,
  },
  title:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#BBB',
    padding: 3,
    marginBottom: 10,
  },
  postCategory: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  postTitle: {
    flex: 3,
    alignSelf: 'flex-start'
  },
  content: {
    flex: 3,
    backgroundColor: '#BBB',
    padding: 3,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  postContent: {
    backgroundColor: '#999',
    alignSelf: 'center',
  },
  account: {
    flex: 1,
    backgroundColor: '#BBB',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  accountMessage: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#999',
  },
  form: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  formCategory: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#999'
  },
  formTitle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#777'
  },
  formContent: {
    flex: 3,
    alignSelf: 'stretch',
    backgroundColor: '#777'
  },
});