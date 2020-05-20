import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Badge, Button, ListItem, Input } from 'react-native-elements';

export default function MypageScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profile}>
        <View style={styles.profileName}>
          <Text style={styles.profileNameText}>이름(별명)</Text>
          <Input style={styles.profileNicknameText}
            placeholder='별명'/>
          <View style={styles.profileNickname}>
            <Button style={styles.profileNicknameButton} title="별명 변경"/>
          </View>
        </View>
      </View>
      <View style={styles.link}>
        <Button style={styles.linkButton} title="요청"/>
        <Button style={styles.linkButton} title="후원"/>
        <Button style={styles.linkButton} title="커뮤니티"/>
        <Button style={styles.linkButton} title="문의"/>
      </View>
      <View style={styles.interest}>
        <Text style={styles.interestTitle}>가능한 서비스</Text>
        <View>
          <View style={styles.interestCategory}>
            <Text style={styles.interestCategoryTitle}>차량 지원</Text>
            <Button style={styles.interestButton} title="on/off"/>
          </View>
          <View style={styles.interestCategory}>
            <Text style={styles.interestCategoryTitle}>말벗</Text>
            <Button style={styles.interestButton} title="on/off"/>
          </View>
          <View style={styles.interestCategory}>
            <Text style={styles.interestCategoryTitle}>장보기</Text>
            <Button style={styles.interestButton} title="on/off"/>
          </View>
        </View>
      </View>
      <View style={styles.config}>
        <Button style={styles.configButton} title="설정"/>
        <Button style={styles.configButton} title="로그아웃"/>
        <Button style={styles.configButton} title="탈퇴"/>
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
