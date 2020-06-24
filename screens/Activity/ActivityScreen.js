import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button, ListItem } from 'react-native-elements';

let buttonList = [];
let interestCategory = [];

export default class ActivityScreen extends React.Component {

  state = {
    type:0,
    showButtons: false, // for rendering buttons after fetch() is executed
  }

  constructor(props) {
    super(props);

    // get the interest categories from server, as soon as this component is created.
    var url = 'http://saevom06.cafe24.com/interestdata/getAll';
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((responseInJson) => {

          // receive the interest categories(관심사 목록) from server, and add an attribute(action) to 'interest category'  
          for (var i = 0; i < responseInJson.length; i++) {
            let givenType = responseInJson[i]["id"];

            responseInJson[i]["action"] = () => {
              this.setState({ type: givenType });
              
              this.props.navigation.navigate('Request',
              {
                //interestType: responseInJson["id"],
                //interestName: responseInJson["name"],
                interestType: 1,
                interestName: '환경 미화',
              })
            }
            interestCategory.push(responseInJson[i]);
          } // at this point, each elements of interest category is like { id:1, name:"driving", action: () => {...} }

          // render buttons with 'interest category' information
          buttonList = interestCategory.map(
            buttonInfo => {
              return (
                <View style={[{ width: "90%", margin: 20, backgroundColor: "white" }]}>
                  <Button
                    key={buttonInfo.id}
                    buttonStyle={{ backgroundColor: 'rgb(1, 192, 99)', height: 50, width: 400 }}
                    titleStyle={{ fontSize: 23 }}
                    title={buttonInfo.name}
                    raised
                    onPress={buttonInfo.action} // onPress actions are already defined in fetch()
                  />
                </View>
              );
            }
          );
          // after getting all the data, render the buttons
          this.setState({ showButtons: true });
        })
    } catch (e) {
      console.warn('[TestScreen.js try-catch error log]', e);
    }
  }

  render() {

    if (this.state.showButtons == true) {
      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.container}>
            <ScrollView>
              <View>{buttonList}</View>
            </ScrollView>
          </View>
        </ScrollView>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text>Data is loading...</Text>
        </View>
      );
    }
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
  option: {
    backgroundColor: '#CCC',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionTextContainer: {
    flexDirection: 'row',
    flex: 4
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  touch: {
    flexDirection: 'row',
  },
  optionTextContainer: {
    flex: 1,
    alignContent: 'flex-end',
  },
  badge: {
  },
});
