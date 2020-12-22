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
      showResolution: false,
      cropOutput: null,
      width: 1024,
      height: 786,
      scaleStep: 0.1,
      backgroundColor: '#000000',
      showScaleButtons: true,
      cancelMessage: 'Cancel',
      applyMessage: 'Apply'
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
          <h2>Prop Settings</h2>
          <div className='options'>
            <ul>
              <li className='option'>
                  <input type='checkbox' checked={this.state.grid} onChange={() => {
                    this.setState({
                      grid: !this.state.grid
                    });
                  }}/>
                  <label>Draw Grid</label>
                </li>
              <li className='option'>
                  <input type='checkbox' checked={this.state.showResolution} onChange={() => {
                    this.setState({
                      showResolution: !this.state.showResolution
                    });
                  }}/>
                  <label>Show Resolution</label></li>
              <li className='option'>
                  <input type='checkbox' checked={this.state.showScaleButtons} onChange={() => {
                    this.setState({
                      showScaleButtons: !this.state.showScaleButtons
                    });
                  }}/>
                  <label>Show Scale Buttons</label></li>
            </ul>
            <ul>
              <li className='option'>
                <span>Width: </span><input type='number' value={this.state.width} onChange={(event) => {
                  this.setState({
                    width: event.target.value
                  });
                }}/>
              </li>
              <li className='option'>
                <span>Height: </span><input type='number' value={this.state.height} onChange={(event) => {
                    this.setState({
                      height: event.target.value
                    });
                  }}/>
              </li>
              <li className='option'>
                <span>Background: </span><input type='text' value={this.state.backgroundColor} onChange={(event) => {
                    this.setState({
                      backgroundColor: event.target.value
                    });
                  }}/>
              </li>
              <li className='option'>
                <span>Max Scale: </span><input type='number' value={this.state.maxScale} onChange={(event) => {
                      this.setState({
                        maxScale: event.target.value
                      });
                    }}/>
              </li>
              <li className='option'>
                <span>Scale Step: </span><input type='number' value={this.state.scaleStep} onChange={(event) => {
                        this.setState({
                          scaleStep: event.target.value
                        });
                      }}/>
              </li>
              <li className='option'>
                <span>Apply Label: </span><input type='text' value={this.state.applyMessage} onChange={(event) => {
                        this.setState({
                          applyMessage: event.target.value
                        });
                      }}/>
              </li>
              <li className='option'>
                <span>Cancel Label: </span><input type='text' value={this.state.cancelMessage} onChange={(event) => {
                        this.setState({
                          cancelMessage: event.target.value
                        });
                      }}/>
              </li>
              <li className='option'>

              </li>
            </ul>
          </div>
        </div>
        }
        {
          this.state.src && <div className='image-scaler'><ReactImageScaler renderDebug={true} cancelLabel={this.state.cancelMessage} applyLabel={this.state.applyMessage} scaleSizes={this.state.showScaleButtons} scaleStep={this.state.scaleStep} maxScale={this.state.maxScale} displayResolution={this.state.showResolution} backgroundColor={this.state.backgroundColor} drawGrid={this.state.grid} width={this.state.width} height={this.state.height} src={this.state.src} onScaleApply={(data) => {
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
          }}/></div>
        }
        {
          this.state.cropOutput && 
          <div className='react-scale-preview'>
            <h2>Scale Preview</h2>
            <p>
              <img src={this.state.cropOutput} width={800}/>
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

