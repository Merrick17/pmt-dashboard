import {StyleSheet, SafeAreaView, View, Image} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {
  Input,
  Center,
  Box,
  FormControl,
  WarningOutlineIcon,
  Button,
} from 'native-base';

const LoginScreen = ({navigation}) => {
  const loginUser = () => {
    navigation.replace('Main');
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <Image source={require('../assets/pmt.png')} style={styles.companyLogo} />
      <Center mt={3} style={styles.inputContainer}>
        <Box alignItems="center">
          <FormControl isInvalid={false} w="100%" minWidth={450}>
            <FormControl.Label>Matricule</FormControl.Label>
            <Input placeholder="Matricule" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Try different from previous passwords.
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box alignItems="center" marginTop={5}>
          <FormControl isInvalid={false} w="100%" minWidth={450}>
            <FormControl.Label>Mot de passe</FormControl.Label>
            <Input placeholder="Mot de passe" />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              Try different from previous passwords.
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box alignItems={'center'} marginTop={5}>
          <Button size={'lg'} onPress={loginUser}>
            Se Connecter
          </Button>
        </Box>
      </Center>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  label: {
    color: '#000',
  },
  companyLogo: {
    width: 350,
    height: 250,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginRight: '5%',
  },
  inputContainer: {
    width: 500,
  },
  inputStyle: {
    width: 350,
  },
});
