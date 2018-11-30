import TextField from 'material-ui/TextField';
import Select from './Select/Select';
import Collection from './Collection/Collection';
import Image from './Image/Image';
import DateRange from './DateRange/DateRange';
import RichEdotir from './RichEdotir/RichEdotir';
import Editor from './Editor/Editor';
import Gallery from './Gallery/Gallery';

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
  {
    id: 6,
    name: 'rich-editor',
    component: RichEdotir
  },
  {
    id: 7,
    name: 'editor',
    component: Editor
  },
  {
    id: 8,
    name: 'gallery',
    component: Gallery
  },
];
export { inputComponents };
