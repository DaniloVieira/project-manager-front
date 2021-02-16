import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';

const Projects = (props) => {
  useEffect(() => {
    props.setTitleOnLoad('Projects');
  });
  return <div>To be implemented!!!</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTitleOnLoad: (t) => dispatch(actions.setTitle(t)),
  };
};

export default connect(null, mapDispatchToProps)(Projects);
