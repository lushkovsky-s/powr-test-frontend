import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'mobx-react'
import ItemsStore from './stores/ItemsStore'

const Root = (
    <Provider ItemsStore={ItemsStore}>
        <App />
    </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))
