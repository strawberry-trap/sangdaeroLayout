import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Input } from 'react-native-elements';

export default class MypageScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profile}>
          <View style={styles.profileName}>
            <Text style={styles.profileNameText}>?씠由?(蹂꾨챸)</Text>
            <Input style={styles.profileNicknameText}
              placeholder='蹂꾨챸'/>
            <View style={styles.profileNickname}>
              <Button style={styles.profileNicknameButton} title="蹂꾨챸 蹂?寃?"/>
            </View>
          </View>
        </View>
        <View style={styles.link}>
          <Button style={styles.linkButton} title="?슂泥?"/>
          <Button style={styles.linkButton} title="?썑?썝"/>
          <Button style={styles.linkButton} title="而ㅻ?ㅻ땲?떚"/>
          <Button style={styles.linkButton} title="臾몄쓽"/>
        </View>
        <View style={styles.interest}>
          <Text style={styles.interestTitle}>媛??뒫?븳 ?꽌鍮꾩뒪</Text>
          <View>
            <View style={styles.interestCategory}>
              <Text style={styles.interestCategoryTitle}>李⑤웾 吏??썝</Text>
              <Button style={styles.interestButton} title="on/off"/>
            </View>
            <View style={styles.interestCategory}>
              <Text style={styles.interestCategoryTitle}>留먮쿁</Text>
              <Button style={styles.interestButton} title="on/off"/>
            </View>
            <View style={styles.interestCategory}>
              <Text style={styles.interestCategoryTitle}>?옣蹂닿린</Text>
              <Button style={styles.interestButton} title="on/off"/>
            </View>
          </View>
        </View>
        <View style={styles.config}>
          <Button style={styles.configButton} title="?꽕?젙"/>
          <Button style={styles.configButton} title="濡쒓렇?븘?썐"/>
          <Button style={styles.configButton} title="?깉?눜"/>
        </View>
      </ScrollView>
    )
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
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
  profile: {
    flex: 3,
    flexDirection: 'row',
    marginBottom: 10,
  },
  profilePicture: {
    flex: 1,
  },
  profilePictureText: {
    textAlign: 'center'
  },
  profilePictureButton: {

  },
  profileName: {
    flex: 2,
  },
  profileNameText: {
    textAlign: 'center'
  },
  profileNickname: {
    flexDirection: 'row',
  },
  profileNicknameText: {
    flex: 3,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  profileNicknameButton: {
    width: 20,
  },
  link: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  linkButton: {
    flex: 1,
  },
  interest: {
    flex: 2,
    marginBottom: 10,
    
  },
  interestTitle: {
    padding: 3,
  },
  interestCategory: {
    flexDirection: 'row',
  },
  interestCategoryTitle: {
    flex: 5,
    padding: 3,
    textAlignVertical: 'center',
  },  
  interestButton: {
    flex: 1,
  },
  config: {
    flex:1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  configButton: {
    flex: 1,
    alignSelf: "stretch"
  }
});
