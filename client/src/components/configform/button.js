import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Create from './create';
import { deleteConfigForms, updateConfigForm } from '../../actions/configform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Button = ({
updateConfigForm,
deleteConfigForms,
fullArray,
}) => {

  let formTypes = "";

  const [modalType, setModalType] = useState();

  const [prevItemOne, setPrevItemOne] = useState();

  const [prevItemTwo, setPrevItemTwo] = useState({
    twoName: '',
    twoParent: '',
    twoLevel: '',
    twoFormType: '',
    twoFormOptions: ''
  });

  const {
    twoName,
    twoParent,
    twoLevel,
    twoFormType,
    twoFormOptions
  } = prevItemTwo;

  const [prevItemThree, setPrevItemThree] = useState();

  const [formData, setFormData] = useState({
    name:fullArray.name,
    parent: fullArray.parent,
    level: fullArray.level,
    formtype: fullArray.formtype,
    formoptions: fullArray.formoptions,
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




  const setForms = e => {
    if (!twoName) {
      setPrevItemTwo({
        twoName: e.currentTarget.getAttribute('name'),
        twoParent: e.currentTarget.getAttribute('parent'),
        twoLevel: level + 1,
        twoFormType: e.currentTarget.getAttribute('formtype'),
        twoFormOptions: e.currentTarget.getAttribute('formoptions')
      });
    }
    else {
      setPrevItemThree('Third')
      }
    setFormData({...formData,
      name: e.currentTarget.getAttribute('name'),
      level: level + 1,
      parent: e.currentTarget.getAttribute('parent'),
      formtype: e.currentTarget.getAttribute('formtype'),
      formoptions: e.currentTarget.getAttribute('formoptions')
    });
  }

  const onClickDetailsChild = e => {
    setForms(e);
    setModalType('Details');
    showModel(e);
  }

  const onClickDefault = e => {
    setModalType('Default');
    showModel(e);
  }

  const onClickDetails = e => {
    setPrevItemOne(e.currentTarget.getAttribute('name'));
    setModalType('Details');
    showModel(e);
  }

  const checkPrevious = (e) => {

    if (prevItemThree) {
      setPrevItemThree('');
      setFormData({
        name: twoName,
        parent: twoParent,
        level: twoLevel,
        formtype: twoFormType,
        formoptions: twoFormOptions
      });
      setPrevItemTwo({
        twoName: '',
        twoParent: '',
        twoLevel: '',
        twoFormOptions: '',
        twoFormOptions: ''
        });
    }
    else if (prevItemOne) {
        setFormData({name: prevItemOne});
    }
  }

  const onClickClose = e => {
    checkPrevious(e)
    let modalDivId = e.currentTarget.getAttribute('value');
    let modalParentDiv = document.getElementById(modalDivId);
    modalParentDiv.classList.remove("modalDialogshow");
  }

  const showModel = e => {
    let modalId = e.currentTarget.value;
    let modal = document.getElementById(modalId);
    modal.classList.add("modalDialogshow");
  }

  const onSubmit = (e, id) => {
    e.preventDefault();
    console.log(formData);
    updateConfigForm(formData, id);
  };

  const onChangeMain = e => {
    setFormData({...formData, name: e.target.value});
  }

  const onChangeArr = e => {
    let formoptionsArr = e.currentTarget.value.split(',');
    setFormData({ ...formData, formoptions: formoptionsArr});
  }

  const whichType = (formEntryType, child) => {
  switch(formEntryType) {
    case 'button':
    formTypes = formTypes + ';button';
      return (
      <div>
      <div className='subField'>
      <h3>Button</h3>
        <button className="btnContainerSub">
        {child.name}
        </button>
        <div className="btnActionRow">
        <button onClick={e => onClickDetailsChild(e)} name={child.name} parent={child.parent} formtype={child.formtype} formoptions={child.formoptions} level={child.level} type="button" className="subConfigEdit" cat="Mood" value={child._id}><FontAwesomeIcon icon={faEdit} size="lg" title="Edit this item"/></button>
        <button onClick={() => deleteConfigForms(child._id)} name="moodModal" type="button" className="subConfigDelete"><FontAwesomeIcon icon={faTimes} size="lg"/></button>
        </div>
        </div>

        <div className="modalDialog" id={child._id}>
        <div>
        <form className='form' onSubmit={e => onSubmit(e, child._id)}>
        <div className="form-group">
        <h1>Button Name and Value</h1>
          <input type="text" className="from-control text" name="name" value={name} onChange={e => onChangeMain(e)} />
          <input type='submit' className='btn btn-primary my-1' value="Submit Change" />
        </div>
        </form>
                     <div onClick={e => onClickClose(e)} title="Close" value={child._id} className="close">X</div>
                 <div>
                    {modalType === 'Default' ? (
                      <Fragment>
                      <h2>Default</h2>
                      </Fragment>
                    ):(
                      <Fragment>
                      { child.children.length > 0 ? (
                        <div>
                        { child.children.map((child) => (
                          <div key={child._id}>
                          {whichType(child.formtype, child)}
                          </div>
                        ))}
                        </div>
                      ) : (
                        <div>
                        </div>
                      )}
                      { child.level + 1 < 4 ? (
                        <Create
                          formTypes = {formTypes}
                          parentId = {child._id}
                          levelPass = {child.level + 1}
                        />
                      ) : (
                        <p>No more levels</p>
                      )}

                      </Fragment>
                    )}
                 </div>
             </div></div>
             </div>
        )
    case 'text':
    formTypes = formTypes + ';text';
      return (
        <div>
        <div className='subField'>
        <h3>Text Box</h3>
        <label className="configLabel" htmlFor={child.name}>{child.name}</label>
        <input type="text" name={child.name}></input>
        <div className="btnActionRow">
                          <button onClick={e => onClickDetailsChild(e)} name={child.name} parent={child.parent} formtype={child.formtype} formoptions={child.formoptions} level={child.level} type="button" className="subConfigEdit" cat="Mood" value={child._id}><FontAwesomeIcon icon={faEdit} size="lg" title="Edit this item"/></button>
                          <button id="delete" onClick={() => deleteConfigForms(child._id)} name="moodModal" type="button" className="subConfigDelete"><FontAwesomeIcon icon={faTimes} size="lg"/></button>
        </div>
        </div>
                          <div className="modalDialog" id={child._id}>
                          <div>
                          <form className='form' onSubmit={e => onSubmit(e, child._id)}>
                          <div className="form-group">          <h1>Name and Value</h1>
                            <input type="text" className="from-control text" name="name" value={name} onChange={e => onChangeMain(e)} />
                            <input type='submit' className='btn btn-primary my-1' value="Submit Change" />
                          </div>
                          </form>
                          <div parent="moodModal" onClick={e => onClickClose(e)} title="Close" value={child._id} className="close">X</div>
                          </div>
        </div>
        </div>
      )
    case 'multiplelines':
    formTypes = formTypes + ';multiplelines';

      return (
        <div>
        <div className='subField'>
        <h3>Multiple Lines of Text</h3>
        <label className="configLabel" htmlFor={child.name}>{child.name}</label>
        <textarea name={child.name} rows="4" cols="50">
        </textarea>
        <div className="btnActionRow">
        <button onClick={e => onClickDetailsChild(e)} name={child.name} parent={child.parent} formtype={child.formtype} formoptions={child.formoptions} level={child.level} type="button" className="subConfigEdit" cat="Mood" value={child._id}><FontAwesomeIcon icon={faEdit} size="lg" title="Edit this item"/></button>
            <button onClick={() => deleteConfigForms(child._id)}  name="moodModal" type="button" className="subConfigDelete"><FontAwesomeIcon icon={faTimes} size="lg"/></button>
</div>
</div>
        <div className="modalDialog" id={child._id}>
        <div>
        <form className='form' onSubmit={e => onSubmit(e, child._id)}>
        <div className="form-group">
        <h1>Name and Value</h1>
          <input type="text" className="from-control text" name="name" value={name} onChange={e => onChangeMain(e)} />
          <input type='submit' className='btn btn-primary my-1' value="Submit Change" />
        </div>
        </form>
        <div parent="moodModal" onClick={e => onClickClose(e)} title="Close" value={child._id} className="close">X</div>
        </div>
</div>
</div>
      )

    case 'dropdown':
    formTypes = formTypes + ';dropdown';
      return (
        <div>
        <div className='subField'>
        <h3>Drop Down List</h3>
        <label className="configLabel" htmlFor={child._id}>{child.name}</label>

<select name={child.name}>
{ child.formoptions.map((options) => (
  <option key={options} id={options} value={options}>{options}</option>
))}
</select>
<div className="btnActionRow">
<button onClick={e => onClickDetailsChild(e)} name={child.name} parent={child.parent} formtype={child.formtype} formoptions={child.formoptions} level={child.level} type="button" className="subConfigEdit" cat="Mood" value={child._id}><FontAwesomeIcon icon={faEdit} size="lg" title="Edit this item"/></button>
          <button onClick={() => deleteConfigForms(child._id)} name="moodModal" type="button" className="subConfigDelete"><FontAwesomeIcon icon={faTimes} size="lg"/></button>
</div>
</div>
        <div className="modalDialog" id={child._id}>
        <div>
        <form className='form' onSubmit={e => onSubmit(e, child._id)}>
        <div className="form-group">
        <h1>Name and Value Drop Down</h1>
          <input type="text" className="from-control text" name="name" value={name} onChange={e => onChangeMain(e)} />
          <h3>What are the options for your {child.formtype}?</h3>
         <textarea name="formoptions" rows="4" cols="50" value={child.formoptions} onChange={e => onChangeArr(e)}>
         </textarea>
          <input type='submit' className='btn btn-primary my-1' value="Submit Change" />
        </div>
        </form>
        <div parent="moodModal" onClick={e => onClickClose(e)} title="Close" value={child._id} className="close">X</div>
        </div>
</div>
</div>
      )

    case 'combo':
    formTypes = formTypes + ';combo';
    return (
      <div>
      <div className='subField'>
      <h3>Drop Down Multiple Select</h3>
      <label className="configLabel" htmlFor={child._id}>{child.name}</label>
<select name={child.name} multiple>
{ child.formoptions.map((options) => (
<option key={options} value={options}>{options}</option>
))}
</select>
<div className="btnActionRow">

<button onClick={e => onClickDetailsChild(e)} name={child.name} parent={child.parent} formtype={child.formtype} formoptions={child.formoptions} level={child.level} type="button" className="subConfigEdit" cat="Mood" value={child._id}><FontAwesomeIcon icon={faEdit} size="lg" title="Edit this item"/></button>
          <button onClick={() => deleteConfigForms(child._id)} name={child.name} type="button" className="subConfigDelete"><FontAwesomeIcon icon={faTimes} size="lg"/></button>
</div>
</div>
        <div className="modalDialog" id={child._id}>
        <div>
        <form className='form' onSubmit={e => onSubmit(e, child._id)}>
        <div className="form-group">
        <h1>Name and Value</h1>
          <input type="text" className="from-control text" name="name" value={name} onChange={e => onChangeMain(e)} />
          <h3>What are the options for your {child.formtype}?</h3>
         <textarea name="formoptions" rows="4" cols="50" value={child.formoptions} onChange={e => onChangeArr(e)}>
         </textarea>
          <input type='submit' className='btn btn-primary my-1' value="Submit Change" />
        </div>
        </form>
        <div parent="moodModal" onClick={e => onClickClose(e)} title="Close" value={child._id} className="close">X</div>
        </div>
</div>
</div>
    )
    default:
      return (
<div>
        <p>This is the default</p>
</div>
              )
  }};

return (
<div>
  <div className="btnContainer">
  <span className="btnLabel">{name}</span>
  <button onClick={e => onClickDetails(e)} name={name} parent={parent} formtype={formtype} formoptions={formoptions} type="button" className="btnConfigEdit" cat="Mood" value={fullArray._id}><FontAwesomeIcon icon={faEdit} size="lg" title="Edit this item"/>
</button>
    <button onClick={() => deleteConfigForms(fullArray._id)} name="moodModal" type="button" className="btnConfigDelete"><FontAwesomeIcon icon={faTimes} size="lg"/></button>
  </div>

    <div className="modalDialog" id={fullArray._id}>
    <div>
    <form className='form' onSubmit={e => onSubmit(e, fullArray._id)}>
    <div className="form-group">
    <h1>Button Name and Value</h1>
      <input type="text" className="from-control text" name="name" value={name} onChange={e => onChangeMain(e)} />
      <input type='submit' className='btn btn-primary my-1' value="Submit Change" />
    </div>
    </form>


                 <div id="close" parent="moodModal" onClick={e => onClickClose(e)} title="Close" value={fullArray._id} className="close">X</div>
             <div>
                {modalType === 'Default' ? (
                  <Fragment>
                  <h2>Default</h2>
                  </Fragment>
                ):(
                  <Fragment>
                  { fullArray.children.length < 1 ? (
                      <p>No Children Here.</p>
                  ) : (
                    <div className="configSubOptions">
                    <h2>Sub entry options for {fullArray.name}</h2>
                    { fullArray.children.map((child) => (
                      <div key={child._id}>
                      {whichType(child.formtype, child)}
                      </div>
                    ))}
                    </div>
                  )}
                  <Create
                    parentId = {fullArray._id}
                    formTypes = {formTypes}
                    levelPass = {fullArray.level + 1}
                    parentName = {fullArray.name}
                    instruction = "Create a sub entry for "
                  />
                  </Fragment>
                )}
             </div>
         </div></div>
    </div>
);
}

Button.propTypes = {
  fullArray: PropTypes.object.isRequired,
  deleteConfigForms: PropTypes.func.isRequired,
  updateConfigForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  children: state.children
});


export default connect(mapStateToProps, {deleteConfigForms, updateConfigForm})(withRouter(Button))
