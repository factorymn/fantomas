## Universal admin panel

---

``` $ npm i ```

``` $ npm start ```

Example config admin panel

```javascript
project: {
    name: 'Vegans', // name of project 
    description: '',
    meta: [],
    models: [
      {
        name: 'authors',
        type: 'authors', // type of template what be used on frontend 
        title: 'Авторы', // This text will be in navigation 
        route: 'authors', // Route for api calls. This filed important, because name, type and route can bee different 
        attributes: {
          name: {
            type: 'input',
            label: 'Имя',
            mask: false,
            required: true
          }
        }
      },
      {
        name: 'users',
        type: 'authors',
        title: 'Пользователи',
        route: 'users',
        attributes: {
          name: {
            type: 'input',
            label: 'Ник',
            mask: false,
            required: true
          }
        }
      },
      {
        name: 'news',
        type: 'news',
        title: 'Новости',
        route: 'news',
        attributes: {
          title: {
            type: 'input',
            label: 'Заголовок',
            required: true
          },
          active: {
            type: 'checkbox',
            label: 'Опубликовать',
          },
          text: {
            type: 'textarea',
            label: 'Описание',
          },
          date: {
            label: 'Дата',
            type: 'date-time-picker', // also can be date-picker, time-picker, date-time-picker
            required: true
          }
        }
      }
    ]
  }
```