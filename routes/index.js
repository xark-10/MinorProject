const express = require('express')
const router = express.Router()
const authActions = require('../controllers/authController')



router.get('/', authActions.loginStudentGetRoute)
router.get('/newStudent', authActions.newStudentGetRoute)

router.get('/loginStudent', authActions.loginStudentGetRoute)
router.get('/admin-update', authActions.studentResultEntryRouteGet)
router.get('/admin-home', authActions.adminHome)

router.post('/newStudent', authActions.newStudent)

router.post('/loginStudent', authActions.StudentLogin)

router.post('/admin-update',authActions.studentResultEntryRoute)

router.post('/studentResultRoute', authActions.studentResultRoute)
router.all('*', authActions.errorPageRoute)




module.exports = router
