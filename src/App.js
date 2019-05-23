import React from 'react'
import { inject, observer } from 'mobx-react'

import Container from './Container'


@inject('ItemsStore')
@observer
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      buildJSON: '',
    }

    this.mainContainerRef = React.createRef()

    this.onBuildClick = this.onBuildClick.bind(this)
    this.handleBuildInpit = this.handleBuildInpit.bind(this)
  }
  onBuildClick() {
    const ItemsStore = this.props.ItemsStore
    ItemsStore.loadFromJson(this.state.buildJSON)
  }
  handleBuildInpit(event) {
    this.setState({buildJSON: event.target.value});
  }
  render(){
    const {
      buildJSON
    } = this.state

    const styles = {
      buildArea: {
        width: '100%'
      },
      buildArea__textarea: {
        display: 'block',
        width: '100%',
        height: '100px'
      },
      dumpArea: {
        width: '100%'
      },
      dumpArea__textarea: {
        display: 'block',
        width: '100%',
        height: '100px'
      }
    }

    return (
      <div>
        <h2>Result</h2>
        <Container containerStoreId={1} />
        <hr /> 
        <div style={styles.buildArea}>
          <h2>Build from your JSON</h2>
          <textarea 
            value={buildJSON} 
            onChange={this.handleBuildInpit}
            placeholder='Type your JSON here'
            style={styles.buildArea__textarea}  
          ></textarea>
          <button onClick={this.onBuildClick}>Build</button>
        </div>
        <hr />
        <div style={styles.dumpArea}>
          <h2>Dump as JSON</h2>
          <textarea 
            value={this.props.ItemsStore.asJson} 
            disabled
            placeholder='Created JSON will be here'
            style={styles.dumpArea__textarea}  
          ></textarea> 
        </div>
      </div>
    )
  }
}

export default App