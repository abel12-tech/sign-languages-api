const express = require("express");
const feedbackController = require("../controllers/feedbackController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/v1/feedback:
 *   get:
 *     summary: Retrieve all feedback
 *     responses:
 *       '200':
 *         description: A list of feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 */
router.get("/", authenticateToken, feedbackController.getAllFeedback);

/**
 * @swagger
 * /api/v1/feedback:
 *   post:
 *     summary: Create a new feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Successfully created feedback
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 */
router.post("/", authenticateToken, feedbackController.createFeedback);

module.exports = router;
