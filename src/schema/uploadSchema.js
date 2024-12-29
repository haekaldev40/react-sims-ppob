import * as yup from 'yup';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

export const profileImageSchema = yup.object().shape({
  profileImage: yup
    .mixed()
    .test("required", "Profile image is required", (value) => value?.length > 0)
    .test("fileSize", "File size is too large", (value) => {
      if (!value?.[0]) return true;
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Format Image tidak sesuai", (value) => {
      if (!value?.[0]) return true;
      return ["image/jpeg", "image/png"].includes(value[0].type);
    }),
});