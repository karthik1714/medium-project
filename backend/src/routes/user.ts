import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import {signinInput,signupInput} from "@karthik1417/medium-common"


const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
  Variables : {
		userId: string
	}
}>();



userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const body = await c.req.json();
const {success} = signupInput.safeParse(body);
if(!success){
  c.status(422);
  return c.json({ error: "Wrong Inputs" });
}else {
try {
  const user = await prisma.user.create({
    data : {
      email: body.email,
      password: body.password,
    }
  });
  const token = await sign({id : user.id}, c.env.JWT_SECRET)
  return c.json({jwt : token})
} catch(e){
  c.status(403);
	return c.json({ error: "error while signing up" });
};
}
})


userRouter.post('/signin', async(c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
if(!success){
  c.status(422);
  return c.json({ error: "Wrong Inputs" });
}else {
  try {
    const user = await prisma.user.findUnique({
      where:{
        email: body.email,
      }
    });

    if(!user){
       c.status(403)
       return c.json({error : "User not found"})
    }

    const token = await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({jwt : token,
      message:"User loged in"
    })

  } catch (error) {
    console.error(error); 
    c.status(500);
    return c.json({ error: "Internal Server Error" });
    
  }
}
})

export default userRouter;