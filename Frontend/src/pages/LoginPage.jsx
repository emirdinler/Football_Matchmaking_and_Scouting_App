import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.png';
import { register, login } from '../api/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleToggleRegister = () => {
    setIsRegistering(!isRegistering);
    setErrors({});
    setServerError('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin.';
    }

    if (isRegistering) {
      if (!formData.name.trim()) {
        newErrors.name = 'İsim boş bırakılamaz.';
      }
      if (formData.password.length < 6) {
        newErrors.password = 'Şifre en az 6 karakter olmalı.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifreler uyuşmuyor.';
      }
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setServerError('');

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (isRegistering) {
          const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          });

          alert('Kayıt başarılı!');
          localStorage.setItem('token', result.token);
          navigate('/create-profile');
        } else {
          const result = await login({
            email: formData.email,
            password: formData.password,
          });

          alert(result.message || 'Giriş başarılı!');
          localStorage.setItem('token', result.token);
          navigate('/home');
        }
      } catch (err) {
        setServerError(err.message || 'Sunucu hatası');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />
      <div style={contentWrapperStyle}>
        {/* Sol kutu */}
        <div style={leftBoxStyle}>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            MTB, halısaha severleri bir araya getiren yenilikçi bir platformdur. Takımını oluştur, eksik oyuncu bul, rakip bul ve futbolun tadını çıkar!
          </p>
          <button style={greenButtonStyle}>ŞİMDİ BAŞLA</button>
        </div>

        {/* Sağ form */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ marginBottom: '20px' }}>{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}</h2>

          {isRegistering && (
            <>
              <input name="name" type="text" placeholder="İsim" value={formData.name} onChange={handleChange} style={inputStyle} />
              {errors.name && <p style={errorStyle}>{errors.name}</p>}
            </>
          )}

          <input name="email" type="email" placeholder="E-posta adresi" value={formData.email} onChange={handleChange} style={inputStyle} />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}

          <input name="password" type="password" placeholder="Şifre" value={formData.password} onChange={handleChange} style={inputStyle} />
          {errors.password && <p style={errorStyle}>{errors.password}</p>}

          {isRegistering && (
            <>
              <input name="confirmPassword" type="password" placeholder="Şifreyi Onayla" value={formData.confirmPassword} onChange={handleChange} style={inputStyle} />
              {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
            </>
          )}

          {serverError && <p style={errorStyle}>{serverError}</p>}

          <button onClick={handleSubmit} style={submitButtonStyle}>
            {isRegistering ? 'KAYIT OL' : 'GİRİŞ YAP'}
          </button>

          <p style={{ marginTop: '10px', fontSize: '14px' }}>
            {isRegistering ? 'Zaten bir hesabın var mı? ' : 'Hesabın yok mu? '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleToggleRegister}>
              {isRegistering ? 'Giriş Yap' : 'Kaydol'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'sans-serif',
  position: 'relative',
  color: 'white',
  padding: '40px',
};

const overlayStyle = {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: 1,
};

const contentWrapperStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1100px',
  zIndex: 2,
  gap: '40px',
  flexWrap: 'wrap',
};

const leftBoxStyle = {
  flex: 1,
  minWidth: '300px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '30px',
  borderRadius: '12px',
};

const greenButtonStyle = {
  marginTop: '20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginTop: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '6px',
  color: 'white',
  outline: 'none',
};

const submitButtonStyle = {
  ...inputStyle,
  backgroundColor: 'rgba(40, 167, 69, 0.7)',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '15px',
};

const errorStyle = {
  color: 'salmon',
  fontSize: '13px',
  marginTop: '5px',
  marginBottom: '0',
};

export default LoginPage;
