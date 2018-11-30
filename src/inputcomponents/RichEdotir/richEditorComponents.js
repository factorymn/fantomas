import Grid from './Grid/Grid';
import Editor from '../Editor/Editor';
import Gallery from '../Gallery/Gallery';

const richEditorComponents = [
  {
    id: 1,
    name: 'grid',
    label: 'Сетка',
    component: Grid
  },
  {
    id: 2,
    name: 'editor',
    label: 'Редактор',
    component: Editor
  },
  {
    id: 3,
    name: 'gallery',
    label: 'Галерея',
    component: Gallery
  },
];
export { richEditorComponents };
