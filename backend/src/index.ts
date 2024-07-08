import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx';
import blogRouter from './routes/blog' 
import userRouter from './routes/user' 

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
  Variables : {
		userId: string
	}
}>();

app.route("/api/v1/blog",blogRouter)
app.route('/api/v1/user',userRouter)



app.get('/', (c) => {
  return c.text('signup/signIn!')
})













export default app
