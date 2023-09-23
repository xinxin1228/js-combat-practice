class Progress {
  constructor() {
    this._init()
  }

  _init() {
    this.el = document.createElement('div')
    this.el.classList.add('fixed')
    this.el.innerHTML = `
      <div class="progress">
        <div class="num">0%</div>
      </div>
    `

    document.body.append(this.el)
    this._styleInit()
  }

  _styleInit() {
    const styleEl = document.createElement('style')
    styleEl.innerHTML = `
    * {
        margin: 0;
        padding: 0;
      }
      .fixed {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .progress {
        width: 150px;
        height: 150px;
        box-sizing: border-box;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border: 13px solid aqua;
      }
      .num {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        font-size: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: #fff;
      }
    `
    document.head.appendChild(styleEl)
  }

  destroy() {
    this.el.remove()
  }

  onProgress(loaded, total) {
    const progress = Math.floor(((loaded / total) * 100) | 0)
    this.el.querySelector('.num').textContent = `${progress}%`

    if (progress === 100) {
      this.destroy()
    }
  }
}
