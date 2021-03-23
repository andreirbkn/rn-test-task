import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Header from '../components/Header';
import Infobox from '../components/Infobox';
import HiddenView from '../components/HiddenView';
import Recomendations from '../components/Recomendation';

function CareerConfScreen(props) {

    const header = {}

    return (
            <SafeAreaView style={styles.container}>
                <Header />
                <Infobox />
                <HiddenView />
                <Recomendations />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f6fc',
        flex:1,
        padding: 0,
    },
});

export default CareerConfScreen;