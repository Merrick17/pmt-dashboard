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
import {getPosteHistoryApi} from '../redux/actions/modal.action';
const TRSComp = () => {
  const [type, setType] = useState('day');

  const dispatch = useDispatch();
  const {data} = useSelector(state => state.trs);

  useEffect(() => {
    dispatch(getTrsInfoApi(type));
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
        }}>
        <FlatList
          data={data}
          contentContainerStyle={{
            width: '100%',
          }}
          nestedScrollEnabled
          numColumns={2}
          horizontal={false}
          renderItem={({item, index}) => {
            // console.log('Item', item);
            return (
              <TouchableOpacity
                style={styles.speedoMeter}
                onPress={() => {
                  dispatch(getPosteHistoryApi(item.Poste_charge));
                }}>
                <Speedometer
                  key={index.toString()}
                  value={item.trs}
                  max={100}
                  angle={160}
                  fontFamily="squada-one">
                  <Background angle={180} />
                  <Arc col />
                  <Needle />
                  <Progress color={displayColor(item.trs)} />
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

export default TRSComp;

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
