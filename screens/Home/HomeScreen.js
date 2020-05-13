import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.categoryOdd}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Notice</Text>
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
