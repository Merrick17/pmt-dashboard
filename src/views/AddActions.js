import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {Input, Box, Select, Button} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUsersApi} from '../redux/actions/users.action';
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import {addNewActionApi, addNewQRQCApi} from '../redux/actions/qrqc.actions';

const AddNewAction = ({navigation}) => {
  const dispatch = useDispatch();
  const {userList} = useSelector(state => state.users);
  useEffect(() => {
    dispatch(getAllUsersApi());
  }, []);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      type_action: '',

      qte_en_cours: '',
      qte_en_cours_non_conforme: '',
      qte_magasin: '',
      qte_magasin_non_conforme: '',
      qte_stock_client: '',
      qte_stock_client_non_conforme: '',
    },
  });

  const {NewQrQc} = useSelector(state => state.qrqc);

  const onSubmit = data => {
    let body = {
      ...data,
      id_probleme: NewQrQc.id_qrqc,
    };
    dispatch(addNewActionApi(body));
  };

  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#FFF'}}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.problem}>
        <View style={styles.header}>
          <Text style={styles.label}>Action de correction</Text>
        </View>
        <View style={{padding: 10, justifyContent: 'space-evenly', flex: 1}}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={650}
                placeholder="Type"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="type_action"
          />
          {errors.Service && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={650}
                placeholder="Quantité en cours"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="qte_en_cours"
          />
          {errors.NumArticle && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={650}
                placeholder="Quantité en cours non conforme"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="qte_en_cours_non_conforme"
          />
          {errors.NumOf && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={650}
                placeholder="Quantité Magasin"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="qte_magasin"
          />
          {errors.desc_prob && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}
          {errors.raison_defaut && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={650}
                placeholder="Quantité Magasin non conforme"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="qte_magasin_non_conforme"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={650}
                placeholder="Quantité de stock client"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="qte_stock_client"
          />
          {errors.moyenne_detection && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={650}
                placeholder="Quantité de stock client non conforme"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="qte_stock_client_non_conforme"
          />
          {errors.qte_stock_client_non_conforme && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}
        </View>
      </View>
      <View style={styles.btnList}>
        <Button
          size={'lg'}
          style={{width: '40%'}}
          onPress={handleSubmit(onSubmit)}>
          Ajouter
        </Button>
        <Button
          size={'lg'}
          style={{width: '40%'}}
          colorScheme="secondary"
          onPress={() => {
            navigation.navigate('List');
          }}>
          Terminer
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddNewAction;

const styles = StyleSheet.create({
  problem: {
    width: '90%',
    minHeight: 550,
    marginTop: 25,
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#0284C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    color: '#FFF',
  },
  btn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    height: 35,
    width: 250,
    padding: 10,
  },
  btnLabel: {
    color: '#FFF',
    alignSelf: 'center',
  },
  dateLabel: {
    fontSize: 24,
  },
  btnList: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  errorLabel: {
    color: 'red',
  },
});
