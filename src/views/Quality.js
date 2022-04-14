import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../styles/globalStyles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Fab, FlatList, Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getAllQrQcApi} from '../redux/actions/qrqc.actions';
import moment from 'moment';
const Quality = ({route, navigation}) => {
  const {list} = useSelector(state => state.qrqc);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllQrQcApi());
  }, []);
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.labelStyle}>Controle Qualité</Text>
      </View>
      <FlatList
        data={list}
        style={{
          width: '100%',
          height: 400,
          alignSelf: 'center',
          alignContent: 'center',
        }}
        renderItem={({item}) => (
          <View style={styles.card} key={item.id_qrqc}>
            <View style={styles.cardHeader}>
              <MaterialIcon
                name="error-outline"
                size={45}
                style={styles.errorIcon}
              />
              <Text style={styles.errorText}>
                Erreur à la position {item.Service}
              </Text>
            </View>
            <View>
              <Text style={styles.errorDesc}>{item.desc_prob}</Text>
            </View>
            <View style={styles.footer}>
              <View style={styles.dateView}>
                <MaterialIcon
                  name="date-range"
                  size={35}
                  style={styles.errorIcon}
                />
                <Text>
                  {item.Date_probleme &&
                    moment(item.Date_probleme).format('DD/MM/YYYY')}
                </Text>
              </View>
              <TouchableOpacity style={styles.consultBtn}>
                <MaterialIcon name="content-copy" color={'#FFF'} />
                <Text style={styles.btnLabel}>Consulter</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Fab
        onPress={() => {
          navigation.navigate('Add');
        }}
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="md"
        icon={
          <Icon color="white" as={MaterialIcon} name="add-alert" size="4" />
        }
        label="Ajouter nouveau"
      />
    </View>
  );
};

export default Quality;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0284C7',
    width: '90%',
    minHeight: 150,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontSize: 24,
    color: '#FFF',
  },
  card: {
    width: 670,
    height: 170,
    borderColor: '#E0F2FE',
    marginVertical: 10,
    borderWidth: 3,
    marginLeft: 50,
  },

  errorIcon: {
    margin: 5,
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    margin: 10,
  },
  errorDesc: {
    fontSize: 16,
    margin: 10,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  consultBtn: {
    width: 120,
    height: 50,
    backgroundColor: '#0284C7',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  footer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  btnLabel: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
