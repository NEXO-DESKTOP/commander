document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
  
    terminal.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
  
        const inputElement = document.createElement('span');
        inputElement.classList.add('input-line');
        inputElement.innerText = terminal.innerText.split('\n').pop().trim();
        terminal.appendChild(inputElement);
  
        const command = inputElement.innerText.trim();
        if (command) {
          terminal.innerHTML += `\n`;
          terminal.scrollTop = terminal.scrollHeight;
  
          try {
            const result = await Neutralino.os.execCommand(command);
            if (result.stdOut) {
              terminal.innerHTML += `${result.stdOut}\n`;
            }
            if (result.stdErr) {
              terminal.innerHTML += `${result.stdErr}\n`;
            }
          } catch (err) {
            terminal.innerHTML += `Error: ${err}\n`;
          }
  
          terminal.scrollTop = terminal.scrollHeight;
        }
  
        terminal.innerHTML += '> ';
        moveCaretToEnd(terminal);
      }
    });
  
    // Initialize the terminal with a prompt
    terminal.innerHTML = '> ';
    moveCaretToEnd(terminal);
  
    // Ensure the terminal is focused on click
    terminal.addEventListener('click', () => {
      moveCaretToEnd(terminal);
    });
  
    function moveCaretToEnd(element) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      element.focus();
    }
  });