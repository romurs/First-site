function highlightWords() {
  let searchWord = document.getElementById("searchInput").value.trim();

  if (!searchWord) {
      alert("Введите слово для поиска");
      return;
  }

  let highlightedElements = document.querySelectorAll('span.highlighted');
  highlightedElements.forEach(element => {
      let parent = element.parentNode;
      while (element.firstChild) {
          parent.insertBefore(element.firstChild, element);
      }
      parent.removeChild(element);
  });

  function traverseAndHighlight(node) {
      if (node.nodeType === 3) {
          let regex = new RegExp(searchWord, 'gi');
          let text = node.nodeValue;
          if (regex.test(text)) {
              let replacedText = text.replace(regex, '<span class="highlighted" style="background-color: yellow;">$&</span>');
              let newNode = document.createElement('span');
              newNode.innerHTML = replacedText;
              node.parentNode.replaceChild(newNode, node);
          }
      } else if (node.nodeType === 1) {
          for (let i = 0; i < node.childNodes.length; i++) {
              traverseAndHighlight(node.childNodes[i]);
          }
      }
  }

  traverseAndHighlight(document.body);
}
