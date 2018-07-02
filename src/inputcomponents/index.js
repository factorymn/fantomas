import TextField from 'material-ui/TextField';
import Select from './Select/Select';
import Collection from './Collection/Collection';
import Image from './Image/Image';
import DateRange from './DateRange/DateRange';

const inputComponents = [
  {
    id: 1,
    name: 'string',
    component: TextField
  },
  {
    id: 2,
    name: 'select',
    component: Select
  },
  {
    id: 3,
    name: 'image',
    component: Image
  },
  {
    id: 4,
    name: 'collection',
    component: Collection
  },
  {
    id: 5,
    name: 'date-range',
    component: DateRange
  },
];
export { inputComponents };
