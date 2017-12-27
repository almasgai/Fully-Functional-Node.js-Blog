var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')

var data = [
{
  name: "Another one",
  image: "https://keepcupcnd.scdn4.secure.raxcdn.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/c/u/cup.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non interdum neque. Fusce placerat, nibh eget fermentum ultricies, tortor mauris sagittis ligula, in facilisis metus nisl vel odio. Donec rhoncus justo eu erat eleifend, vitae accumsan mi luctus. Vivamus in tellus consequat, pulvinar tortor in, lacinia sem. Phasellus ullamcorper lectus neque, sed efficitur tellus pulvinar eget. Nam in elementum elit. Donec non arcu tempus, suscipit libero nec, posuere diam. Vestibulum eros ipsum, faucibus quis imperdiet at, tincidunt quis nulla. Integer suscipit quam ac finibus porttitor. Maecenas volutpat dolor at est aliquam, vel dictum risus faucibus. Integer eget sem sed dolor efficitur tristique. Sed porttitor, nulla ut ultricies tincidunt, nisl velit rutrum ante, ac dictum risus ipsum laoreet sapien. Donec scelerisque ante tellus, ut consequat turpis dignissim nec. Etiam ac lectus sed est dignissim aliquam eu molestie mauris. Suspendisse aliquet orci nibh, maximus finibus risus tristique eu."
}, {
  name: "Another two",
  image: "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non interdum neque. Fusce placerat, nibh eget fermentum ultricies, tortor mauris sagittis ligula, in facilisis metus nisl vel odio. Donec rhoncus justo eu erat eleifend, vitae accumsan mi luctus. Vivamus in tellus consequat, pulvinar tortor in, lacinia sem. Phasellus ullamcorper lectus neque, sed efficitur tellus pulvinar eget. Nam in elementum elit. Donec non arcu tempus, suscipit libero nec, posuere diam."
}, {
  name: "Another three",
  image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non interdum neque. Fusce placerat, nibh eget fermentum ultricies, tortor mauris sagittis ligula, in facilisis metus nisl vel odio. Donec rhoncus justo eu erat eleifend, vitae accumsan mi luctus. Vivamus in tellus consequat, pulvinar tortor in, lacinia sem. Phasellus ullamcorper lectus neque, sed efficitur tellus pulvinar eget. Nam in elementum elit. Donec non arcu tempus, suscipit libero nec, posuere diam."
}
]

function seedDB() {
//remove all campgrounds
Campground.remove({}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Camgrounds remove");
//   }
// })
// data.forEach(function(seed) {
//   Campground.create(seed, function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Added campground");
//       // create comment
//       Comment.create({
//         text: "This is a test",
//         author: "Homer"
//       },
//       function(err, comment) {
//         if (err) {
//           console.log(err);
//         } else {
//           campground.comments.push(comment)
//           campground.save()
//           console.log("Comment created");
//           }
//       })
//     }})
  })
}

// add a few campgrounds using array from above

module.exports = seedDB
