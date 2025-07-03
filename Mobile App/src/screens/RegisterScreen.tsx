import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { register } from '../api/auth';


const registerSchema = yup.object().shape({
  name: yup.string().required('Ad soyad gerekli'),
  email: yup.string().email('Geçerli bir e-posta girin').required('E-posta gerekli'),
  password: yup.string().min(6, 'Parola en az 6 karakter olmalı').required('Parola gerekli'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Parolalar eşleşmiyor')
    .required('Parola tekrar gerekli'),
});

export default function RegisterScreen({ navigation }: any) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    if (!isChecked) {
      alert('Devam etmek için şartları kabul etmelisin.');
      return;
    }
  
    try {
      console.log("👉 Gönderilen veri:", data);
      const res = await register(
        data.name,
        data.email,
        data.password,
        data.confirmPassword
      );
      alert(res.message);
      navigation.navigate('Login');
    } catch (err: any) {
      // HATA YÖNETİMİ BURAYA!
      console.log("❌ Hata yakalandı:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Bir hata oluştu.");
    }
  };
  
  
  
  

  return (
    <ImageBackground
      source={require('../../assets/background.jpeg')}
      style={styles.background}
      imageStyle={{ opacity: 0.7, resizeMode: 'cover' }}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>KAYIT OL</Text>
          <Text style={styles.subtitle}>Aramıza katılmana çok az kaldı!</Text>

          {/* Ad soyad */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Ad Soyad"
                placeholderTextColor="#999"
                style={styles.input}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

          {/* E-posta */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="E-Posta Adresi"
                placeholderTextColor="#999"
                style={styles.input}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

          {/* Parola */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Parola"
                  placeholderTextColor="#999"
                  style={styles.passwordInput}
                  secureTextEntry={!passwordVisible}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Text style={styles.eye}>👁</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

          {/* Parola tekrar */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Parola Tekrar"
                  placeholderTextColor="#999"
                  style={styles.passwordInput}
                  secureTextEntry={!confirmVisible}
                  value={value}
                  onChangeText={onChange}
                />
                <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)}>
                  <Text style={styles.eye}>👁</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword.message}</Text>
          )}

          {/* Checkbox */}
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              style={[
                styles.checkboxBox,
                { backgroundColor: isChecked ? '#28a745' : '#fff' },
              ]}
            />
            <Text style={styles.checkboxText}>
              Kutuyu işaretleyerek{' '}
              <Text style={{ fontWeight: 'bold' }}>hizmet şartları</Text> ve{' '}
              <Text style={{ fontWeight: 'bold' }}>gizlilik politikamızı</Text> kabul et.
            </Text>
          </View>

          {/* Kayıt Butonu */}
          <TouchableOpacity
            style={[
              styles.registerButton,
              { opacity: isChecked ? 1 : 0.5 },
            ]}
            disabled={!isChecked}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.registerButtonText}>Hesap Oluştur</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginRedirect}>
              Zaten hesabın var mı? <Text style={styles.loginLink}>Giriş Yap</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    width: '90%',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  eye: { fontSize: 18, paddingHorizontal: 10, color: '#999' },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: '#000',
  },
  registerButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginRedirect: { fontSize: 14, color: '#000' },
  loginLink: { fontWeight: 'bold', color: '#000' },
  error: {
    width: '100%',
    textAlign: 'left',
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});
