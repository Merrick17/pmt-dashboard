import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {Button, ScrollView} from 'native-base';
import TRSComp from '../components/TRSComp';
import RebusComp from '../components/RebusComp';
import HistoryModal from '../components/HistoryModal';
import {useSelector, useDispatch} from 'react-redux';
import {HIDE_MODAL} from '../redux/actionTypes';
import TRSGlobalComp from '../components/TrsGlobalComp';
const MainScreen = () => {
  const {showModal, selectedModal} = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000},
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <HistoryModal
        showModal={showModal}
        poste={selectedModal}
        closeModal={() => {
          dispatch({
            type: HIDE_MODAL,
          });
        }}
      />
      <ScrollView style={{width: '100%', height: '100%'}}>
        <View style={styles.header}>
          <Text style={styles.labelStyle}>Taux de Rendement Synthétique</Text>
        </View>
        <TRSComp type={'jours'} />
        <View style={styles.header}>
          <Text style={styles.labelStyle}>
            Taux de Rendement Globale (Mois){' '}
          </Text>
        </View>
        <TRSGlobalComp />
        <View style={styles.header}>
          <Text style={styles.labelStyle}>Taux de Rebut par machine</Text>
        </View>
        <RebusComp />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0284C7',
    width: '90%',
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 24,
    color: '#FFF',
  },
  trsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: 400,
    width: '100%',
  },
  trsButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '50%',
  },
});
