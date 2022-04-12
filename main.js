import '@styles/main.scss'
import handleCursor from '@scripts/cursor'

const buttons = Array.from(document.querySelectorAll('.button'))
const cursor = document.querySelector('.cursor')

handleCursor(buttons, cursor);