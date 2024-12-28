import * as yup from 'yup';

export const registerSchema = yup.object({
    email: yup
      .string()
      .email('Format email tidak valid')
      .required('Email wajib diisi'),
    password: yup
      .string()
      .min(8, 'Password minimal 8 karakter')
      .required('Password wajib diisi'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Konfirmasi password tidak sesuai")
      .required("Konfirmasi password wajib diisi"),
    first_name: yup
      .string()
      .required('Nama depan wajib diisi'),
    last_name: yup
      .string()
      .required('Nama belakang wajib diisi'),
});

export const loginSchema = yup.object({
    email: yup
      .string()
      .email('Format email tidak valid')
      .required('Email wajib diisi'),
    password: yup
      .string()
      .min(8, 'Password minimal 8 karakter')
      .required('Password wajib diisi')
  });