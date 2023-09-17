import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

// form validation
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  username: Yup.string().min(3).max(16).required(),
  password: Yup.string().min(3).required(),
});

type DataInput = {
  password?: string;
  username?: string;
};

const App = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: {errors, isValid},
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: DataInput) => {
    console.log({data});
    reset();
    Alert.alert('success');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Log in to your account </Text>
      <Controller
        control={control}
        name="username"
        render={({field: {value, onChange, onBlur}}) => (
          <View style={styles.wrapperInput}>
            <TextInput
              {...register('username')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.p8}
              placeholder="username"
            />
          </View>
        )}
      />
      <Text>{errors.username?.message}</Text>

      <Controller
        control={control}
        name="password"
        render={({field: {value, onChange, onBlur}}) => (
          <View style={styles.wrapperInput}>
            <TextInput
              {...register('password')}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.p8}
              placeholder="password"
            />
          </View>
        )}
      />
      <Text>{errors.password?.message}</Text>

      <Button
        title="Login to account"
        onPress={handleSubmit(onSubmitHandler)}
        disabled={!isValid}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  p8: {
    padding: 8,
  },
  wrapperInput: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    margin: 20,
    width: '80%',
  },
});
