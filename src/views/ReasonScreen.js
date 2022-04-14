import {StyleSheet, Text, ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Input, Center, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {addNewReasonApi} from '../redux/actions/qrqc.actions';
const ReasonScreen = ({navigation}) => {
  const [respList, setRespList] = useState(['rep_1']);
  const {newQrQc} = useSelector(state => state.qrqc);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      desc_cause: '',
      rep_1: '',
      rep_2: '',
      rep_3: '',
      rep_4: '',
      rep_5: '',
    },
  });
  const addField = () => {
    if (respList.length < 5) {
      setRespList([...respList, `rep_${respList.length}`]);
    }
  };
  const onSubmit = data => {
    let body = {...data, id_probleme: newQrQc.id_qrqc};
    dispatch(addNewReasonApi(body, navigation));
    console.log(data);
  };
  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#FFF'}}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.problem}>
        <View style={styles.header}>
          <Text style={styles.label}>Cause du problème</Text>
        </View>
        <View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  size="2xl"
                  w={450}
                  placeholder="Cause"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              name="desc_cause"
            />
            <Button onPress={addField} style={{height: 50}}>
              Ajouter reponse
            </Button>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            {respList.map((elm, ind) => (
              <>
                <Controller
                  key={ind.toString()}
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      w={450}
                      size="2xl"
                      placeholder={`Réponse ${ind + 1}`}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      marginTop={10}
                      height={150}
                    />
                  )}
                  name={elm}
                />
                {/* {errors.NumArticle && (
                  <Text style={styles.errorLabel}>Champ obligatoire.</Text>
                )} */}
              </>
            ))}
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

export default ReasonScreen;

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
    height: 100,
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
