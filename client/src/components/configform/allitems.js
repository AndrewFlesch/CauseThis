import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addConfigForm, getConfigForms } from '../../actions/configform';
import { addUtil, getUtil } from '../../actions/utils';
import Create from './create';
import Category from './category';


const AllItems = ({
  getUtil,
  addConfigForm,
  getConfigForms,
  configform: { posts },
  utils: { util }
 }) => {
  useEffect(() => {
    getConfigForms()
  }, [posts.length]);

let catArray = [];

if (util) {
  catArray = util.items;
} else {
  catArray = [];
}

useEffect(() => {
  getUtil('60b0d5f564160d8684670dda');
},[]);


  const [formData, setFormData] = useState({
    name: '',
    parent: '',
    category: 'Mood',
    level: 1,
    formtype: '',
    formoptions: [],
    locationdefault: '',
    notes: '',
    description: '',
    weather: '',
  });

  const {
    name,
    parent,
    category,
    level,
    formtype,
    formoptions,
    locationdefault,
    notes,
    description,
    weather,
  } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
const onChangeArr = e => {
  let formoptionsArr = e.target.value.split(',');
  setFormData({ ...formData, formoptions: formoptionsArr});
}

let itemsByCategoryArray = [];

let itemByCategory = {
  categoryName: '',
  itemsInCategory: [],
  id: ''
};

 const onSubmit = e => {
   e.preventDefault();
   console.log(formData);
   addConfigForm(formData);
 };

 const levelFilter = (filter) => {
   let levelFilteredArray = posts.filter(post => post.level === filter);
   return levelFilteredArray;
 }

 const catFilter = (array, filter) => {
   let catFilterArray = array.filter(arrayitem => arrayitem.category === filter);
   return catFilterArray;
 }

const hasParentArray = posts.filter(post => !!post.parent);

catArray.map((cat, index) => {
  const moodArray = catFilter(levelFilter(1), cat);
  if (moodArray.length > 0) {
  const childrenItems = moodArray.map(items => {
    let checkHasParentArray = hasParentArray.filter(parentItems => parentItems.parent === items._id);
    if (checkHasParentArray.length > 0) {
      items.children = checkHasParentArray;
      checkHasParentArray = [];
    };
    return items;
  });

  const grandKids = childrenItems.map(items => {
    if (items.children.length > 0) {
      items.children.map(children => {
        let checkHasParentArray = hasParentArray.filter(parentItems => parentItems.parent === children._id);
        if (checkHasParentArray.length > 0) {
          children.children = checkHasParentArray;
          checkHasParentArray = [];
        }
        else {
          children.children = [];
        }
      return children;
      });
    }
    return items;
  });

  const fullArray = grandKids;

let itemsRetrieved = Object.create(itemByCategory);
  itemsRetrieved.categoryName = cat;
  itemsRetrieved.itemsInCategory = fullArray;
  itemsRetrieved.id = index;
  itemsByCategoryArray.push(itemsRetrieved);
}})


  return (
    <Fragment>
    <div>
    <h1 className="large text-primary">
      Configure What to Track
    </h1>
    </div>
   <div>
   {itemsByCategoryArray.map((items) => (
       <Category
         category={items.categoryName}
         items={items.itemsInCategory}
         key={items.id}
       />
     ))
}
    </div>
    <Fragment>
    <Create
      levelPass={level}
      catArray={catArray}
    />
    </Fragment>

    </Fragment>


  )
}

AllItems.propTypes = {
addConfigForm: PropTypes.func.isRequired,
getConfigForms: PropTypes.func.isRequired,
configform: PropTypes.object.isRequired,
utils: PropTypes.object.isRequired,
getUtil: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  configform: state.configform,
  utils: state.utils
});

export default connect(mapStateToProps, {addConfigForm,getConfigForms,getUtil})(withRouter(AllItems));
