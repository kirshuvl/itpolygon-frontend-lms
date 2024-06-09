import { render } from 'solid-js/web'
import { App } from './App'

import './styles/style.scss'
import { debugMessage } from './utils/debugMessage'

const root = document.getElementById('root')

if (root) {
    render(() => <App />, root)
} else {
    debugMessage('Element with id "root" not found.')
}
