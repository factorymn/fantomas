export const project = {
  name: 'Marathon',
  description: '',
  meta: [],
  models: [
    // // RUN
    {
      name: 'run',
      title: 'Сайты',
      route: 'run',
      // view: {
      //   component: 'Card',
      //   attributes: {
      //     title: 'titleLocale',
      //     subtitle: 'domain'
      //   },
      //   actions: [
      //     {
      //       label: 'Добавить год',
      //       type: 'link',
      //       route: '/run/:id/yearcontent/new',
      //     }
      //   ],
      // },
      view: {
        attributes: [
          {
            label: 'ID',
            value: 'id'
          },
          {
            label: 'Название сайта',
            value: 'titleLocale'
          },
          {
            label: 'Домен',
            value: 'domain'
          }
        ],
        actions: [
          {
            label: 'Добавить год',
            type: 'link',
            route: '/run/:id/yearcontent/new',
          }
        ],
      },
      attributes: [
        {
          block: 'Основная информация',
          content: {
            titleLocale: {
              view: 'TextField',
              label: 'Название',
              mask: false,
              required: true
            },
            domain: {
              view: 'TextField',
              label: 'Домен',
              mask: false,
              required: true
            },
            isHidden: {
              view: 'Checkbox',
              label: 'Не выводить на главной странице'
            },
          }
        },
        {
          block: 'Заголовок',
          content: {
            locale: {
              view: 'Editor',
              label: 'Заголовок',
            },
          }
        },
        {
          block: 'Контактная информация',
          content: {
            contactLocale: {
              view: 'Editor',
              label: 'Описание'
            },
          }
        },
        {
          block: 'Контактная для прессы',
          content: {
            pressContactsLocale: {
              view: 'Editor',
              label: 'Описание'
            },
          }
        },
        {
          block: 'Адрес',
          content: {
            addressLocale: {
              view: 'Editor',
              label: 'Описание'
            },
          }
        },
      ],
      behavior: {
        edit: true,
        create: true,
        remove: true
      },
      // Child models
      // Child midels can include another models
      models: [
        {
          name: 'yearContent',
          title: 'Год',
          route: 'yearcontent',
          view: {
            attributes: [
              {
                label: 'ID',
                value: 'id'
              },
              {
                label: 'Год',
                value: 'year'
              },
              {
                label: 'Дата старта',
                value: 'dateStart',
                type: 'date'
              }
            ],
          },
          attributes: [
            {
              block: 'Основная информация',
              content: {
                year: {
                  view: 'TextField',
                  label: 'Год',
                },
                dateStart: {
                  view: 'DatePicker',
                  label: 'Дата старта забега',
                },
                // timeStart: {
                //   view: 'TimePicker',
                //   label: 'Время старта забега',
                // },
                // distance: {
                //   view: 'TextField',
                //   label: 'Дистанция',
                // },
                colorSchemeId: {
                  view: 'SelectField',
                  label: 'Цветовая схема',
                  // options: 'categories',
                  options: {
                    name: 'colorscheme',
                    route: '/colorscheme/',
                    fields: {
                      label: 'name',
                      value: 'id'
                    },
                  },
                },
              }
            },
            {
              block: 'Ссылка на регистрацию',
              content: {
                registrationLink: {
                  view: 'TextField',
                  label: 'URL',
                },
                registrationLinkViewStartDate: {
                  view: 'DatePicker',
                  label: 'Отображать с',
                },
                registrationLinkViewEndDate: {
                  view: 'DatePicker',
                  label: 'Отображать по',
                },
              }
            },
            {
              block: 'Описание забега',
              content: {
                locale: {
                  view: 'Editor',
                  label: 'Описание'
                },
              }
            },
            {
              block: 'Описание маршрута',
              content: {
                runRouteDescriptionLocale: {
                  view: 'Editor',
                  label: 'Описание'
                },
              }
            },
            // {
            //   block: 'Якоря на странице результатов',
            //   content: {
            //     linksLocale: {
            //       view: 'Editor',
            //       label: 'Описание'
            //     },
            //   }
            // },
            {
              block: 'Информация на странице результатов',
              content: {
                descriptionLocale: {
                  view: 'Editor',
                  label: 'Описание'
                },
              }
            },
            // {
            //   block: 'Логотип',
            //   content: {
            //     logoImage: {
            //       view: 'ImagesUpload',
            //       label: 'Фотографии',
            //       multiple: false,
            //     }
            //   }
            // },
            {
              block: 'Схема забега',
              content: {
                runRouteDocument: {
                  view: 'ImagesUpload',
                  label: 'Фотографии',
                  multiple: false,
                }
              }
            },
            // {
            //   block: 'Изображение под схемой',
            //   content: {
            //     runRouteImage: {
            //       view: 'ImagesUpload',
            //       label: 'Фотографии',
            //       multiple: false,
            //     }
            //   }
            // },
          ],
          behavior: {
            edit: true,
            create: true,
            remove: true
          },
          models: [
            // PRESSKIT
            {
              name: 'presskit',
              title: 'Пресс-релизы',
              route: 'presskit',
              // view: {
              //   component: 'Card',
              //   attributes: {
              //     headerTitle: 'titleLocale',
              //     mediaImg: 'imageFSPath'
              //   }
              // },
              view: {
                attributes: [
                  {
                    label: 'ID',
                    value: 'id'
                  },
                  {
                    label: 'Пресс-релиз',
                    value: 'titleLocale'
                  }
                ],
              },
              attributes: [
                {
                  block: 'Основная информация',
                  content: {
                    // language: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Язык',
                    //   title: 'Язык',
                    //   params: [
                    //     {
                    //       label: 'Английский',
                    //       value: 'english'
                    //     },
                    //     {
                    //       label: 'Русский',
                    //       value: 'russian'
                    //     }
                    //   ]
                    // },
                    titleLocale: {
                      view: 'TextField',
                      label: 'Заголовок',
                    },
                  }
                },
                {
                  block: 'Контент',
                  content: {
                    locale: {
                      view: 'Editor',
                      label: 'Контент',
                    },
                  }
                },
                {
                  block: 'Файл',
                  content: {
                    document: {
                      view: 'ImagesUpload',
                      label: 'Файл',
                      multiple: false,
                    }
                  }
                },

              ],
              behavior: {
                edit: true,
                create: true,
                remove: true
              },
            },
            // PARTNERS
            {
              name: 'partner',
              title: 'Партнеры',
              route: 'partner',
              view: {
                attributes: [
                  {
                    label: 'ID',
                    value: 'id'
                  },
                  {
                    label: 'Сортировка',
                    value: 'order'
                  },
                  {
                    label: 'Показывать',
                    value: 'isShown'
                  },
                  {
                    label: 'Главный',
                    value: 'isMain'
                  },
                  {
                    label: 'Лого',
                    value: 'imageFSPath',
                    type: 'image'
                  },
                  {
                    label: 'Партнер',
                    value: 'locale'
                  },
                  {
                    label: 'Тип партнера',
                    value: 'partnerTypeLocale'
                  }
                ],
              },
              attributes: [
                {
                  block: 'Основная информация',
                  content: {
                    // language: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Язык',
                    //   title: 'Язык',
                    //   params: [
                    //     {
                    //       label: 'Английский',
                    //       value: 'english'
                    //     },
                    //     {
                    //       label: 'Русский',
                    //       value: 'russian'
                    //     }
                    //   ]
                    // },
                    isShown: {
                      view: 'Checkbox',
                      title: 'Отображение партнера',
                      label: 'Отображать'
                    },
                    isMain: {
                      view: 'Checkbox',
                      title: 'Статус партнера',
                      label: 'Главный партнер'
                    },
                    order: {
                      view: 'TextField',
                      label: 'Сортировка'
                    },
                    locale: {
                      view: 'TextField',
                      label: 'Заголовок',
                      required: true,
                    },
                    url: {
                      view: 'TextField',
                      label: 'URL',
                    },
                    // partnerTypeId: {
                    //   view: 'TextField',
                    //   label: 'Тип партнера',
                    // },
                    partnerTypeId: {
                      view: 'SelectField',
                      label: 'Тип партнера',
                      required: true,
                      // options: 'categories',
                      options: {
                        name: 'partnertypes',
                        route: '/partnertype/',
                        fields: {
                          label: 'locale',
                          value: 'id'
                        },
                      },
                    },
                    // field: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Тип',
                    //   title: '',
                    //   params: [
                    //     {
                    //       label: 'Тип записи: Информаци о партнере',
                    //       value: 'partner_name'
                    //     },
                    //   ]
                    // },
                  }
                },
                {
                  block: 'Изображение',
                  content: {
                    image: {
                      view: 'ImagesUpload',
                      label: 'Фотографии',
                      multiple: false,
                    }
                  }
                },

              ],
              behavior: {
                edit: true,
                create: true,
                remove: true
              },
            },
            // PHOTOS
            {
              name: 'photo',
              title: 'Фотографии',
              route: 'photo',
              // view: {
              //   component: 'Card',
              //   attributes: {
              //     headerTitle: 'locale',
              //     mediaImg: 'imageFSPath'
              //   }
              // },
              view: {
                attributes: [
                  {
                    label: 'ID',
                    value: 'id'
                  },
                  {
                    label: 'Фото',
                    value: 'imageFSPath',
                    type: 'image'
                  },
                  {
                    label: 'Заголовок',
                    value: 'locale'
                  }
                ],
              },

              attributes: [
                {
                  block: 'Основная информация',
                  content: {
                    // language: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Язык',
                    //   title: 'Язык',
                    //   params: [
                    //     {
                    //       label: 'Английский',
                    //       value: 'english'
                    //     },
                    //     {
                    //       label: 'Русский',
                    //       value: 'russian'
                    //     }
                    //   ]
                    // },
                    locale: {
                      view: 'TextField',
                      label: 'Заголовок',
                      mask: false,
                      required: true
                    },
                    // field: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Тип',
                    //   title: '',
                    //   params: [
                    //     {
                    //       label: 'Тип записи: Информаци о партнере',
                    //       value: 'photo-comment'
                    //     },
                    //   ]
                    // },
                  }
                },
                {
                  block: 'Изображение',
                  content: {
                    image: {
                      view: 'ImagesUpload',
                      label: 'Фотографии',
                      multiple: false,
                      route: 'place/addPhoto',
                      query: {
                        place_id: 'id'
                      }
                    }
                  }
                },

              ],
              behavior: {
                edit: false,
                create: true,
                remove: true
              },
            },
            // VIDEOS
            {
              name: 'video',
              title: 'Видео',
              route: 'video',
              // view: {
              //   component: 'Card',
              //   attributes: {
              //     headerTitle: 'locale'
              //   }
              // },

              view: {
                attributes: [
                  {
                    label: 'ID',
                    value: 'id'
                  },
                  {
                    label: 'Заголовок',
                    value: 'locale'
                  },
                  {
                    label: 'Изображение вместо видео',
                    type: 'image',
                    value: 'previewImageFSPath'
                  }
                ],
              },
              attributes: [
                {
                  block: 'Основная информация',
                  content: {
                    // language: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Язык',
                    //   title: 'Язык',
                    //   params: [
                    //     {
                    //       label: 'Английский',
                    //       value: 'english'
                    //     },
                    //     {
                    //       label: 'Русский',
                    //       value: 'russian'
                    //     }
                    //   ]
                    // },

                    locale: {
                      view: 'TextField',
                      label: 'Заголовок',
                    },
                    url: {
                      view: 'TextField',
                      label: 'Url',
                    },
                    // field: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Тип',
                    //   title: '',
                    //   params: [
                    //     {
                    //       label: 'Тип записи: Информаци о результатах',
                    //       value: 'photo-comment'
                    //     },
                    //   ]
                    // },
                  }
                },
                {
                  block: 'Замещающая картинка',
                  content: {
                    previewImage: {
                      view: 'ImagesUpload',
                      label: 'Замещающая картинка',
                      multiple: false,
                    }
                  }
                },
              ],
              behavior: {
                edit: true,
                create: true,
                remove: true
              },
            },
            // RESULTS
            {
              name: 'results',
              title: 'Результаты',
              route: 'results',
              // view: {
              //   component: 'Card',
              //   attributes: {
              //     headerTitle: 'locale'
              //   }
              // },
              view: {
                attributes: [
                  {
                    label: 'ID',
                    value: 'id'
                  },
                  {
                    label: 'Заголовок',
                    value: 'locale'
                  }
                ],
              },
              attributes: [
                {
                  block: 'Основная информация',
                  content: {
                    locale: {
                      view: 'TextField',
                      label: 'Заголовок',
                    },

                    eventId: {
                      view: 'SelectField',
                      label: 'Событие',
                      // options: 'categories',
                      options: {
                        name: 'eventId',
                        route: '/event/',
                        fields: {
                          label: 'locale',
                          value: 'id'
                        },
                      },
                    },
                    chronoTrackLiveBracketId: {
                      view: 'TextField',
                      label: 'Bracket ID',
                    },
                    // url: {
                    //   view: 'TextField',
                    //   label: 'Url',
                    // },
                    gender: {
                      view: 'RadioButtonGroup',
                      label: 'Пол',
                      title: 'Пол',
                      params: [
                        {
                          label: 'Муж',
                          value: '0'
                        },
                        {
                          label: 'Жен',
                          value: '1'
                        },
                        {
                          label: 'Все',
                          value: '2'
                        },
                      ]
                    },
                    category: {
                      view: 'TextField',
                      label: 'Категория',
                    },
                    // isRealTime: {
                    //   view: 'Checkbox',
                    //   title: 'Резальтаты в реальном времени',
                    //   label: 'Доступно'
                    // },
                    getResultsType: {
                      view: 'RadioButtonGroup',
                      label: 'Загрузить результаты',
                      title: 'Загрузить результаты',
                      params: [
                        {
                          label: 'Из файла',
                          value: '0'
                        },
                        {
                          label: 'По API',
                          value: '1'
                        },
                        {
                          label: 'По API в реальном времени',
                          value: '2'
                        },
                      ]
                    },
                    // isFromDocument: {
                    //   view: 'Checkbox',
                    //   title: 'Сохранить в базу из документа',
                    //   label: 'Загружать'
                    // },
                    // isSaveToDB: {
                    //   view: 'Checkbox',
                    //   title: 'Сохранить в базу с сайта chronotrack',
                    //   label: 'Сохранить'
                    // },
                  }
                },

                {
                  block: 'Прикрепить файл результатов JSON файла и сохранить в базу',
                  content: {
                    eventResultsJSONFile: {
                      view: 'ImagesUpload',
                      label: 'Фотографии',
                      multiple: false,
                    }
                  }
                },

                {
                  block: 'Прикрепить файл команд XLS',
                  content: {
                    teamsTableXLSFile: {
                      view: 'ImagesUpload',
                      label: 'Фотографии',
                      multiple: false,
                    }
                  }
                },
              ],
              behavior: {
                edit: true,
                create: true,
                remove: true
              },
            },
            // MENU ITEM
            {
              name: 'menuitem',
              title: 'Меню',
              route: 'menuitem',
              // view: {
              //   component: 'Card',
              //   attributes: {
              //     headerTitle: 'locale'
              //   }
              // },

              view: {
                attributes: [
                  {
                    label: 'ID',
                    value: 'id'
                  },
                  {
                    label: 'Сортировка',
                    value: 'order'
                  },
                  {
                    label: 'Заголовок',
                    value: 'locale'
                  },
                  {
                    label: 'ID родительского меню',
                    value: 'parentId'
                  }
                ],
              },
              attributes: [
                {
                  block: 'Основная информация',
                  content: {
                    // language: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Язык',
                    //   title: 'Язык',
                    //   params: [
                    //     {
                    //       label: 'Английский',
                    //       value: 'english'
                    //     },
                    //     {
                    //       label: 'Русский',
                    //       value: 'russian'
                    //     }
                    //   ]
                    // },
                    // parentId: {
                    //   view: 'TextField',
                    //   label: 'Родительское меню',
                    // },
                    parentId: {
                      view: 'SelectField',
                      label: 'Родительское меню',
                      // options: 'categories',
                      options: {
                        name: 'parentMenuItems',
                        route: '/menuitem/',
                        fields: {
                          label: 'locale',
                          value: 'id'
                        },
                      },
                    },
                    locale: {
                      view: 'TextField',
                      label: 'Заголовок',
                    },
                    link: {
                      view: 'TextField',
                      label: 'Якорь',
                    },
                    order: {
                      view: 'TextField',
                      label: 'Сортировка',
                    },
                    // field: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Тип',
                    //   title: '',
                    //   params: [
                    //     {
                    //       label: 'Тип записи: Информаци о разделах',
                    //       value: 'menu-item-title'
                    //     },
                    //   ]
                    // },
                  }
                },
              ],
              behavior: {
                edit: true,
                create: true,
                remove: true
              },
            },
            // EVENTS
            {
              name: 'event',
              title: 'События',
              route: 'event',
              view: {
                attributes: [
                  {
                    label: 'ID',
                    value: 'id'
                  },
                  {
                    label: 'Событие',
                    value: 'locale'
                  },
                  {
                    label: 'Дистанция',
                    value: 'distance'
                  },
                  {
                    label: 'Время старта забега',
                    value: 'timeStart',
                    type: 'time'
                  }
                ],
              },
              attributes: [
                {
                  block: 'Основная информация',
                  content: {
                    // language: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Язык',
                    //   title: 'Язык',
                    //   params: [
                    //     {
                    //       label: 'Английский',
                    //       value: 'english'
                    //     },
                    //     {
                    //       label: 'Русский',
                    //       value: 'russian'
                    //     }
                    //   ]
                    // },
                    // menuItemId: {
                    //   view: 'TextField',
                    //   label: 'Ссылка в меню',
                    // },
                    locale: {
                      view: 'TextField',
                      label: 'Заголовок',
                    },
                    timeStart: {
                      view: 'TimePicker',
                      label: 'Время старта забега',
                    },
                    distance: {
                      view: 'TextField',
                      label: 'Дистанция',
                    },
                    isFinished: {
                      view: 'Checkbox',
                      title: 'Статус события',
                      label: 'Завершено'
                    },
                    resultsIsAvailable: {
                      view: 'Checkbox',
                      title: 'Статус результатов',
                      label: 'Доступны'
                    },
                    // titleField: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Тип',
                    //   title: '',
                    //   params: [
                    //     {
                    //       label: 'Тип записи: Информаци о разделах',
                    //       value: 'menu-item-content'
                    //     },
                    //   ]
                    // },
                    // field: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Тип',
                    //   title: '',
                    //   params: [
                    //     {
                    //       label: 'Тип записи: Информаци о разделах',
                    //       value: 'menu-item-content'
                    //     },
                    //   ]
                    // },
                  }
                },
              ],
              behavior: {
                edit: true,
                create: true,
                remove: true
              },
            },
            // CONTENT PAGE
            {
              name: 'menuitemcontent',
              title: 'Текстовые разделы',
              route: 'menuitemcontent',
              view: {
                attributes: [
                  {
                    label: 'ID',
                    value: 'id'
                  },
                  {
                    label: 'Название раздела',
                    value: 'titleLocale'
                  },
                  {
                    label: 'Меню',
                    value: 'menuItemLocale'
                  },
                ],
              },
              attributes: [
                {
                  block: 'Основная информация',
                  content: {
                    // language: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Язык',
                    //   title: 'Язык',
                    //   params: [
                    //     {
                    //       label: 'Английский',
                    //       value: 'english'
                    //     },
                    //     {
                    //       label: 'Русский',
                    //       value: 'russian'
                    //     }
                    //   ]
                    // },
                    // menuItemId: {
                    //   view: 'TextField',
                    //   label: 'Ссылка в меню',
                    // },
                    menuItemId: {
                      view: 'SelectField',
                      label: 'Ссылка в меню',
                      // options: 'categories',
                      options: {
                        name: 'parentMenuItems',
                        route: '/menuitem/',
                        fields: {
                          label: 'locale',
                          value: 'id'
                        },
                      },
                    },
                    eventId: {
                      view: 'SelectField',
                      label: 'Событие',
                      // options: 'categories',
                      options: {
                        name: 'eventId',
                        route: '/event/',
                        fields: {
                          label: 'locale',
                          value: 'id'
                        },
                      },
                    },
                    titleLocale: {
                      view: 'TextField',
                      label: 'Заголовок',
                    },
                    active: {
                      view: 'Checkbox',
                      label: 'Опубликовать'
                    },
                    // titleField: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Тип',
                    //   title: '',
                    //   params: [
                    //     {
                    //       label: 'Тип записи: Информаци о разделах',
                    //       value: 'menu-item-content'
                    //     },
                    //   ]
                    // },
                    // field: {
                    //   view: 'RadioButtonGroup',
                    //   label: 'Тип',
                    //   title: '',
                    //   params: [
                    //     {
                    //       label: 'Тип записи: Информаци о разделах',
                    //       value: 'menu-item-content'
                    //     },
                    //   ]
                    // },
                  }
                },
                {
                  block: 'Якоря',
                  content: {
                    linkLocale: {
                      view: 'Editor',
                      label: 'Якоря',
                    },
                  }
                },
                {
                  block: 'Контент',
                  content: {
                    locale: {
                      view: 'Editor',
                      label: 'Контент',
                    },
                  }
                },
              ],
              behavior: {
                edit: true,
                create: true,
                remove: true
              },
              preview: 'http://moscowmarathon.factory.mn/ru/preview',
            },
          ],
        },
      ]
    },
    // PARTNER TYPES
    {
      name: 'partnertype',
      title: 'Типы партнеров',
      route: 'partnertype',
      view: {
        attributes: [
          {
            label: 'ID',
            value: 'id'
          },
          {
            label: 'Сортировка',
            value: 'order'
          },
          {
            label: 'Тип партнера',
            value: 'locale'
          }
        ]
      },
      attributes: [
        {
          block: 'Основная информация',
          content: {
            // language: {
            locale: {
              view: 'TextField',
              label: 'Заголовок',
            },
            order: {
              view: 'TextField',
              label: 'Сортировка',
            },
            // field: {
            //   view: 'RadioButtonGroup',
            //   label: 'Тип',
            //   title: '',
            //   params: [
            //     {
            //       label: 'Тип записи: Тип партнера',
            //       value: 'partner_name'
            //     },
            //   ]
            // },
          }
        }
      ],
      behavior: {
        edit: true,
        create: true,
        remove: true
      },
    },
  ],
  
  filter: {
    blocks: [
      {
        block: 'Язык',
        content: {
          language: {
            view: 'RadioButtonGroup',
            label: 'Язык',
            title: 'Язык',
            params: [
              {
                label: 'Английский',
                value: 'english'
              },
              {
                label: 'Русский',
                value: 'russian'
              }
            ]
          },
        }
      }
    ],
    initialize: {
      language: 'russian'
    }
  }
};
