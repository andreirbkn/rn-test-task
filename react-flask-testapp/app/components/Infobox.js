import React from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 



function Infobox(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.playButton}>
                <FontAwesome name="play" size={18} color="#14a0c5" style={{paddingLeft: 5}}/>    
            </TouchableOpacity>
            <Text style={styles.infoText}>Как построить карьеру в условиях Компании 4 мин. 30 сек.</Text>
        </View>
    );
}

export default Infobox;

const styles = StyleSheet.create({
    container: {
        padding:30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 40,
        height: 40,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',


        backgroundColor: '#f0f6fc',
        borderRadius: 100,

        shadowColor: "#000",
        shadowOffset: {
            width: 6,
            height: 9,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.00,
        zIndex: 5,
        elevation: 5,

    },
    infoText: {
        fontSize: 13,

    }
});