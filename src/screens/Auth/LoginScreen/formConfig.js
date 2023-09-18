import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const FORM_LOGIN = {
  email_or_phone: 'email_or_phone',
  pass: 'pass',
};

const schema = yup.object().shape({
  [FORM_LOGIN.email_or_phone]: yup
    .string()
    .required('CheckForm.required_email_phone')
    .test('email_or_phone', 'CheckForm.invalid_email_phone', value => {
      return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
    }),
  [FORM_LOGIN.pass]: yup.string().required('CheckForm.required_pass'),
});

const validateEmail = email => {
  return yup.string().email().isValidSync(email);
};

const validatePhone = phone => {
  return yup
    .string()
    .nullable()
    .required('CheckForm.required_phone')
    .min(10, 'CheckForm.min_phone');
};

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_LOGIN.email_or_phone]: '',
    [FORM_LOGIN.pass]: '',
  },
};

export default formConfig;
