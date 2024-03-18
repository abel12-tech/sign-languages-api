const express = require("express");
const signController = require("../controllers/signController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sign:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the sign.
 *         name:
 *           type: string
 *           description: The name of the sign.
 *         category:
 *           type: string
 *           description: The category ID of the sign.
 *         meaning:
 *           type: string
 *           description: The meaning of the sign.
 *         image:
 *           type: string
 *           description: URL of the image associated with the sign.
 *         addedBy:
 *           type: string
 *           description: The user ID who added the sign.
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: The status of the sign.
 */

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
router.get("/", signController.getAllSigns);

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
router.post("/", signController.createSign);

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
router.get("/:id", signController.getSign);

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
router.patch("/:id", signController.updateSign);

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
router.delete("/:id", signController.deleteSign);

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
router.patch("/:id/approve", signController.approveSign);

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
router.patch("/:id/reject", signController.rejectSign);

module.exports = router;
