const handleCursor = (elArray, cursor) => {
  const root = document.documentElement
  const osL = document.body.offsetLeft

  const data = {
    xPos: '',
    yPos: '',
    x: void 0,
    y: void 0,
    dx: void 0,
    dy: void 0,
    frame: -1
  }
  const setMouse = (e) => {
    if ( e.target.classList.contains('button') ) return
    data.xPos = e.clientX - osL || e.pageX - osL
    data.yPos = e.clientY || e.pageY
  }

  const followMouse = () => {
    data.frame = requestAnimationFrame(() => followMouse())
    if ( !data.x || !data.y ) {
      data.x = data.xPos
      data.y = data.yPos
    } else {
      data.dx = (data.xPos - data.x) * 0.125
      data.dy = (data.yPos - data.y) * 0.125

      if ( Math.abs(data.dx) + Math.abs(data.dy) < 0.1 ) {
        data.x = data.xPos
        data.y = data.yPos
      } else {
        data.x += data.dx
        data.y += data.dy
      }
    }
    cursor.style.setProperty('--x', `${data.x}px`)
    cursor.style.setProperty('--y', `${data.y}px`)
  }

  const morphCursor = (e) => {
    cancelAnimationFrame(data.frame);
    const targ = e.target
    const radius = window.getComputedStyle(targ).borderRadius
    const h = targ.clientHeight
    const w = targ.clientWidth
    const lPos = targ.offsetLeft
    const rPos = lPos + w
    const tPos = targ.getBoundingClientRect().top

    cursor.style.setProperty('--h', `${h}px`)
    cursor.style.setProperty('--w', `${w}px`)
    cursor.style.setProperty('--x', `${lPos + w / 2}px`)
    cursor.style.setProperty('--y', `${tPos + h / 2}px`)
    cursor.style.cursor = 'pointer'
    cursor.style.borderRadius = radius
    cursor.style.backdropFilter = 'none'
    cursor.style.backgroundColor = 'transparent'
  }

  const unmorphCursor = () => {
    requestAnimationFrame(() => followMouse())
    cursor.style.setProperty('--h', '5rem')
    cursor.style.setProperty('--w', '5rem')
    cursor.style.cursor = ''
    cursor.style.borderRadius = ''
    cursor.style.backdropFilter = ''
    cursor.style.backgroundColor = ''
  }

  const init = () => {
    root.addEventListener('mousemove', (e) => {
      e.stopPropagation();
      setMouse(e)
    })
    
    followMouse()
    
    elArray.forEach(el => {
      el.addEventListener('mouseover', (e) => {
        morphCursor(e)
      })

      el.addEventListener('mouseleave', () => {
        unmorphCursor()
      })
    })


  }

  init()
}

export default handleCursor