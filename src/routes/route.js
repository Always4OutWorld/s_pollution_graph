
import {
    HOME_URL
} from './constant';
import HOMEPAGE from '../components/Home/index';

const normalRoutes = [
    {
      url: HOME_URL,
      component: {
        default: HOMEPAGE,
      },
    },
];

export default normalRoutes;
