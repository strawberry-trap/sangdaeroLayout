import React, { Component } from 'react';
import { View, Text, Platform, Image, ScrollView, WebView } from 'react-native'
import AuthSession from 'expo-auth-session';

export default class NaverLoginScreen extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        result: null,
    }

    clientId = 'eDul8tav128AH2uLTix_'
    clientSecret = '71AA8mR6VX'
    randomString = Math.random().toString(36).substr(2,11);

    async naverLogin() {

        let redirectUrl = AuthSession.getRedirectUrl();

        const result = await AuthSession.startAsync({
            authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(
                redirectUrl
            )}&state=${randomString}`,
        });

        this.setState({ result });
    };

    render() {
        return (
            <View>
                <Text>로그아웃 상태입니다.</Text>
                <Text>{`보관함을 사용하려면\n VIBE에 로그인해 주세요.`}</Text>
                <Button
                    onPress={this.naverLogin()}
                >
                    <Text>네이버 로그인</Text>
                </Button>
            </View>
        );
    }
}