import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ButtonGroup, ListItem } from 'react-native-elements';




export default class ActivityScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    }
    this.bottomButtons = ['Logout', 'Home', 'Json Data', 'Button Ex'];

    this.fixList =[
      {
        name:'물건 나눔',
        subtitle:'물건 나눔',
        badgeValue:'2',
        badgeStatus:'success'
      },
      {
        name:'요청하기',
        subtitle:'요청하기',
        badgeValue:'4',
        badgeStatus:'success'
      },
      {
        name:'내 활동',
        subtitle:'내 활동',
        badgeValue:'4',
        badgeStatus:'success'
      },
    ]
/*
    this.list = [];

    var url = 'http://saevom06.cafe24.com/interestdata/getAll';

    // get the interest categories from server, as soon as this component is created.
    try {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          async: false
        },
      }).then((response) => response.json())
        .then((responseInJson) => {
          for (var i = 0; i < responseInJson.length; i++) {
            this.list.push({
              id:responseInJson[i].id,
              name:responseInJson[i].name,
            })
            console.log(this.list);
          }
        })
    } catch (e) {
      console.warn(e);
    }
    */
  }
  
  componentDidMount() {
    fetch('http://saevom06.cafe24.com/interestdata/getAll', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        async: false
      },
    })
    .then((response) => response.json())
    .then((responseInJson) => {
      this.setState({data:responseInJson});
      console.log(this.state.data);
    })
    .catch((e) => console.log(e))
    .finally(() => {
      this.setState({isLoading:false});
    })
  }

  

  render() {
    const { data, isLoading } = this.state;

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View>
          <ListItem
            key={0}
            title={this.fixList[0].name}
            subtitle={this.fixList[0].subtitle}
            badge={{value: this.fixList[0].badgeValue, status: this.fixList[0].badgeStatus}}
            chevron
            onPress={() => this.props.navigation.navigate('Request')}
          />
          <ListItem
            key={1}
            title={this.fixList[1].name}
            subtitle={this.fixList[1].subtitle}
            badge={{value: this.fixList[1].badgeValue, status: this.fixList[1].badgeStatus}}
            chevron
            onPress={() => this.props.navigation.navigate('Request')}
          />
          <ListItem
            key={2}
            title={this.fixList[2].name}
            subtitle={this.fixList[2].subtitle}
            badge={{value: this.fixList[2].badgeValue, status: this.fixList[2].badgeStatus}}
            chevron
            onPress={() => this.props.navigation.navigate('활동 목록')}
          />
          { isLoading ? <View/> : (
            data.map((l, i) => (
              <ListItem
                key={i+2}
                title={l.name}
                chevron
                onPress={() => this.props.navigation.navigate('활동 목록', {id:l.id})}
              />
            ))
          )}
        </View>

      </ScrollView>
    )
  }
}
/*
{
  this.list.map((l, i) => (
    <ListItem
      key={i+2}
      title={l.name}
      chevron
      onPress={() => this.props.navigation.navigate('활동 목록')}
    />
  ))
}
*/

/*
      <OptionButton
        label='Request'
        badge='10+'
        badgeStatus='success'
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />
      
      <OptionButton
        label='Donation'
        badge='20+'
        badgeStatus='success'
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        label={buttonText()}
        badge='success'
        badgeStatus='success'
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        label={buttonText()}
        badge='error'
        badgeStatus='error'
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        label={buttonText()}
        badge='primary'
        badgeStatus='primary'
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />
      
      <OptionButton
        label={buttonText()}
        badge='warning'
        badgeStatus='warning'
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />

      <OutlineButton
        label='Request'
        badge='warning'
        badgeStatus='warning'/>

      <OutlineButton
        label='Donation'
        badge='warning'
        badgeStatus='warning'/>

      <OutlineButton
        label={buttonText()}
        badge='warning'
        badgeStatus='warning'/>

      <OutlineButton
        label={buttonText()}
        badge='warning'
        badgeStatus='warning'/>
      
      <OutlineButton
        label={buttonText()}
        badge='warning'
        badgeStatus='warning'/>

      <OutlineButton
        label={buttonText()}
        badge='warning'
        badgeStatus='warning'
        isLastOption/>

        <ButtonGroup
        buttons={bottomButtons}
      />
*/

function OptionButton({ icon, label, badge, badgeStatus, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
        <View style={styles.optionBadgeContainer}>
          <Badge style={styles.badge} value={badge} status={badgeStatus}/>
        </View>
      </View>
    </RectButton>
  );
}

function OutlineButton({ icon, label, badge, badgeStatus, onPress, isLastOption }) {
  return (
    <Button onPress={onPress} type='outline' title={label}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
        <View style={styles.optionBadgeContainer}>
          <Badge style={styles.badge} value={badge} status={badgeStatus}/>
        </View>
      </View>
    </Button>
  );
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
    flex:4
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  touch:{
    flexDirection:'row',
  },
  optionTextContainer: {
    flex: 1,
    alignContent: 'flex-end',
  },
  badge: {
  },
});
