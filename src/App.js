import React from 'react';
import ReactImageScaler from 'react-image-scaler';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <ReactImageScaler src='https://turbologo.com/articles/wp-content/uploads/2018/03/prozrachniy-logo-1-678x381.png' width={1200} height={900} backgroundColor={'#000000'} maxScale={3} scaleStep={0.01} onScaleApply={1}/>
      </div>
    );
  }
}

