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
import { login } from '../api/auth'; // API fonksiyonunu buradan import ediyoruz

const loginSchema = yup.object().shape({
  email: yup.string().email('Geçerli bir e-posta girin').required('E-posta gerekli'),
  password: yup.string().required('Parola gerekli'),
});

export default function LoginScreen({ navigation }: any) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("🔐 Login isteği gönderiliyor...");
      const res = await login(data.email, data.password);
      console.log("✅ Giriş başarılı:", res);
      alert("Giriş başarılı!");
      // Token varsa AsyncStorage gibi bir yerde saklayabilirsin
    } catch (err: any) {
      console.log("❌ Giriş hatası:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Giriş başarısız.");
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpeg')}
      style={styles.background}
      imageStyle={{ opacity: 0.7 }}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.welcome}>HOŞ GELDİN</Text>
          <Text style={styles.subtitle}>Devam etmek için giriş yapabilirsin</Text>

          {/* E-Posta */}
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

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Şifreni mi unuttun?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupText}>
              Hesabın yok mu? <Text style={styles.signupLink}>Kayıt Ol</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
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
  welcome: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
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
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
  eye: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#999',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#000',
    textDecorationLine: 'underline',
    fontSize: 13,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupText: {
    fontSize: 14,
    color: '#000',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#000',
  },
  error: {
    width: '100%',
    textAlign: 'left',
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});
