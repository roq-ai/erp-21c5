import * as yup from 'yup';

export const dataAnalysisValidationSchema = yup.object().shape({
  analysis_data: yup.string().required(),
  user_id: yup.string().nullable(),
});
