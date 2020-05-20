import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ButtonGroup, ListItem } from 'react-native-elements';


const bottomButtons = ['Logout', 'Home', 'Json Data', 'Button Ex'];
var count = 1;
const list = [
  {
    name:'활동 요청',
    subtitle:'활동 요청',
    badgeValue:'1+',
    badgeStatus:'success'
  },
  {
    name:'물건 나눔 신청',
    subtitle:'물건 나눔 신청',
    badgeValue:'1+',
    badgeStatus:'success'
  },
  {
    name:'차량 지원',
    subtitle:'차량 지원',
    badgeValue:'1+',
    badgeStatus:'success'
  },
  {
    name:'말벗',
    subtitle:'말벗',
    badgeValue:'2+',
    badgeStatus:'error'
  },
  {
    name:'청소',
    subtitle:'청소',
    badgeValue:'3+',
    badgeStatus:'primary'
  },
  {
    name:'물품 전달',
    subtitle:'물품 전달',
    badgeValue:'4+',
    badgeStatus:'warning'
  }
]

export default function ActivityScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

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


      <ButtonGroup
        buttons={bottomButtons}
      />
    </ScrollView>
  );
}

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
*/

function Menu() {
  console.log(bottomButtons.length);
  return (
    <View style={{ flexDirection:'row', flex:1}}>
      <Button
        title={bottomButtons[0]}
        buttonStyle={{flex:1}}
      />
      <Button
        title={bottomButtons[1]}
        buttonStyle={{flex:1}}
      />
      <Button
        title={bottomButtons[2]}
        buttonStyle={{flex:1}}
      />
      <Button
        title={bottomButtons[3]}
        buttonStyle={{flex:1}}
      />
    </View>
  )
}

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
