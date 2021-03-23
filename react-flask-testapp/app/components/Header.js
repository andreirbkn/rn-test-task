import React from 'react';
import { StyleSheet, Text, View,} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';


function Header(props) {
    return (
        <View style={styles.container}>
            <LinearGradient 
                start={[1,0]}
                end={[0,0]}
                colors={[ '#f99d29','#f5d32e', ]}  
                style={styles.shadow} />
            <LinearGradient
                start={[1,0]}
                end={[0,0]}
                colors={[ '#21252d','#38424e', ]}  
                style={styles.header}>
                <AntDesign name='arrowleft' style={styles.arrow}/>
                <Text style={styles.h1}>Конифгуратор карьеры</Text>
            </LinearGradient>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        minHeight: 60,
    },
    header: {
        minHeight: 80,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',

        width: '100%',
        position: 'absolute',
        left: 0,
        top: -35,

        borderRadius: 20,
    },
    shadow: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 5,

        borderRadius: 20,

    },
    h1: {
        color: 'white',
        fontSize: 16,
        fontWeight: '300',
        margin: 15,

    },
    arrow: {
        color: 'white',
        fontSize: 20,
        padding: 12,
    }
});