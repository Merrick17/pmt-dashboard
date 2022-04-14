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
import {addNewQRQCApi} from '../redux/actions/qrqc.actions';

const AddNewQRQC = ({navigation}) => {
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
      Service: '',
      desc_prob: '',
      NumArticle: '',
      NumOf: '',
      pos_probleme: '',
      moyenne_detection: '',
      frequence_detection: '',
      reccurence: '',
      raison_defaut: '',
      pos_detection: '',
      nbr_piece: '',
    },
  });

  const [dateProb, setDateProb] = useState(new Date(Date.now()));
  const [dateDetc, setDateDetec] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [showProblem, setShowProb] = useState(false);
  const [showDetec, setShowDetec] = useState(false);
  const [problemUser, setProblemUser] = useState(null);
  const [detectUser, setDetecUser] = useState(null);

  const onSubmit = data => {
    let selectedProbUser = userList.find(user => user.MATRIC == problemUser);
    let selectedDetectUser = userList.find(user => user.MATRIC == detectUser);
    console.log('Selected Prob', selectedProbUser);
    console.log('Selected Detect', selectedDetectUser);
    let body = {
      ...data,
      nom_perso_detect: `${selectedDetectUser.NOMPER} ${selectedDetectUser.PRENOM}`,
      mat_perso_detect: selectedDetectUser.MATRIC,
      nom_personne: `${selectedProbUser.NOMPER} ${selectedProbUser.PRENOM}`,
      mat_personne: selectedProbUser.MATRIC,
      Date_probleme: moment(dateProb).format('YYYY-MM-DD'),
      date_detection: moment(dateDetc).format('YYYY-MM-DD'),
    };
    dispatch(addNewQRQCApi(body,navigation));
    console.log(data);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#FFF'}}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.problem}>
        <View style={styles.header}>
          <Text style={styles.label}>Problème</Text>
        </View>
        <View style={{padding: 10, justifyContent: 'space-evenly', flex: 1}}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={450}
                placeholder="Service"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="Service"
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
                w={450}
                placeholder="Num Article"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="NumArticle"
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
                w={450}
                placeholder="Num OF"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="NumOf"
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
                w={450}
                placeholder="Description Problème"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="desc_prob"
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
                w={450}
                placeholder="Position Problème"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="pos_probleme"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={450}
                placeholder="Moyenne de detection"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="moyenne_detection"
          />
          {errors.moyenne_detection && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}
          <Select
            minWidth="200"
            maxWidth={450}
            selectedValue={problemUser}
            onValueChange={value => setProblemUser(value)}
            accessibilityLabel="Reponsable Problème"
            placeholder="Reponsable Problème">
            {userList.map(elm => (
              <Select.Item
                key={elm.MATRIC.toString()}
                label={`${elm.PRENOM} ${elm.NOMPER}`}
                value={elm.MATRIC}
              />
            ))}
          </Select>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {showProblem && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateProb}
                mode={mode}
                is24Hour={true}
                onChange={(ev, date) => {
                  setDateProb(date);
                  setShowProb(false);
                }}
              />
            )}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowProb(true);
              }}>
              <Text style={styles.btnLabel}>Date de problème</Text>
            </TouchableOpacity>
            <Text style={styles.dateLabel}>
              {moment(dateProb).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.problem}>
        <View style={styles.header}>
          <Text style={styles.label}>Détection</Text>
        </View>
        <View style={{padding: 10, justifyContent: 'space-evenly', flex: 1}}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                w={450}
                placeholder="Raison défaut"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="raison_defaut"
          />

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
                w={450}
                placeholder="Position détection"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="pos_detection"
          />
          {errors.pos_detection && (
            <Text style={styles.errorLabel}>Champ obligatoire.</Text>
          )}

          <Select
            minWidth="200"
            maxWidth={450}
            selectedValue={detectUser}
            onValueChange={value => setDetecUser(value)}
            accessibilityLabel="Reponsable Détection"
            placeholder="Reponsable Détection">
            {userList.map(elm => (
              <Select.Item
                key={elm.MATRIC.toString()}
                label={`${elm.PRENOM} ${elm.NOMPER}`}
                value={elm.MATRIC}
              />
            ))}
          </Select>
          <View
            style={{
              width: 450,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'flex-start',
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={140}
                  placeholder="Nombre pièce"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="nbr_piece"
            />
            {errors.nbr_piece && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={140}
                  placeholder="Reccurence"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="reccurence"
            />
            {errors.reccurence && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  w={120}
                  placeholder="Fréquence"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="frequence_detection"
            />
            {errors.frequence_detection && (
              <Text style={styles.errorLabel}>Champ obligatoire.</Text>
            )}
          </View>

          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {showDetec && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateProb}
                mode={mode}
                is24Hour={true}
                onChange={(ev, date) => {
                  setDateDetec(date);
                  setShowDetec(false);
                }}
              />
            )}

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setShowDetec(true);
              }}>
              <Text style={styles.btnLabel}>Date de problème</Text>
            </TouchableOpacity>
            <Text style={styles.dateLabel}>
              {' '}
              {moment(dateDetc).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.btnList}>
        <Button
          size={'lg'}
          style={{width: '40%'}}
          onPress={handleSubmit(onSubmit)}>
          Suivant
        </Button>
        <Button
          size={'lg'}
          style={{width: '40%'}}
          colorScheme="secondary"
          onPress={() => {
            navigation.navigate('Reason');
          }}>
          Annuler
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddNewQRQC;

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
