import React, {Fragment} from 'react';
import {default as IndexPage} from './pages/index'
import ToastrMessage from './components/ToastrMessage'

function App() {
  return (
    <Fragment>
      <IndexPage/>
      <ToastrMessage/>
    </Fragment>
  );
}

export default App;
