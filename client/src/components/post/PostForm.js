import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    duration: '',
    location: '',
    notes: '',
    description: '',
    weather: ''
  });

  const {
    title,
    category,
    date,
    duration,
    location,
    notes,
    description,
    weather
  } = formData;

const onClick = e => {
  formData.title = e.target.value;
  formData.category = e.target.getAttribute('cat');
  addPost(formData);
}

const onClickDetails = e => {
  setFormData({...formData, title: e.target.value, category: e.target.getAttribute('cat')});
  let modalId = e.target.getAttribute('name');
  let modal = document.getElementById(modalId);
  modal.classList.add("modalDialogshow");
}

const onClickClose = e => {
  let modalDivId = e.target.getAttribute('parent')
  let modalParentDiv = document.getElementById(modalDivId);
  modalParentDiv.classList.remove("modalDialogshow");
  document.getElementById("notes").value = "";
}

const onSubmit = e => {
  onClickClose(e);
  e.preventDefault();
  addPost(formData);
};

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});


  return (
    <div>
    <div className="entrysection">
        <div className="buttonheader"><h2>Feeling?</h2></div>
        <div className="moodblock">
        <div className="btnContainer">
        <span className="btnLabel">Fine/Content</span><button onClick={e => onClick(e)} type="button" className="btnPost green" category="Mood" value="Fine" name="Andrew" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert green" value="Fine">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">Happy/Joy</span><button onClick={e => onClick(e)} type="button" className="btnPost green" value="Happy" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert green" cat="Mood" value="Happy">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">Productive</span><button onClick={e => onClick(e)} type="button" className="btnPost green" value="Productive" cat="Mood">+</button> <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert green" value="Productive" cat="Mood">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">In The Zone</span><button onClick={e => onClick(e)} type="button" className="btnPost green" value="Zone" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert green" value="Zone" cat="Mood">...</button>
        </div>
        <div className="btnContainer btnblock">
        <span className="btnLabel">Accomplished/Proud</span><button onClick={e => onClick(e)} type="button" className="btnPost green" value="Accomplished" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert green" value="Acomplished" cat="Mood">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">Hungry</span><button onClick={e => onClick(e)} type="button" className="btnPost gray" value="Hungry" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert gray" value="Hungry" cat="Mood">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">Thirsty</span><button onClick={e => onClick(e)} type="button" className="btnPost gray" value="Thristy" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert gray" value="Thristy" cat="Mood">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">Tired</span><button onClick={e => onClick(e)} type="button" className="btnPost gray" value="Tired" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert gray" value="Tired" cat="Mood">...</button>
        </div>
        <div className="btnContainer btnblock">
        <span className="btnLabel">Lazy/Unmotivate</span><button onClick={e => onClick(e)} type="button" className="btnPost gray" value="Lazy" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert gray" value="Lazy" cat="Mood">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">Sad</span><button onClick={e => onClick(e)} type="button" className="btnPost blue" value="Sad" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert blue" value="Sad" cat="Mood">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">Anxiety/Stress</span><button onClick={e => onClick(e)} type="button" className="btnPost yellow" value="Anxiety" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert yellow" value="Anxiety" cat="Mood">...</button>
        </div>
        <div className="btnContainer btnblock">
        <span className="btnLabel">Anger</span> <button onClick={e => onClick(e)} type="button" className="btnPost red" value="Anger" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert red" value="Anger" cat="Mood">...</button>
        </div>
        <div className="btnContainer">
        <span className="btnLabel">Custom</span><button onClick={e => onClick(e)} type="button" className="btnPost" value="Custom" cat="Mood">+</button>
        <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert purp" value="Custom" cat="Mood">...</button>
        </div>
        </div></div>

        <div className="entrysection">
            <div className="buttonheader"><a id="doing"><h2>Doing?</h2></a></div>
            <div className="doingblock">
            <div className="btnContainer">
            <span className="btnLabel">Eating/Drinking</span>
            <button type="button" className="btnPost live" value="Eating/Drinking" name="eatingtype" cat="Food">+</button>
            <button onClick={e => onClickDetails(e)} name="foodModal" type="button" className="btnInsert live" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer">
            <span className="btnLabel">Using Bathroom</span>
            <button type="button" className="btnPost live" value="Bathroom" name="Bathroom" cat="Bathroom">+</button>
            <button onClick={e => onClickDetails(e)} name="bathroomModal" type="button" className="btnInsert live" value="Using Bathroom" cat="Bathroom">...</button>
            </div>
            <div className="btnContainer">
            <span className="btnLabel">Sleeping</span>
            <button type="button" className="btnPost live" value="Sleeping" name="sleepingModal" cat="Sleeping">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert live" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer">
            <span className="btnLabel">Taking Medicine/Pill</span>
            <button type="button" className="btnPost live" value="Taking Medicine/Pillls" name="Pills" cat="Medicine">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert live" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer btnblock">
            <span className="btnLabel">Working</span>
            <button type="button" className="btnPost work" value="Working" name="Working" cat="Working">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert work" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer">
            <span className="btnLabel">Cleaning/House Work</span>
            <button type="button" className="btnPost work" value="Cleaning/House Work" name="Cleaning" cat="Cleaing">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert work" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer btnblock">
            <span className="btnLabel">Errands</span>
            <button type="button" className="btnPost work" value="Errands" name="Errands" cat="Cleaing">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert work" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer">
            <span className="btnLabel">Exercising</span>
            <button type="button" className="btnPost fun" value="Exercising" name="Exercising" cat="Exercise">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert fun" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer btnblock">
            <span className="btnLabel">Playing</span>
            <button type="button" class="btnPost fun" value="Playing" name="Playing" cat="Playing">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert work" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer">
            <span className="btnLabel">Watching</span>
            <button type="button" className="btnPost screens" value="Watching" name="Socializing" cat="Watching">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert screens" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer">
            <span className="btnLabel">Reading</span>
            <button type="button" className="btnPost screens" value="Reading" name="Socializing" cat="Reading">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert screens" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer btnblock">
            <span className="btnLabel">Internet/Social Media</span>
            <button type="button" className="btnPost screens" value="Internet-Social Media" name="Internet-Social Media" cat="Internet-Social Media">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert screens" value="Eating/Drinking" cat="Food">...</button>
            </div>
            <div className="btnContainer">
            <span className="btnLabel">Custom</span>
            <button type="button" className="btnPost" value="Custom" name="Custom" cat="Custom">+</button>
            <button onClick={e => onClickDetails(e)} name="moodModal" type="button" className="btnInsert" value="Eating/Drinking" cat="Food">...</button>

            </div>
        </div>
        </div>

       <div className="modalDialog" id="moodModal">
       <div>
                    <h1>Add Details to {title}</h1>
                    <div id="close" parent="moodModal" onClick={e => onClickClose(e)} title="Close" name="close" className="close">X</div>
                <div>
                    <form className='form' parent="moodModal" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                          <h4>Notes</h4>
                          <textarea id="notes" name="notes" onChange={e => onChange(e)} />

                    </div>


                    <input type="submit" className="btn btn-default" />

                    </form>
                </div>
            </div>
            </div>
            <div className="modalDialog" id="bathroomModal">
            <div>
                         <h1>What are you doing in the bathroom?</h1>
                         <div id="close" parent="bathroomModal" onClick={e => onClickClose(e)} title="Close" name="close" className="close">X</div>
                     <div>
                         <form className='form' parent="bathroomModal" onSubmit={e => onSubmit(e)}>
                         <div className="form-group">
                            <button type="button" value="Pee" className="btnModal" name="title" onClick={e => onChange(e)}>Pee</button>
                            <button type="button" className="btnModal" name="title" onClick={e => onChange(e)}>Poop</button>
                            <button type="button" className="btnModal" name="title" onClick={e => onChange(e)}>Shower</button>
                            <button type="button" className="btnModal" name="title" onClick={e => onChange(e)}>Bath</button>
                            <button type="button" className="btnModal" name="title" onClick={e => onChange(e)}>Getting Ready</button>
                        </div>
                        {title === "Pee" ? (
                          <Fragment>
                          <h4>Color</h4>
                          <div className="form-group">
                            <button className="btnModal" name="title" onChange={e => onChange(e)}>Yellow</button>
                            <button className="btnModal" name="title" onChange={e => onChange(e)}>Clear</button>
                          </div>
                          </Fragment>
                        ) : (
                          <Fragment>
                          <p>No Pee</p>
                          {title}
                          </Fragment>
                        )}
                        <div className="form-group">
                            <h4>Notes</h4>
                               <textarea id="notes" name="notes" onChange={e => onChange(e)} />
                        </div>

                         <input type="submit" className="btn btn-default" />
                         </form>
                     </div>
                 </div>
                 </div>
                 </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm);
