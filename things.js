import express from 'express';

const router = express.Router();

router.get('/one', (req, res) => {
    res.send("Get route on things..")
})

router.post('/one', (req, res) => {
    res.send("Post route on things..")
})

export default router;