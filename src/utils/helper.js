/* eslint-disable no-bitwise */
import {CURRENCY} from '@constants';
import {commonRoot} from '@navigation/navigationRef';
import router from '@navigation/router';
import actions, {_onUnmount} from '@redux/actions';
import store from '@redux/store';
import I18n from 'i18n';
import {t} from 'i18next';
import moment from 'moment';
import {Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {check, request, RESULTS} from 'react-native-permissions';

export const randomNumberString = () => {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

const formatter = new Intl.NumberFormat('en-US');
export const formatCurrency = (number, suffix = CURRENCY.lao) => {
  return number ? `${formatter.format(+number)}${suffix}` : `0${suffix}`;
};

export const getDistanceFromUser = ({lat1, lon1, lat2, lon2}) => {
  //const p = 0.017453292519943295; // Math.PI / 180
  if ((lat1, lon1, lat2, lon2)) {
    const p = Math.PI / 180;
    const c = Math.cos;
    const a =
      0.5 -
      c((lat2 - lat1) * p) / 2 +
      (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
  return 0;
};

export const convertHidePrice = price => {
  let formatted = formatCurrency(price);
  switch (price.toString().length) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return `?${formatted.slice(1)}`;
    case 6:
    case 8:
    case 9:
      return `${formatted[0]}?${formatted.slice(2)}`;
    case 7:
      return `${formatted.slice(0, 2)}??${formatted.slice(4)}`;
    default:
      return `?${CURRENCY.lao}`;
  }
};

export const translate = (screenName, title) => {
  return title ? I18n.t(`${screenName}.${title}`) : I18n.t(`${screenName}`);
};

export const convertMillisecond = millisecond => {
  var date = new Date(parseInt(millisecond * 1000, 10));
  return date;
};

export const isNotchPhone = DeviceInfo.hasNotch();

export const beginMonth = moment().startOf('month');

export const endMonth = moment().endOf('month');

export const handleExpiredToken = error => {
  const {code} = error?.response?.data || {};

  if (code === 401) {
    Alert.alert(
      I18n.t('TitleShow.expired_token'),
      I18n.t('TitleShow.have_not_account'),
      [
        {
          text: t('TitleShow.agree'),
          onPress: () => {
            store.dispatch({type: actions.GET_BANNER_HOME});
            store.dispatch({
              type: actions.GET_EVENT_UPCOMING_HOME,
              params: {search_type: 'upcoming'},
            });
            store.dispatch({
              type: actions.GET_EVENT_ONGOING_HOME,
              params: {search_type: 'happenning'},
            });
            store.dispatch({
              type: actions.GET_EVENT_POPULAR_HOME,
              params: {search_type: 'focus', numshow: 5},
            });

            store.dispatch({type: actions.UNMOUNT_USER});
            store.dispatch({type: _onUnmount(actions.GET_USER)});
          },
        },
      ],
      {cancelable: false},
    );
  } else if (code === 403) {
    Alert.alert(
      I18n.t('TitleShow.expired_token'),
      I18n.t('TitleShow.restart_app'),
      [
        {
          text: t('TitleShow.agree'),
          onPress: () => {
            store.dispatch({type: actions.GET_BANNER_HOME});
            store.dispatch({
              type: actions.GET_EVENT_UPCOMING_HOME,
              params: {search_type: 'upcoming'},
            });
            store.dispatch({
              type: actions.GET_EVENT_ONGOING_HOME,
              params: {search_type: 'happenning'},
            });
            store.dispatch({
              type: actions.GET_EVENT_POPULAR_HOME,
              params: {search_type: 'focus', numshow: 5},
            });

            store.dispatch({type: actions.UNMOUNT_USER});
            store.dispatch({type: _onUnmount(actions.GET_USER)});
          },
        },
      ],
      {cancelable: false},
    );
  }
};

export const secondsToHms = d => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? String(h).padStart(2, '0') + ':' : '00:';
  var mDisplay = m > 0 ? String(m).padStart(2, '0') + ':' : '00:';
  var sDisplay = s > 0 ? String(s).padStart(2, '0') : '00';
  return hDisplay + mDisplay + sDisplay;
};

export function throttle(callback, limit = 300) {
  let waiting = false;
  return function () {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

export const createDataTemplate = arrayLength => {
  if (arrayLength) {
    let arrayTemplate = [];
    for (let index = 0; index < arrayLength; index++) {
      arrayTemplate = [...arrayTemplate, {}];
    }
    return arrayTemplate;
  } else {
    return [];
  }
};

export const handleFormData = (objectBody = {}) => {
  if (objectBody instanceof FormData) {
    return objectBody;
  }
  const formData = new FormData();
  for (const [key, value] of Object.entries(objectBody)) {
    if (Array.isArray(value)) {
      value.forEach(v => {
        if (v || v === 0) {
          formData.append(key, v);
        }
      });
    } else if (value || value === 0) {
      formData.append(key, value);
    }
  }
  return formData;
};

const checkResult = result => {
  switch (result) {
    case RESULTS.UNAVAILABLE:
      throw 'This feature is not available';
    case RESULTS.BLOCKED:
      throw 'The permission is blocked';
    case RESULTS.LIMITED:
      throw 'The permission is granted but with limitations';
    case RESULTS.DENIED:
      if (__DEV__) {
        console.log('The permission is denied and can be requested again');
      }
      return false;
    case RESULTS.GRANTED:
      return true;
    default:
      throw 'Unknown error';
  }
};

export const checkAndRequestPermission = async permission => {
  try {
    const resultCheck = await check(permission);
    if (!checkResult(resultCheck)) {
      const resultRequest = await request(permission);
      if (checkResult(resultRequest)) {
        return true;
      }
      throw 'User denied request permission';
    }
    return true;
  } catch (error) {
    if (__DEV__) {
      console.log('request permission error', {error, permission});
    }
    throw error;
  }
};

export const formatPhoneNumber = (phone, countryCode = '+84') => {
  let sPhone = phone.toString();
  while (sPhone.charAt(0) === '0') {
    sPhone = sPhone.slice(1);
  }
  return countryCode + sPhone;
};

export const listYearFromNow = (from = 0, sort = 1) => {
  const currentYear = new Date().getFullYear();
  return [...Array(currentYear)]
    .map((_, i) => i + 1)
    .filter(y => y >= from)
    .sort((a, b) => (a - b) * sort);
};

export function getDistanceFromLatLng(lat1, lon1, lat2, lon2) {
  //const p = 0.017453292519943295; // Math.PI / 180
  const p = Math.PI / 180;
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export function idGenerate() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

export const formatPrice = number => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const decodePolyline = encoded => {
  if (!encoded) {
    return [];
  }
  let poly = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let b,
      shift = 0,
      result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);

    let dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);

    let dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    let p = {
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    };
    poly.push(p);
  }
  return poly;
};

export const tryParseNumber = (
  number,
  {fallback = 0, isFloat = false, radix = 10} = {},
) => {
  const result = isFloat ? parseFloat(number) : parseInt(number, radix);
  if (isNaN(result)) {
    return fallback;
  }
  return result;
};

export const removeAccents = (str = '') => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const searchIgnoreCase = (sourceString = '', searchString = '') => {
  if (!sourceString || !searchString) {
    return false;
  }
  return sourceString.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
};

export const searchIgnoreCaseAccent = (
  sourceString = '',
  searchString = '',
) => {
  if (!sourceString || !searchString) {
    return false;
  }
  return searchIgnoreCase(
    removeAccents(sourceString),
    removeAccents(searchString),
  );
};

export const convertOption = (arr_option_tmp, option1, option2, option3) => {
  return arr_option_tmp?.find(value => {
    const checkOption1 = value.Option1 === option1;
    const checkOption2 = value.Option2 === option2;
    const checkOption3 = value.Option3 === option3;
    return checkOption1 && checkOption2 && checkOption3;
  });
};
