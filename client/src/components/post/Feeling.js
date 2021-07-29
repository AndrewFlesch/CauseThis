import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Feeling = () => {
  const [text, setText] = useState('');

  return (
    <div className="entrysection">
        <div className="buttonheader"><h2>Feeling?</h2></div>
        <div className="moodblock">
        <button type="button" class="btn green" value="Fine" cat="Mood">Fine/Content<i class="fas fa-smile"></i></button>
        <button type="button" class="btn green" value="Anxious" cat="Mood">Happy/Joy<i class="fas fa-laugh-beam"></i></button>
        <button type="button" class="btn green" value="Productive" cat="Mood">Productive<i class="fas fa-grin-beam-sweat"></i></button>
        <button type="button" class="btn green" value="Zone" cat="Mood">In The Zone<i class="fas fa-grin-beam-sweat"></i></button>
        <button type="button" class="btn green btnblock" value="Accomplished" cat="Mood">Accomplished/Proud<i class="fas fa-grin-wink"></i></button>
        <button type="button" class="btn gray" value="Hungry" cat="Mood">Hungry<i class="fas fa-grin-tongue"></i></button>
        <button type="button" class="btn gray" value="Thristy" cat="Mood">Thirsty<i class="fas fa-grin-tongue"></i></button>
        <button type="button" class="btn gray" value="Tired" cat="Mood">Tired<i class="fas fa-tired"></i></button>
        <button type="button" class="btn gray btnblock" value="Lazy" cat="Mood">Lazy/Unmotivated<i class="fas fa-meh"></i></button>
        <button type="button" class="btn blue" value="Sad" cat="Mood">Sad<i class="fas fa-frown"></i></button>
        <button type="button" class="btn yellow" value="Anxiety" cat="Mood">Anxiety/Stress<i class="fas fa-grimace"></i></button>
        <button type="button" class="btn red btnblock" value="Anger" cat="Mood">Anger<i class="fas fa-angry"></i></button>
        <button type="button" class="btn" value="Custom" cat="Mood">Custom<i class="fas fa-surprise purp"></i></button>

        </div>
    </div>
  )
}

Feeling.propTypes = {
}

export default connect(null, {})(Feeling);
