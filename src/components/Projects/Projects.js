import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import ContentContext from '../../store/context/title-context';

const Projects = (props) => {
  const { setTitle } = useContext(ContentContext);
  useEffect(() => {
    setTitle('Projects');
  });
  return <div>To be implemented!!!</div>;
};

export default Projects;
