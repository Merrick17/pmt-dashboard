import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Button, FlatList, Modal} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getTrsInfo, getTrsInfoApi} from '../redux/actions/trs.actions';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
  DangerPath,
} from 'react-native-cool-speedometer';
import HistoryModal from './HistoryModal';
import {SHOW_MODAL} from '../redux/actionTypes';
import {getRebusInfoApi} from '../redux/actions/rebus.actions';
import {getPosteHistoryApi} from '../redux/actions/modal.action';
const RebusComp = () => {
  const [type, setType] = useState('month');

  const dispatch = useDispatch();
  const {data} = useSelector(state => state.rebus);

  useEffect(() => {
    console.log('I AM HERE');
    dispatch(getRebusInfoApi(type));
    // console.log('Data', data);
  }, [type]);
  const displayColor = value => {
    if (value < 40) {
      return 'red';
    } else if (value > 40 && value < 75) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  return (
    <View style={styles.trsView}>
      <View style={styles.trsButtons}>
        <Button
          onPress={() => {
            setType('day');
          }}>
          Par Jours
        </Button>
        <Button
          onPress={() => {
            setType('week');
          }}>
          Par Semaine
        </Button>
        <Button
          onPress={() => {
            setType('month');
          }}>
          Par Mois
        </Button>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 600,
        }}>
        <FlatList
          data={data}
          numColumns={2}
          horizontal={false}
          nestedScrollEnabled
          renderItem={({item, index}) => {
            console.log('Item', item);
            return (
              <TouchableOpacity
                style={styles.speedoMeter}
                onPress={() => {
                  dispatch(getPosteHistoryApi(item.Poste_charge));
                }}>
                <Speedometer
                  key={index.toString()}
                  value={item.tauxRebus}
                  max={100}
                  angle={160}
                  fontFamily="squada-one">
                  <Background angle={180} />
                  <Arc col />
                  <Needle />
                  <Progress color={displayColor(item.tauxRebus)} />
                  <Marks />
                  <Indicator>
                    {(value, textProps) => (
                      <Text
                        {...textProps}
                        fontSize={60}
                        fill="#555"
                        x={250 / 2}
                        y={210}
                        textAnchor="middle"
                        fontFamily="squada-one">
                        {value}%
                      </Text>
                    )}
                  </Indicator>
                </Speedometer>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default RebusComp;

const styles = StyleSheet.create({
  trsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    maxHeight: 600,
  },
  trsButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '50%',
  },
  speedoMeter: {
    width: 250,
    height: 250,
    margin: 10,
  },
  btnStyle: {
    width: 70,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
