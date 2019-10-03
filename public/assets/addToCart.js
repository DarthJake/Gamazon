function addToCart(id) {
  $.ajax({
    type: 'POST',
    url: '/products/' + id,
    data: id,
    success: function (data) {
      //do something with the data via front-end framework
      // location.reload();
    }
  });

}