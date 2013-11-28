function annotate(annotations) {
  for (var id in annotations) {
    annotateBlock(id, annotations[id]);
  }
}
function annotateBlock(id, annotations) {
  $('#'+id).html(function(i, html) {
    for (var i = 0; i < annotations.length; i++) {
      html = html.replace(new RegExp(annotations[i][0], 'g'), function(match, p1) {
        return match.replace(new RegExp(p1), '<span class="annotation" title="'+annotations[i][1]+'">'+p1+'</span>')
      });
    }
    return html;
  });
  $('.annotation').tooltip();
}