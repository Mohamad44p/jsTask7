document.addEventListener("DOMContentLoaded", function() {
  const addButtonList = document.querySelectorAll('.btn-primary');
  
  addButtonList.forEach(function(button) {
    button.addEventListener('click', function() {
      const label = button.nextElementSibling;
      
      let count = parseInt(label.textContent);
      
      count++;
      
      label.textContent = count;
    });
  });
});
