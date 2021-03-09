import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native'; 
import { block } from 'react-native-reanimated';

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.section_l}>
                <View style={styles.top}>
                    <Image source={require('./res/img_header_logo.png')} style={styles.logo} />
                </View>
                <View>
                    <Text>센터 소개</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.menu}>
                        <Image />
                        <Text style={styles.menuTitle}>담당강사</Text>
                        <Text style={styles.menuSubTitle}>없음</Text>
                    </View>
                    <View style={styles.menu}>
                        <Image source={require('./res/attendance.png')} style={styles.menu_image} />                      
                        <Text style={styles.menuTitle}>출석</Text>
                        <Text style={styles.menuSubTitle}>0일-0회</Text>
                    </View>
                    <View style={styles.menu}>
                        <Image source={require('./res/exercise.png')} style={styles.menu_image} />
                        <Text style={styles.menuTitle}>운동</Text>
                    </View>              
                </View>
                <View style={styles.section}>
                    <View style={styles.menu}>
                        <Image source={require('./res/weight.png')} style={styles.menu_image} />
                        <Text style={styles.menuTitle}>체중기록</Text>
                        <Text style={styles.menuSubTitle}>0.0Kg</Text>
                    </View>
                    <View style={styles.menu}>
                        <Image source={require('./res/suggestions.png')} style={styles.menu_image} />
                        <Text style={styles.menuTitle}>알림</Text>
                    </View>
                    <View style={styles.menu}>
                        <Image source={require('./res/reservation.png')} style={styles.menu_image} />
                        <Text style={styles.menuTitle}>PT예약,확인</Text>
                    </View>                    
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    section_l: {
        flex : 1,
        display: 'flex',
        flexWrap: 'wrap'
    },

    section: {
      flex: 1,
      flexDirection : 'row',
      backgroundColor: '#fff',
    },

    top: {
        backgroundColor: '#333',
        paddingTop: 30,
        paddingBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },

    logo: {
        marginLeft: 15,
        width: 230,
        height: 28   
    },

    menu: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection : 'column',
        marginBottom: 10,
        alignContent: 'center'
    },

    menu_image: {
        width: 60,
        height: 60
    },

    menu1: {
    },

    menu2: {
    },
    
    menu3: {
    },
    
    menu4: {
    },
    
    menu5: {
    },
    
    menu6: {
    },    

    menuTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },

    menuSubTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: '#ff8d1d'
    }    
});

export default Content;