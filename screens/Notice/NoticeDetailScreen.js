import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';

export default class NoticeDetailScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.route.params.data, // single notice data
    }

    if (this.state.data.modDate.charAt(4) != '/') {
      this.state.data.modDate = this.parseDate(this.state.data.modDate);
    }
  };

  parseDate(date) {
    console.log(date);
    var splitDash = date.split('-');

    var year = splitDash[0] + '/';
    var month = splitDash[1] + '/';

    var splitT = splitDash[2].split('T');

    var day = splitT[0] + ' ';

    var splitColon = splitT[1].split(':');
    var hour = splitColon[0] + ':';
    var minute = splitColon[1];

    return year + month + day + hour + minute;
  }
  
  render() {

    var url = 'http://saevom06.cafe24.com/notice/post/' + this.state.data.id; // *** Must fix the url, given from Server developers.

    return ( 
    <WebView
      source={{ uri: url}}
      style={{ marginTop: 20 }}
    />)

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.box}>
          <View style={styles.list}>
            <View style={styles.titleList}>
              <Text style={styles.title}>{this.state.data.title}</Text>
            </View>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.header}>작성자</Text>
                <Text style={styles.content}>{this.state.data.writer}</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.header}>작성일시</Text>
                <Text style={styles.content}>{this.state.data.modDate}</Text>
              </View>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.list}>
            <View style={styles.dataList}>
              <View style={styles.data}>
                <Text style={styles.content}>{this.state.data.content}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 25,
    padding: 3,
  },
  box: {
    flex: 1,
    padding: 20,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    marginBottom: 25,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 25,
    elevation: 2,
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
  },
  line: {
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: 'rgb(220, 220, 220)'
  },
  titleList: {
    flexDirection: 'row',
    marginBottom: 7,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dataList: {
    padding: 5
  },
  data: {
    flexDirection: 'row',
    marginTop: 3,
    marginBottom: 3,
  },
  header: {
    flex: 3,
    fontSize: 14,
  },
  content: {
    flex: 10,
    fontSize: 14,
  },
  date: {
    flex: 10,
  },
  time: {
    flex: 1,
  },
  statusButton: {
    width: 90,
    height: 35,
    resizeMode: 'contain',
  },
  button: {
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    fontSize: 22,
    color: '#FFF',
    backgroundColor: 'rgb(29,140,121)',
    borderRadius: 50,
    padding: 8,
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startButton: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 0,
    marginRight: 10,
    fontSize: 22,
    color: '#FFF',
    backgroundColor: 'rgb(1, 192, 99)',
    borderRadius: 50,
    padding: 8,
  },
  endButton: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 0,
    fontSize: 22,
    color: '#FFF',
    backgroundColor: 'rgb(29,140,121)',
    borderRadius: 50,
    padding: 8,
  }
});