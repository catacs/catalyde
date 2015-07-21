/* Figure numbering using pure CSS!
   This is just some JS to create
   anchors

   Each figure gets an id 
   (#figN). */

$(document).ready(function() {
  $('figure').each(function(i) {
    $(this).attr('id', 'fig' + (i + 1));
  });
});
