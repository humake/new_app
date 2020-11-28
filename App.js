import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import FadeView from 'react-native-fade-view';
import { width, height } from 'react-native-dimension';
import timer from 'react-native-timer';
import Login from './Login';
import Content from './Content';
import Config from './Config';
import base64 from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Humake extends React.Component {
  constructor(props) {
    super(props);

    // 초기값 저장
    this.state = {
      token:null,
      change_brightness: false,
      current_url: '/',
      viewLaunch: (<View style={styles.container_launch} />), // 스플래시와 웹뷰용      
      login: false
    };

    this.uri=Config.URL_HOME;
    this.login=this.login.bind(this);

    this.autoLogin();
  }

  componentDidMount() {
    this.loadingLaunch();    
  }

  loadingLaunch = () => {
    let  strLaunchImage = require('./res/bg_intro.jpg');
    
    this.setState({
        viewLaunch: (
          <FadeView active={false} style={styles.container_launch}>
            <Image
              resizeMode={"stretch"}  
              source={strLaunchImage}
              style={styles.container_launch}

            />
          </FadeView>
        ),
      });

      // 보여줄건 보여주고
      // 타이머로 런치이미지를 2초간 보여준 뒤
      timer.setTimeout(this, 'hideLaunchImage', () => {
        this.setState({
          viewLaunch: (
            <FadeView
              active
              animationDuration={300}
              style={styles.container_launch}
            >
              <Image
                resizeMode={"stretch"}                
                source={strLaunchImage}
                style={styles.container_launch}
              />
            </FadeView>
          ),
        });
      
        // FadeView가 사라지는 간격에 맞춰 웹뷰로 교체해준다.
        timer.setTimeout(this, 'showView', () => this.loadingView(), 300);
      }, 2000);
  //  });
  }

  loadingView = () => {
    // 메인뷰를 웹뷰로 교체
    this.setState({
      viewLaunch: null,
    });
  }

  async autoLogin() {
    AsyncStorage.getItem("@Common:login_token", (err, result) => {
      if (!err && result != null){
        var token=result;
      } else {
        var token=false;
      }

      if (token){
        //Alert.alert('uid login');
        var ls=token.split('||');

        var uid=ls[0]+'#'+ls[1];
        var phone=ls[2];
        //Alert.alert(token);
        this.login(uid,phone); // 토큰으로 로그인   
      } else {
        /* if(Platform.OS==='android') {
          var phoneNumber=DeviceInfo.getPhoneNumber();
          //var phoneNumber='01029376273';
         //Alert.alert(phoneNumber);

        //  Alert.alert(phoneNumber);
          if(phoneNumber) { // 번호를 가져올수 있는 안드로이드 폰이면
            Alert.alert(
              '전화번호 사용동의',
              '본인의 전화번호를 자동로그인을 위해 사용합니다',
              [
                {
                  text: '동의안함',
                  style: 'cancel',
                },
                {text: '동의함', onPress: () =>this.login(phoneNumber,false)},
              ],
              {cancelable: false},
            );            
            

          }      
        } */
 

      }
      
    });
  }

  login(uid,phone) {
    if(this.state.login===true) {
      return false;
    }
    let loginFormData= new FormData();
  
    loginFormData.append('format', 'json');
    loginFormData.append('os','android');
    //loginFormData.append('os',Platform.OS);
  
    if(uid) {
      var type='uid';
      loginFormData.append('uid',uid);
      loginFormData.append('phone',phone);
    } else {
      var type='phone';
      loginFormData.append('type',type);      
      loginFormData.append('phone',phone);
    }
    
    if(this.state.token) {
      var token=this.state.token;
      loginFormData.append('token',base64.encode(token));
      loginFormData.append('os','android');
      //loginFormData.append('os',Platform.OS);
    }
  
    fetch(this.uri+'/login',{
      method : 'POST',
      credentials: 'same-origin',
      body : loginFormData
    }).then((response) => response.json()
    )
    .then((responseJson) => {
    if(responseJson.result == 'success') {
      //Alert.alert(JSON.stringify(responseJson));
      AsyncStorage.setItem('@Common:login_token', responseJson.branch_id.toString()+'||'+responseJson.user_id.toString()+'||'+responseJson.phone.toString());

      this.setState({login:true});
      //this.setState({loginForm:null});
    } else {
      //Alert.alert(JSON.stringify(responseJson));
      const {code,message,uid_list } = responseJson;
      Alert.alert(message);
    }
  }).catch((error) => {
    console.error(error);
  });
  }  

  render() {
    let content=null;

    if(this.state.login) {
      content=(<Content />);
    } else {
      content=(
        <Login uri={this.uri} login={this.login} />
      );
    }

    return (<View style={styles.container}>
      <StatusBar style="auto" />
      {content}
      {this.state.viewLaunch}
    </View>);
  }
}



export default Humake;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  container_launch: {
    width: width(100), height: height(100), position: 'absolute' },
});
