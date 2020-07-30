import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'

export default class NoticeListScreen extends React.Component {

    // constructor
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
        }
        this.getData();
    }

    componentDidUpdate() {
        if (this.props.route.params?.set) {

            if (this.props.route.params.set) {
                console.log("Get new data");
                this.props.route.params.set = false;
                this.getData();
            }
        }
    }

    getData() {
        
        fetch('http://saevom06.cafe24.com/noticedata/getNotices', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                async: false,
            },
        })
            .then((response) => response.json())
            .then((responseInJson) => {
                this.setState({ data: responseInJson });
            })
            .catch((e) => console.log(e))
            .finally(() => {
                this.setState({ isLoading: false });
            })
    }

    createListItem(l, i) {
        if (i == 0) {
            return (
                <ListItem
                    key={i}
                    title={l.title}
                    titleStyle={styles.title}
                    onPress={() => this.props.navigation.navigate('공지 내용', { data: l.id })}
                    containerStyle={styles.listFirst}
                />
            )
        } else {
            return (
                <ListItem
                    key={i}
                    title={l.title}
                    titleStyle={styles.title}
                    onPress={() => this.props.navigation.navigate('공지 내용', { data: l.id })}
                    containerStyle={styles.list}
                />

            )
        }
    }

    render() {
        const { data, isLoading } = this.state;

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <View style={styles.box}>
                    <View style={styles.listBox}>
                        {isLoading ? <View /> : (
                            data.map((l, i) => (
                                this.createListItem(l, i)
                            ))
                        )}
                    </View>
                </View>

            </ScrollView>
        );
    }
}

NoticeListScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 0,
    },
    button: {
        textAlign: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 25,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgb(29,140,121)',
        backgroundColor: 'rgb(223,244,243)',
        borderColor: 'rgb(29,140,121)',
        borderWidth: 1,
        borderRadius: 50,
        padding: 11,
    },
    box: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFF',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 11,
        marginRight: 11,
        borderRadius: 15,
        elevation: 5,
    },
    listBox: {
        padding: 3,
    },
    listFirst: {
        flex: 1,
        padding: 5,
        paddingRight: 10,
        paddingBottom: 8,
        marginTop: 3,
        flexDirection: 'row',
    },
    list: {
        flex: 1,
        padding: 5,
        paddingRight: 10,
        paddingBottom: 8,
        marginTop: 3,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: 'rgb(220,220,220)',
    },
    title: {
        margin: 5,
        fontSize: 25,
    },
    subTitle: {
        margin: 0,
        padding: 0,
        fontSize: 12,
        backgroundColor: '#777'
    },
    imageGroup: {
        flexDirection: 'row',
    },
    statusButton: {
        width: 70,
        height: 20,
        resizeMode: 'contain',
    },
    arrow: {
        width: 12,
        height: 20,
        resizeMode: 'center',
    }
});
