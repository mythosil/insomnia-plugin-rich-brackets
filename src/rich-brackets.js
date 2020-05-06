const colors = ['gold', 'orchid', 'lightskyblue']; // TODO configurable

class RichBracketsPlugin {
  constructor() {
    this.processing = false;
  }

  color() {
    const code = document.querySelector('.editor:not(.editor--readonly):not(.editor--single-line) .CodeMirror-code');
    if (!code) {
      return;
    }

    if (this.processing) {
      return;
    }
    this.processing = true;

    let bOpen = 0;
    let pOpen = 0;

    code.querySelectorAll('span:not(.cm-string)').forEach((el) => {
      switch (el.innerHTML.trim()) {
        case '{':
          el.style.color = colors[bOpen % colors.length];
          bOpen++;
          break;
        case '}':
          bOpen--;
          el.style.color = colors[bOpen % colors.length];
          break;
        case '(':
          el.style.color = colors[pOpen % colors.length];
          pOpen++;
          break;
        case ')':
          pOpen--;
          el.style.color = colors[pOpen % colors.length];
          break;
      }
    });

    this.processing = false;
  }

  init() {
    document.addEventListener('keyup', () => { this.color(); });
    document.addEventListener('mouseup', () => { this.color(); });
  }
}

const p = new RichBracketsPlugin();
p.init();
