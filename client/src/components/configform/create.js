import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addConfigForm, getConfigForms } from '../../actions/configform';
import { getUtil, updateUtil } from '../../actions/utils';
import Alert from '../../components/layout/Alert';


const Create = ({
  addConfigForm,
  getConfigForms,
  updateUtil,
  getUtil,
  configform: { posts },
  parentId,
  levelPass,
  catArray,
  instruction,
  parentName,
  formTypes
 }) => {
  useEffect(() => {
    getConfigForms();
  }, [getConfigForms]);

  const [items, setItems] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    parent: parentId,
    level: levelPass,
    formtype: 'button',
    formoptions: [],
    locationdefault: '',
    notes: '',
    description: '',
    weather: '',
    category: 'Mood'
  });

  const {
    name,
    parent,
    level,
    formtype,
    formoptions,
    locationdefault,
    notes,
    description,
    weather,
    category
  } = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
const onChangeArr = e => {
  let formoptionsArr = e.target.value.split(',');
  setFormData({ ...formData, formoptions: formoptionsArr});
}

 const onSubmit = e => {
   e.preventDefault();
   console.log(formData);
   addConfigForm(formData);
   setFormData({...formData, name:'',formtype:'',formoptions:''});
 };

 const onChangeCat = e => setItems({ items: e.target.value});

const onSubmitCat = (e) => {
  e.preventDefault();
  console.log(items);
  updateUtil(items, '60b0d5f564160d8684670dda');
  getUtil('60b0d5f564160d8684670dda');
};

const showModel = e => {
  console.log(e);
  let modalId = e.currentTarget.value;
  let modal = document.getElementById(modalId);
  modal.classList.add("modalDialogshow");
}

const onClickClose = e => {
  let modalDivId = e.currentTarget.getAttribute('value');
  let modalParentDiv = document.getElementById(modalDivId);
  modalParentDiv.classList.remove("modalDialogshow");
}



  return (
    <div>
    <Alert />
    <h2>{instruction}{parentName}</h2>
    <p className="lead">
    </p>
    <small>* = required field</small>
    <form className='form' onSubmit={e => onSubmit(e)}>
    <div className="form-group">
    <h3>Enter a name for your item</h3>
      <input type="text" className="form-control text" name="name" value={name} onChange={e => onChange(e)} />
      { !parent? (
        <div>
        <h3>What Cateogry of Entry is this?</h3>
        <select className="form-control dropdown" name="category" value={category} onChange={e => onChange(e)}>
        {catArray.map(cats => (
          <option key={cats} value={cats}>{cats}</option>
        ))}
        </select>
        <button onClick={e => showModel(e)} type="button" className="buttonNewCat" cat="Mood" value="newCat">Add a New Category</button>
        </div>
      ) : (
        <div></div>
      )}
        <h3>Will this be a text box, button or drop down?</h3>
        <select className="form-control dropdown" name="formtype" value={formtype} onChange={e => onChange(e)}>
        { !parent ? (
          <Fragment>
          <option value="button">Button</option>
          </Fragment>
        ) : (
          <Fragment>
          <option value="button">Button</option>
          { !formTypes.includes('text') && <option value="text">Text</option> }
          { !formTypes.includes('multiplelines') && <option value="multiplelines">Multiple Lines of Text</option> }
          { !formTypes.includes('dropdown') && <option value="dropdown">Drop Down</option> }
          { !formTypes.includes('combo') && <option value="combo">Drop Down Multiple Select</option> }
          </Fragment>
        )
        }
        </select>
        {(() => { if (formtype === 'dropdown' || formtype === 'combo'){ return (
         <Fragment>
         <h3>What are the options for your {formtype}?</h3>
        <textarea name="formoptions" rows="4" cols="50" value={formoptions} onChange={e => onChangeArr(e)}>
        </textarea>
        </Fragment>)  } })()}
    </div>

      <input type='submit' className='btn btn-primary my-1' />
      <Link className='btn btn-light my-1' to='/dashboard'>
        Go Back
      </Link>
    </form>
 { !parent? (
    <div className="modalDialog" id="newCat">
    <div>
    <form className='form' onSubmit={e => onSubmitCat(e)}>
    <h3>Add a new Category</h3>
    <input type="text" className="form-control text" id="addCat" onChange={e => onChangeCat(e)} />
    <input type='submit' className='btn btn-primary my-1' defaultValue="Add New Category" />
    </form>
    <div onClick={e => onClickClose(e)} title="Close" value="newCat" className="close">X</div>
             </div></div>
) : (
  <div></div>
)}


    </div>
  )
}

Create.propTypes = {
addConfigForm: PropTypes.func.isRequired,
getConfigForms: PropTypes.func.isRequired,
getUtil: PropTypes.func.isRequired,
updateUtil: PropTypes.func.isRequired,
configform: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  configform: state.configform
});

export default connect(mapStateToProps, {addConfigForm,getConfigForms,getUtil,updateUtil})(withRouter(Create));
