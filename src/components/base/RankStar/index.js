import {Block, Image} from '@components';

import React from 'react';
import {icons} from '@assets';

const dataRank = [{id: 5}, {id: 4}, {id: 3}, {id: 2}, {id: 1}];

const RankStar = ({value, size}) => {
  return (
    <Block rowCenter spaceBetween>
      {dataRank?.map((i, idx) => {
        return (
          <Block key={idx} rowCenter flexGrow>
            <Image
              source={value >= idx + 1 ? icons?.ic_star : icons?.ic_star_dis}
              height={size || 10}
              width={size || 10}
            />
          </Block>
        );
      })}
    </Block>
  );
};

export default RankStar;
