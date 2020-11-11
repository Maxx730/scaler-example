import React from 'react';
import ReactImageScaler from 'react-image-scaler';
import './index.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getFile = this.getFile.bind(this);

    this.state = {
      src: null,
      grid: true,
      maxScale: 3,
      cropOutput: null
    }
  }

  render() {
    return(
      <div className='react-scale-example'>
        {(!this.state.src && !this.state.cropOutput) && 
        <div className='react-scale-settings'>
          <h1>
            React Scale Example
          </h1>
          <p>
            Please choose a file to load into the scaler, choose scaler settings before file.
          </p>
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={this.getFile}></input>
          <ul className='options'>
          <li className='option'>
              <input type='checkbox' checked={this.state.grid} onChange={() => {
                this.setState({
                  grid: !this.state.grid
                });
              }}/>
              <label>Draw Grid</label>
            </li>
            <li className='option'>
              <input type='checkbox' checked={this.state.grid} onChange={(event) => {
                this.setState({
                  maxScale: event.target.value
                });
              }}/>
              <label>Draw Grid</label>
            </li>
          </ul>
        </div>
        }
        {
          this.state.src && <ReactImageScaler drawGrid={this.state.grid} src={this.state.src} backgroundColor={'#000000'} maxScale={this.state.maxScale} width={1024} height={800} scaleStep={0.001} onScaleApply={(data) => {
            data.then((result) => {
              this.setState({
                cropOutput: result,
                src: null
              });
            });
          }} onCancel={() => {
            this.setState({
              src: null
            });
          }}/>
        }
        {
          this.state.cropOutput && 
          <div className='react-scale-preview'>
            <h2>Scale Preview</h2>
            <p>
              <img src={this.state.cropOutput}/>
            </p>
            <button onClick={() => {
              this.setState({
                src: null,
                cropOutput: null
              });
            }}>Reset</button>
          </div>
        }
      </div>
    );
  }

  getFile(event) {
    const context = this;
    const reader = new FileReader();
    reader.onload = function(fsEvent) {
      context.setState({
        src: fsEvent.target.result
      });
    }
    reader.readAsDataURL(event.target.files[0])
  }
}

