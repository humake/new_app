import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Platform, Alert } from 'react-native'; 

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          login_id: '',
          password: '',
        }
      }


      _onPress = () => {
        this.props.login(this.state.login_id,this.state.password);
      }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="회원번호" onChangeText={(login_id) => this.setState({login_id})} value={this.state.login_id} />
                <TextInput style={styles.input} placeholder="전화번호" onChangeText={(password) => this.setState({password})} value={this.state.password} />
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._onPress}>
                  <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    input: {
        flex:1,
        fontSize: 20,
        borderWidth:1,
        borderColor:666,
        height:40
    },

    buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
      },

    loginButton: {
        backgroundColor: "#00b5ec",
      },
      loginText: {
        color: 'white',
      }
});

export default Login;