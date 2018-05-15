// import _get from 'lodash/get';
// import _find from 'lodash/find';
// import _filter from 'lodash/filter';
// import _flattenDeep from 'lodash/flattenDeep';
// import _findKey from 'lodash/findKey';

// const getRequiredFields = (attributes) => {
//   const attributesContent = attributes.map((attr) => _get(attr, 'content'));
//   const required = [];
//   attributesContent.forEach((attribut) => {
//     Object.keys(attribut).forEach((key) => {
//       if (attribut[key].required) {
//         required.push(key);
//       }
//     });
//   });
//   return required;
// };

// export default function (values, props) {
//   const errors = {};
// //   if (!values.username) {
// //     errors.username = 'Required'
// //   } else if (values.username.length > 15) {
// //     errors.username = 'Must be 15 characters or less'
// //   }
// //   if (!values.email) {
// //     errors.email = 'Required'
// //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
// //     errors.email = 'Invalid email address'
// //   }
// //   if (!values.age) {
// //     errors.age = 'Required'
// //   } else if (isNaN(Number(values.age))) {
// //     errors.age = 'Must be a number'
// //   } else if (Number(values.age) < 18) {
// //     errors.age = 'Sorry, you must be at least 18 years old'

// //   }
//   const { attributes } = props;
//   const required = getRequiredFields(attributes);
//   required.forEach((field) => {
//     if (!values[field]) {
//       errors[field] = 'Это поле обязательное для заполнения';
//     }
//     // } else if (values[field] && values[field].length > 15) {
//     //   errors[field] = 'Must be 15 characters or less';
//     // }
//   });


//   console.log('<<<<<<<<<<<<<<<<<<');
//   console.log('values', values);
//   console.log('props', props);
//   // console.log('attributesContent', attributesContent);
//   console.log('attributes', attributes);
//   console.log('errors', errors);
//   console.log('>>>>>>>>>>>>>>>>>>>');
//   return errors;
// }
export const required = (view, value) => {
  let valid = false;
  if (view !== 'Map') {
    valid = !value ? 'Обязательное поле' : undefined;
  } else {
    valid = value && value.city && value.country ? undefined : 'Обязательное поле';
  }
  return valid;
};
export const init = (fieldParams) => {
  const validateFunctions = [];
  if (fieldParams.required) {
    validateFunctions.push(required.bind(this, fieldParams.view));
  }
  return validateFunctions;
};
