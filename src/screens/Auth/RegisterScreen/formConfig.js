import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {PHONE_REGEX} from '../../../constants';

export const FORM_LOGIN = {
  phone: 'phone',
  sharer_phone: 'sharer_phone',
  pass: 'pass',
  confirm_pass: 'confirm_pass',
  email: 'email',
  name: 'name',
  note: 'note',
};

const schema = yup
  .object({
    [FORM_LOGIN.phone]: yup
      .string()
      .nullable()
      .required('CheckForm.required_phone')
      .min(10, 'CheckForm.min_phone'),
    // .max(15, 'CheckForm.max_phone')
    // .matches(PHONE_REGEX, 'CheckForm.matches_phone'),

    // [FORM_LOGIN.sharer_phone]: yup
    //   .string()
    //   .nullable()
    //   .required('CheckForm.required_phone')
    //   .matches(PHONE_REGEX, 'CheckForm.matches_phone')
    //   .min(10, 'CheckForm.min_phone')
    //   .max(10, 'CheckForm.max_phone'),
    [FORM_LOGIN.pass]: yup
      .string()
      .required('CheckForm.required_pass')
      .min(6, 'CheckForm.min_pass'),
    [FORM_LOGIN.confirm_pass]: yup
      .string()
      .required('CheckForm.required_pass_confirm')
      .min(6, 'CheckForm.min_pass')
      .oneOf([yup.ref('pass'), null], 'CheckForm.matches_confirm_pass'),
    [FORM_LOGIN.name]: yup
      .string()
      .required('CheckForm.required_name')
      .max(20, 'CheckForm.max_name')
      .min(2, 'CheckForm.min_name'),
    [FORM_LOGIN.email]: yup
      .string()
      .email('CheckForm.required_matches')
      .required('CheckForm.required_email'),
  })
  .required();

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_LOGIN.phone]: '',
    [FORM_LOGIN.sharer_phone]: '',
    [FORM_LOGIN.pass]: '',
    [FORM_LOGIN.confirm_pass]: '',
    [FORM_LOGIN.email]: '',
    [FORM_LOGIN.name]: '',
    [FORM_LOGIN.note]: '',
  },
};

export default formConfig;
