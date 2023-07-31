import * as yup from 'yup';

export const engagementValidationSchema = yup.object().shape({
  engagement_score: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
