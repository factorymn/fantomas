import * as actionTypes from '../constants/DataConstants';
import _cloneDeep from 'lodash/cloneDeep';
import _max from 'lodash/max';
import _get from 'lodash/get';
import _set from 'lodash/set';
import request from 'axios';

const news = [
{
  id: 1,
  "source": {
  "id": "mtv-news",
  "name": "MTV News"
  },
  "author": "Alissa Schulman",
  "title": "9 Burning Questions The Riverdale Season 2 Finale Needs To Answer",
  "description": "What just happened?",
  "url": "http://www.mtv.com/news/3076819/riverdale-season-2-finale-burning-questions/",
  "urlToImage": "https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:650776?quality=0.8&format=jpg&width=1440&height=810&.jpg",
  "publishedAt": "2018-05-11T15:46:12Z"
},
{
  id: 2,
  "source": {
  "id": "mtv-news",
  "name": "MTV News"
  },
  "author": "Patrick Hosken",
  "title": "Here's Cardi B And Charli XCX's 'Kush-Loving' Ode To Kissing Girls With Rita Ora And Bebe Rexha",
  "description": "Almost a year after Charli's 'Boys,' here's Rita's 'Girls'",
  "url": "http://www.mtv.com/news/3076974/cardi-b-girls-charli-xcx-rita-ora-bebe-rexha/",
  "urlToImage": "https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:650865?quality=0.8&format=jpg&width=1440&height=810&.jpg",
  "publishedAt": "2018-05-11T14:50:25Z"
},
{
  id: 3,
  "source": {
  "id": "mtv-news",
  "name": "MTV News"
  },
  "author": "Madeline Roth",
  "title": "Liam Payne’s ‘The Middle’ Cover Includes A Clever Interpolation Of ‘One Kiss’",
  "description": "He also sang 'Familiar' in Spanish for his Live Lounge performance",
  "url": "http://www.mtv.com/news/3076962/liam-payne-the-middle-cover-live-lounge/",
  "urlToImage": "https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:650850?quality=0.8&format=jpg&width=1440&height=810&.jpg",
  "publishedAt": "2018-05-10T23:13:18Z"
},
{
  id: 4,
  "source": {
  "id": "mtv-news",
  "name": "MTV News"
  },
  "author": "Charles Holmes",
  "title": "Jessie Reyez Names Producer Detail As The 'Gatekeeper' Who Sexually Harassed Her",
  "description": "'Fear is a real thing'",
  "url": "http://www.mtv.com/news/3076897/jessie-reyez-detail-sexual-harassed/",
  "urlToImage": "https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:650825?quality=0.8&format=jpg&width=1440&height=810&.jpg",
  "publishedAt": "2018-05-10T20:35:41Z"
},
{
  id: 5,
  "source": {
  "id": "mtv-news",
  "name": "MTV News"
  },
  "author": "Alissa Schulman",
  "title": "Chris Pratt Will Receive The Generation Award At The MTV Movie & TV Awards",
  "description": "There’s a Milano-sized parking spot with his name on it",
  "url": "http://www.mtv.com/news/3076850/chris-pratt-generation-award-2018-mtv-movie-tv-awards/",
  "urlToImage": "https://mtv.mtvnimages.com/uri/mgid:ao:image:mtv.com:650783?quality=0.8&format=jpg&width=1440&height=810&.jpg",
  "publishedAt": "2018-05-10T17:00:08Z"
  }
];

export function getAll(model) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL,
      [model.id]: news
    });
  };
}

export function create(model, form) {
  return (dispatch, getState) => {
    const state = getState();
    const data = state.dataReducer[model.id] && _cloneDeep(state.dataReducer[model.id]) || [];
    data.push(form);
      type: actionTypes.CREATE,
      [model.id]: data
    });
  };
}
