import * as yup from 'yup';

export const erpProcessValidationSchema = yup.object().shape({
  process_name: yup.string().required(),
  automation_status: yup.boolean().required(),
  user_id: yup.string().nullable(),
});
