import {Block, Carousel, Image} from '@components';
import {IMAGES, icons} from '@assets';
import {bottomRoot, commonRoot} from '@navigation/navigationRef';

import {COLORS} from '@theme';
import {ImageBackground} from 'react-native';
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
];

const renderPicture = ({item, i}) => {
  return (
    <ImageBackground
      key={i}
      style={{
        backgroundColor: COLORS.transparentColor,
        borderRadius: 5,
        height: 111,
      }}
      source={item.img_link ? {uri: item.img_link} : null}
      resizeMode="cover"
    />
  );
};
const dataImage = {
  img_link:
    'https://www.google.com/search?sca_esv=566478814&rlz=1C5CHFA_enVN1074VN1075&sxsrf=AM9HkKnyvH2ebX-ohKGsYfhJO0TsKdfJhA:1695100394229&q=image&tbm=isch&source=lnms&sa=X&ved=2ahUKEwil0-yG9bWBAxWXklYBHTAeDkIQ0pQJegQIDBAB&biw=1369&bih=672&dpr=2#imgrc=YmDohMp4T5AODM',
};

export const fakeAPI1 = [
  {
    content: 'content 1',
    component: () => {
      return (
        <Block style={{width: 100, height: 100}}>
          <Image
            source={{
              uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
            }}
            style={{width: 100, height: 100}}
          />
        </Block>
      );
    },
  },
  {
    content: 'content 2',
    component: () => {
      return (
        <Block style={{width: 100, height: 100}}>
          <Image
            source={{
              uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
            }}
            style={{width: 100, height: 100}}
          />
        </Block>
      );
    },
  },
  {
    content: 'content 3',
    component: () => {
      return (
        <Block style={{width: 100, height: 100}}>
          <Image
            source={{
              uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
            }}
            style={{width: 100, height: 100}}
          />
        </Block>
      );
    },
  },
];
export const fakeAPI2 = [
  {
    content: 'content 1',
    component: () => {
      return (
        <Block style={{width: 100, height: 100}}>
          <Image
            source={{
              uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
            }}
            style={{width: 100, height: 100}}
          />
        </Block>
      );
    },
  },
  {
    content: 'content 2',
    component: () => {
      return (
        <Block style={{width: 100, height: 100}}>
          <Image
            source={{
              uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
            }}
            style={{width: 100, height: 100}}
          />
        </Block>
      );
    },
  },
];

export const fakeAPI3 = [
  {
    content: 'content 1',
    component: () => {
      return (
        <Block style={{width: 100, height: 100}}>
          <Image
            source={{
              uri: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg',
            }}
            style={{width: 100, height: 100}}
          />
        </Block>
      );
    },
  },
];

export const fakeDataList = [
  {
    id: 1,
    icon: icons.ic_1,
    title: 'iShopCurates',
  },
  {
    id: 2,
    icon: icons.ic_2,
    title: 'Gift Sets',
  },
  {
    id: 3,
    icon: icons.ic_3,
    title: 'Earn rewards',
  },
  {
    id: 4,
    icon: icons.ic_4,
    title: 'GoLocal',
  },
  {
    id: 5,
    icon: icons.ic_5,
    title: 'Influencer',
  },
];
export const fakeDataTitle = [
  {
    id: 1,
    icon: icons.ic_1,
    title: 'Wines & Spirits',
  },
  {
    id: 2,
    icon: icons.ic_2,
    title: 'Beauty',
  },
  {
    id: 3,
    icon: icons.ic_3,
    title: 'Electronics',
  },
  {
    id: 4,
    icon: icons.ic_4,
    title: 'Fashion',
  },
  {
    id: 5,
    icon: icons.ic_5,
    title: 'Food',
  },
];

export const fakeDataTitle1 = [
  {
    id: 1,
    icon: icons.ic_1,
    title: 'Wines & Spirits',
    data: [
      {
        id: 1,
        icon: icons.ic_1,
        title: 'Wines & Spirits',
      },
      {
        id: 2,
        icon: icons.ic_2,
        title: 'Beauty',
      },
      {
        id: 1,
        icon: icons.ic_1,
        title: 'Wines & Spirits',
      },
      {
        id: 2,
        icon: icons.ic_2,
        title: 'Beauty',
      },
      {
        id: 1,
        icon: icons.ic_1,
        title: 'Wines & Spirits',
      },
      {
        id: 2,
        icon: icons.ic_2,
        title: 'Beauty',
      },
    ],
  },
];
