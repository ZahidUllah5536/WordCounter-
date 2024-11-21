// hero section start
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector(".text-area");
    const wordCountElement = document.getElementById("wordCount");
    const charCountElement = document.getElementById("charCount");
    const sentenceCountElement = document.getElementById("sentenceCount");
    const paragraphCountElement = document.getElementById("paragraphCount");
    const restartIcon = document.querySelector(".firstleftside-icon");
    const uploadIcon = document.querySelector(".secondleftside-icon");
    const copyIcon = document.querySelector(".thirdleftside-icon");
  
    // Function to update counts based on textarea content
    function updateCounts() {
      const text = textarea.value.trim();
      const words = text.split(/\s+/).filter(word => word.length > 0).length;
      const characters = text.length;
      const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
      const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0).length;
  
      wordCountElement.textContent = words;
      charCountElement.textContent = characters;
      sentenceCountElement.textContent = sentences;
      paragraphCountElement.textContent = paragraphs;
    }
  
    // Event listener for restart icon
    restartIcon.addEventListener("click", function (event) {
      textarea.value = ""; // Clear the textarea
      updateCounts(); // Update counts (will be reset to 0)
    });
    uploadLink.addEventListener("click", function () {
      fileInput.click();
  });

  fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
          const reader = new FileReader();
          reader.onload = function (e) {
              const typedarray = new Uint8Array(e.target.result);
              pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                  let textContent = '';
                  let pagePromises = [];
                  for (let i = 1; i <= pdf.numPages; i++) {
                      pagePromises.push(
                          pdf.getPage(i).then(function(page) {
                              return page.getTextContent().then(function(textContentObj) {
                                  textContentObj.items.forEach(function(item) {
                                      textContent += item.str + ' ';
                                  });
                              });
                          })
                      );
                  }
                  Promise.all(pagePromises).then(function() {
                      textarea.value = textContent;
                      updateCounts(textContent);
                  });
              });
          };
          reader.readAsArrayBuffer(file);
      } else {
          alert('Please select a PDF file.');
      }
  });

    // Event listener for copy icon
    copyIcon.addEventListener("click", function (event) {
      textarea.select(); // Select all text in the textarea
      document.execCommand("copy"); // Copy selected text to clipboard

    });
  
    // Event listener for textarea input (to update counts as user types)
    textarea.addEventListener("input", updateCounts);
  });
  
// hero section end


document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("textarea");
    const wordCount = document.getElementById("wordCount");
    const charCount = document.getElementById("charCount");
    const sentenceCount = document.getElementById("sentenceCount");
    const paragraphCount = document.getElementById("paragraphCount");
  
    function updateCounts() {
      const text = textarea.value.trim();
      const words = text.split(/\s+/).filter((word) => /\w+/.test(word)).length; // Exclude punctuation
      const characters = text.length;
      const sentences = text.split(/[.!?]/).filter((sentence) => sentence.trim()).length;
      const paragraphs = text.split(/\n+/).filter((paragraph) => paragraph.trim()).length;
  
      wordCount.textContent = words;
      charCount.textContent = characters;
      sentenceCount.textContent = sentences;
      paragraphCount.textContent = paragraphs;
    }
  
    textarea.addEventListener("input", updateCounts);
  });
  