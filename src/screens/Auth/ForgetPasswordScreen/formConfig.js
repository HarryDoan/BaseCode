import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const FORM_INPUT = {
  email: 'email',
};

const schema = yup.object({
  [FORM_INPUT.email]: yup
    .string()
    .email('CheckForm.required_matches')
    .nullable()
    .required('CheckForm.required_email'),
});

const formConfig = {
  resolver: yupResolver(schema),
  defaultValues: {
    [FORM_INPUT.email]: '',
  },
};

export default formConfig;
