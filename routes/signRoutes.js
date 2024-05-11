const express = require("express");
const signController = require("../controllers/signController");
const { authenticateToken } = require("../middleware/authMiddleware");


const router = express.Router();

/**
 * @swagger
 * /api/v1/signs/stats:
 *   get:
 *     summary: Get statistics about signs
 *     responses:
 *       '200':
 *         description: Statistics about signs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalApprovedSigns:
 *                   type: integer
 *                   description: Total number of approved signs
 *                 totalContributedSigns:
 *                   type: integer
 *                   description: Total number of contributed signs
 *                 totalSigns:
 *                   type: integer
 *                   description: Total number of signs
 *                 totalCategories:
 *                   type: integer
 *                   description: Total number of categories
 */
router.get("/stats",  authenticateToken, signController.getSignsStats);

/**
 * @swagger
 * /api/v1/signs:
 *   get:
 *     summary: Get signs added by non-admin users
 *     responses:
 *       '200':
 *         description: A list of signs added by non-admin users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sign'
 */
router.get("/added-by-user", authenticateToken, signController.getSignAddedByUser);

/**
 * @swagger
 * /api/v1/signs/added-by-admin:
 *   get:
 *     summary: Retrieve signs added by admin users
 *     responses:
 *       '200':
 *         description: A list of signs added by admin users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sign'
 */

router.get("/added-by-admin", authenticateToken, signController.getSignsAddedByAdmin);

/**
 * @swagger
 * /api/v1/signs:
 *   get:
 *     summary: Retrieve all signs
 *     responses:
 *       '200':
 *         description: A list of signs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sign'
 */
router.get("/", authenticateToken, signController.getAllSigns);

/**
 * @swagger
 * /api/v1/signs:
 *   post:
 *     summary: Create a new sign
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sign'
 *     responses:
 *       '201':
 *         description: Successfully created sign
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sign'
 */
router.post("/", authenticateToken, signController.createSign);

/**
 * @swagger
 * /api/v1/signs/{id}:
 *   get:
 *     summary: Retrieve a sign by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sign to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single sign object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sign'
 */
router.get("/:id",  authenticateToken, signController.getSign);

/**
 * @swagger
 * /api/v1/signs/{id}:
 *   patch:
 *     summary: Update a sign by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sign to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sign'
 *     responses:
 *       '200':
 *         description: Successfully updated sign
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sign'
 */
router.patch("/:id", authenticateToken, signController.updateSign);

/**
 * @swagger
 * /api/v1/signs/{id}:
 *   delete:
 *     summary: Delete a sign by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sign to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successfully deleted sign
 */
router.delete("/:id",  authenticateToken, signController.deleteSign);

/**
 * @swagger
 * /api/v1/signs/{id}/approve:
 *   patch:
 *     summary: Approve a sign by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sign to approve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sign approved successfully
 */
router.patch("/:id/approve", authenticateToken, signController.approveSign);

/**
 * @swagger
 * /api/v1/signs/{id}/reject:
 *   patch:
 *     summary: Reject a sign by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sign to reject
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sign rejected successfully
 */
router.patch("/:id/reject",  authenticateToken, signController.rejectSign);

module.exports = router;
