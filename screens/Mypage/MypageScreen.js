import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function MypageScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profile}>
        <View style={styles.profilePicture}>
          <Text style={styles.profilePictureText}>Profile picture</Text>
          <Button style={styles.profilePictureButton} title="Change Profile"/>
        </View>
        <View style={styles.profileName}>
          <Text style={styles.profileNameText}>Name(NickName)</Text>
          <View style={styles.profileNickname}>
            <Text style={styles.profileNicknameText}>NickName</Text>
            <Button style={styles.profileNicknameButton} title="Change NickName"/>
          </View>
        </View>
      </View>
      <View style={styles.link}>
        <Button style={styles.linkButton} title="Request List"/>
        <Button style={styles.linkButton} title="Donation List"/>
        <Button style={styles.linkButton} title="Community List"/>
        <Button style={styles.linkButton} title="QnA List"/>
      </View>
      <View style={styles.interest}>
        <Text style={styles.interestTitle}>Available Service</Text>
        <View>
          <View style={styles.interestCategory}>
            <Text style={styles.interestCategoryTitle}>Drive</Text>
            <Button style={styles.interestButton} title="on/off"/>
          </View>
          <View style={styles.interestCategory}>
            <Text style={styles.interestCategoryTitle}>Talk</Text>
            <Button style={styles.interestButton} title="on/off"/>
          </View>
          <View style={styles.interestCategory}>
            <Text style={styles.interestCategoryTitle}>Shopping</Text>
            <Button style={styles.interestButton} title="on/off"/>
          </View>
        </View>
      </View>
      <View style={styles.config}>
        <Button style={styles.configButton} title="Config"/>
        <Button style={styles.configButton} title="LogOut"/>
        <Button style={styles.configButton} title="Withdraw"/>
      </View>
    </ScrollView>
  );
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
