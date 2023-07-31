import * as yup from 'yup';

export const gstAccountingValidationSchema = yup.object().shape({
  gst_number: yup.string().required(),
  accounting_data: yup.string().required(),
  user_id: yup.string().nullable(),
});
