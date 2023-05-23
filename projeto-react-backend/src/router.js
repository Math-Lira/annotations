const express = require('express')
const routes = express.Router()

const AnnotationConstroller = require('./controllers/AnnotationController')
const PriorityController = require('./controllers/PriorityController')
const ContentController = require('./controllers/ContentController')

routes.get('/annotations', AnnotationConstroller.read)
routes.post('/annotations', AnnotationConstroller.create)
routes.delete('/annotations/:id', AnnotationConstroller.delete)

routes.get('/priorities', PriorityController.read)
routes.post('/priorities/:id', PriorityController.update)

routes.post('/contents/:id', ContentController.update)

module.exports = routes