const express = require("express");
const categoryController = require("../controllers/categoryController");
const { authenticateToken } = require("../middleware/authMiddleware");


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the image associated with the category
 */
router.get("/", authenticateToken, categoryController.getAllCategories);

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '201':
 *         description: Successfully created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.post("/", authenticateToken, categoryController.createCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single category object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.get("/:id", authenticateToken, categoryController.getCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Successfully updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.patch("/:id", authenticateToken, categoryController.updateCategory);

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successfully deleted category
 */
router.delete("/:id", authenticateToken, categoryController.deleteCategory);

/**
 * @swagger
 * /api/v1/categories/{id}/signs:
 *   get:
 *     summary: Retrieve all signs associated with a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of signs associated with the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sign'
 */
router.get("/:id/signs",  authenticateToken,
categoryController.getSignsByCategory);

module.exports = router;
