// require controllers here

const usersController = require('../controllers').users
const postsController = require('../controllers').posts
const ordersController = require('../controllers').orders
const authController = require('../controllers').auth
const seedsController = require('../controllers').seeds
const emailsController = require('../controllers').emails;

module.exports = (app) => {
    // define all routes here
    
    // users
    app.post('/api/user', [usersController.isUniqueEmailAndUsername, usersController.create]); 
    app.get('/api/users', usersController.read);
    app.post('/api/user/update', usersController.update);
    app.post('/api/user/delete', usersController.delete);
    app.get('/api/user/:id', usersController.findById);

    // posts
    app.post('/api/post', postsController.create);
    app.get('/api/posts', postsController.read);
    app.post('/api/post/update', postsController.update);
    app.post('/api/post/delete', postsController.delete);
    app.get('/api/post/:id', postsController.findById);
    app.get('/api/posts/seller/:sellerId', postsController.getSellerPosts);

    //orders
    app.post('/api/order', ordersController.create);
    app.get('/api/orders', ordersController.read);
    app.post('/api/order/update', ordersController.update);
    app.post('/api/order/delete', ordersController.delete);
    app.get('/api/order/:id', ordersController.findById);
    app.get('/api/orders/buyer/:buyerId', ordersController.getBuyerOrders);
    app.get('/api/orders/seller/:sellerId', ordersController.getSellerOrders);

    app.post('/api/login', authController.login);

    app.post('/api/seed', seedsController.seedDatabase);

    app.post('/api/send_email', emailsController.sendPersonalEmail);

}