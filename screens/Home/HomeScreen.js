import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem } from 'react-native-elements'

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MonoText } from '../../components/StyledText';

const status = [
  'Before matching',
  'During matching',
  'Finish matching',
  'Doing Activity',
  'Finish Activity',
  'Cancled Activity'
]

const list = [
  {
    name:'1',
    subtitle:status[0],
    badgeValue:'1+',
    badgeStatus:'success'
  },
  {
    name:'2',
    subtitle:status[1],
    badgeValue:'1+',
    badgeStatus:'success'
  },
  {
    name:'3',
    subtitle:status[2],
    badgeValue:'1+',
    badgeStatus:'success'
  },
  {
    name:'4',
    subtitle:status[3],
    badgeValue:'1+',
    badgeStatus:'success'
  },
  {
    name:'5',
    subtitle:status[4],
    badgeValue:'1+',
    badgeStatus:'success'
  },
  {
    name:'6',
    subtitle:status[5],
    badgeValue:'1+',
    badgeStatus:'success'
  },
]

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.categoryOdd}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Notice</Text>
            <Button title='+' style={styles.titleButton}/>
          </View>
          <View>
            {
              list.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.name}
                  subtitle={l.subtitle}
                  badge={{value: l.badgeValue, status: l.badgeStatus}}
                  chevron
                />
              ))
            }
          </View>
        </View>
        <View style={styles.categoryEven}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Received Request</Text>
            <Button title='+' style={styles.titleButton}/>
          </View>
          <View style={styles.list}>
            <Text style={styles.post}>1</Text>
            <Text style={styles.post}>2</Text>
            <Text style={styles.post}>3</Text>
            <Text style={styles.post}>4</Text>
            <Text style={styles.post}>5</Text>
          </View>
        </View>
        <View style={styles.categoryOdd}>
          <View style={styles.title}>
            <Text style={styles.titleText}>My Request</Text>
            <Button title='+' style={styles.titleButton}/>
          </View>
          <View style={styles.list}>
            <Text style={styles.post}>1</Text>
            <Text style={styles.post}>2</Text>
            <Text style={styles.post}>3</Text>
            <Text style={styles.post}>4</Text>
            <Text style={styles.post}>5</Text>
          </View>
        </View>
        <View style={styles.categoryEven}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Sharing</Text>
            <Button title='+' style={styles.titleButton}/>
          </View>
          <View style={styles.list}>
            <Text style={styles.post}>1</Text>
            <Text style={styles.post}>2</Text>
            <Text style={styles.post}>3</Text>
            <Text style={styles.post}>4</Text>
            <Text style={styles.post}>5</Text>
          </View>
        </View>
        <View style={styles.categoryOdd}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Community</Text>
            <Button title='+' style={styles.titleButton}/>
          </View>
          <View style={styles.list}>
            <Text style={styles.post}>1</Text>
            <Text style={styles.post}>2</Text>
            <Text style={styles.post}>3</Text>
            <Text style={styles.post}>4</Text>
            <Text style={styles.post}>5</Text>
          </View>
        </View>
        <View style={styles.categoryEven}>
          <View style={styles.title}>
            <Text style={styles.titleText}>QnA</Text>
            <Button title='+' style={styles.titleButton}/>
          </View>
          <View style={styles.list}>
            <Text style={styles.post}>1</Text>
            <Text style={styles.post}>2</Text>
            <Text style={styles.post}>3</Text>
            <Text style={styles.post}>4</Text>
            <Text style={styles.post}>5</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingTop: 0,
  },
  categoryOdd: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor:"#BBB",
  },
  categoryEven: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor:"#DDD",
  },
  title: {
    padding: 3,
    flexDirection: 'row'
  },
  titleText: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  titleButton: {
    alignSelf: 'flex-end'
  },
  list: {
    padding: 3,
    marginTop: 5,
    backgroundColor: "#999",
  },
  post: {
    padding: 1,
    marginTop: 2,
    backgroundColor: "#777",
  }
});
