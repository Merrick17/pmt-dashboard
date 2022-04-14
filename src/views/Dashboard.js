import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import {Button, ScrollView} from 'native-base';
import TRSComp from '../components/TRSComp';
import {useDispatch} from 'react-redux';
import {getAbsentInfoApi} from '../redux/actions/absent.action';
import AbsentComp from '../components/AbsentComp';

const Dashboard = () => {
  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000},
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.labelStyle}>Taux d'absentisme</Text>
        </View>
        <AbsentComp />
        <View style={styles.header}>
          <Text style={styles.labelStyle}>Taux de Rebut</Text>
        </View>
        <View style={styles.trsView}>
          <View style={styles.trsButtons}>
            <Button>Par Jours</Button>
            <Button>Par Semaine</Button>
            <Button>Par Mois</Button>
          </View>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="quarter" y="earnings" />
          </VictoryChart>
        </View>
        <View style={styles.header}>
          <Text style={styles.labelStyle}>Taux de Respect de Production</Text>
        </View>
        <View style={styles.trsView}>
          <View style={styles.trsButtons}>
            <Button>Par Jours</Button>
            <Button>Par Semaine</Button>
            <Button>Par Mois</Button>
          </View>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryBar data={data} x="quarter" y="earnings" />
          </VictoryChart>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

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
