import React from 'react';
import { Link } from 'react-router-dom';
import 'css/about.css';

const About = ({match}) => {
  return (
    <div id="about">
      <h2>About</h2>
      <p>서브 라우트의 사용 샘플:</p>
      <Link to={`${match.path}/react`}>react</Link>
      <Link to={`${match.path}/redux`}>redux</Link>
      <Link to={`${match.path}/es6`}>es6</Link>
    </div>
  );
};

export default About;
