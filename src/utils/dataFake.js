import {bottomRoot, commonRoot} from '@navigation/navigationRef';

import {icons} from '@assets';
import router from '@navigation/router';
import {t} from 'i18next';

export const dataOptionProfile = [
  {
    label: 'ProfileScreen.list_like',
    icon: icons?.ic_like,
    naviga: () => {
      commonRoot.navigate(router.FAVORITE_LIST_SCREEN);
    },
  },
  {
    label: 'ProfileScreen.recently_viewed',
    icon: icons?.ic_watched,
    naviga: () => {
      commonRoot.navigate(router.RECENTLY_VIEWED_SCREEN);
    },
  },
  // {
  //   label: 'ProfileScreen.products_later',
  //   icon: icons?.ic_products_later,
  //   naviga: () => {
  //     commonRoot.navigate(router.PRODUCTS_BUY_LATER_SCREEN);
  //   },
  // },
  {
    label: 'ProfileScreen.voucher',
    icon: icons?.icon_profile_voucher,
    naviga: () => {
      bottomRoot.navigate(router.VOUCHER_SCREEN);
    },
  },
  {
    label: 'ProfileScreen.saved_address',
    icon: icons?.ic_address_save,
    naviga: () => {
      commonRoot.navigate(router.ADDRESS_SAVE_SCREEN);
    },
  },
  {
    label: 'ProfileScreen.product_review',
    icon: icons?.ic_review_product,
    naviga: () => {
      commonRoot.navigate(router.YOUR_REVIEW_SCREEN);
    },
  },
  {
    label: 'ProfileScreen.cumulative_coins',
    icon: icons?.ic_coins,
    naviga: () => {
      commonRoot.navigate(router.ACCUMULATED_COINS_SCREEN);
    },
  },
  {
    label: 'ProfileScreen.accumulated_points',
    icon: icons?.ic_poins,
    naviga: () => {
      commonRoot.navigate(router.ACCUMULATED_POINT_SCREEN);
    },
  },
  {
    label: 'ProfileScreen.refer_friend',
    icon: icons?.ic_introduce,
    naviga: () => {
      commonRoot.navigate(router.INTRODUCE_YOUR_SCREEN);
    },
  },
  // {
  //   label: 'ProfileScreen.payment_methods',
  //   icon: icons?.ic_payment,
  //   naviga: () => {
  //     commonRoot.navigate(router.PAYMENT_METHODS_SCREEN);
  //   },
  // },
  {
    label: 'ProfileScreen.language',
    icon: icons?.ic_language,
    naviga: () => {
      commonRoot.navigate(router.SETTING_LANGUAGE_SCREEN);
    },
  },
  {
    label: 'ProfileScreen.account_settings',
    icon: icons?.ic_setting,
    naviga: () => {
      commonRoot.navigate(router.ACCOUNT_INFO_SCREEN);
    },
  },
  {
    label: 'ProfileScreen.support_center',
    icon: icons?.ic_support,
    naviga: () => {
      commonRoot.navigate(router.SUPPORT_CENTER_SCREEN);
    },
  },
];

export const dataSex = [
  {
    value: '0',
    label: t('AccountInfoScreen.male'),
  },
  {
    value: '1',
    label: t('AccountInfoScreen.female'),
  },
];

export const dataHeaderStore = [
  {
    item_id: 1,
    title: 'PopupScreen.go_home',
    icon: icons?.ic_home_white,
  },
  {
    item_id: 2,
    title: 'PopupScreen.share',
    icon: icons?.ic_share_store,
  },
  {
    item_id: 3,
    title: 'PopupScreen.report_shop',
    icon: icons?.ic_report_white,
  },
  {
    item_id: 4,
    title: 'PopupScreen.need_help',
    icon: icons?.ic_help_white,
  },
];

export const suggestToday = [
  {
    group_id: 'you_may_also_like',
    image: icons?.ic_forU,
    title: t('homeScreen.forYou'),
  },
  // {
  //   group_id: 'nodata1',
  //   image: icons?.ic_freeShip,
  //   title: 'Miễn phí vận chuyển',
  // },
  // {
  //   group_id: 'nodata2',
  //   image: icons?.ic_newProduct,
  //   title: 'Hàng mới về',
  // },
  // {
  //   group_id: 'nodata3',
  //   image: icons?.ic_voucherHot,
  //   title: 'Khuyến mãi hot',
  // },
];
