import express from 'express';
import { getProducts } from './controllers/products.controllers';
import { getCategories } from './controllers/categories.controllers';
import { protect } from './middleware/auth.middleware';
import { findUserById } from './models/User';
import { registerUser } from './controllers/auth.controllers';

const router = express.Router();

router.get('/products', getProducts);
router.get('/categories', getCategories);
// ...

//own: /register endpoint will look sth like:
router.post("/register", registerUser) // controller function

// please disregard the lines below
//own: routes = endpoints made accessible by the backend where specific function is invoked when calling them
//own: handler function => function that gets executed when making (successful) request to endpoint
router.get('/', (req, res) => { return res.json({ message: 'Hello World' }); });
router.get('/me', protect, async (req, res) => { const user = await findUserById(req.body.user); if (user) { res.json({ user }); } else { res.status(404).json({ message: 'User not found' }); }});
export default router;