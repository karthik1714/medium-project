import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import blogRouter from './routes/blog' 
import userRouter from './routes/user' 
import { cors } from 'hono/cors'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
  Variables : {
		userId: string
	}
}>();


app.use(cors());
app.route("/api/v1/blog",blogRouter)
app.route('/api/v1/user',userRouter)



app.get('/', (c) => {
  return c.text('signup/signIn!')
})













export default app
