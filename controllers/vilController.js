var express   = require('express'),
    router    = express.Router(),
    User      = require('../models/usersModel'),
    Vil       = require('../models/vilModel'),
    Comment   = require('../models/commentsModel');

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

function isLoggedIn(req, res, next) {
  console.log('isLoggedIn middleware');
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect('/users');
  }
}

module.exports = router;
