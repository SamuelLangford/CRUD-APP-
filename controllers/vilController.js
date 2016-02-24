var express   = require('express'),
    router    = express.Router(),
    User      = require('../models/usersModel'),
    Vil       = require('../models/vilModel'),
    Comment   = require('../models/commentsModel');

// villains index

router.get('/', isLoggedIn, function(req, res) {
 Vil.find(function(err, vils) {
        res.render('villains/index.ejs' , { vils: vils,});
    });
});



router.get('/new', function(req, res){
  res.render('villains/new.ejs');
})



router.get('/:id', function(req, res){
   Vil.findById(req.params.id, function(err, vils) {
    res.render('villains/show.ejs', vils)
   })
})
router.post('/', function(req, res){
    var newVillain = new Vil(req.body);
    newVillain.save(function(err, data){
      res.redirect('/villains')
    })
})
// router.post('/', function(req, res){
//   var newArticle = new Article(req.body);
//   newArticle.save(function(err, data){
//     res.redirect('/articles');
//   })
// });





  router.post('/:id/comment', function(req, res) { 
    Vil.findById(req.params.id, function(err, vils) {
      var comment = new Comment(req.body);
      vils.comments.push(comment);
      vils.save(function(err, comment) {
        res.redirect('/villains/' + req.params.id);
      });     
    });
  })





router.get('/:id/edit', function(req, res){
  Vil.findById(req.params.id, function(err, data){
    res.render('villains/edit.ejs', data);
  });
});


router.put('/:id', function(req, res){
  Vil.findByIdAndUpdate(req.params.id, req.body, 
    function(err, data){
    res.redirect('/villains/' + req.params.id);
  });
});

//delete route
// router.delete("",
//   comment.findById(req.body.comment_id))
    // comment.remove()

// middleware to check login status
// used in index route
function isLoggedIn(req, res, next) {
  console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/users');
  }
}

module.exports = router;
