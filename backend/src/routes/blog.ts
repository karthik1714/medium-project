import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import {createBlogInput,updateBlogInput} from '@karthik1417/medium-common'

interface ExtendedContext  {
  userId?: string;
}

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string
  },
  Request: ExtendedContext
}>();

blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization') || "";
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
  try {
    const user = await verify(token, c.env.JWT_SECRET);
	if (user) {
    //@ts-ignore
    c.set('userId',user.id);
    await next()
	}else{
    c.status(401);
		return c.json({ error: "unauthorized , Not logged in" });
  }
  } catch (error) {
    c.status(401);
		return c.json({ error: "unauthorized , Not logged in" });
  }
	
})


blogRouter.post('/', async (c) => {
  const body = await c.req.json()
  const authorId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const {success} = createBlogInput.safeParse(body)
if(!success){
  c.status(422);
  return c.json({ error: "Wrong Inputs" });
}else {
  try {
    const blog= await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId : authorId
      }
    })
    return c.json({id:blog.id , message : " Created "})
    
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while creating blog" });
  }
}

})

blogRouter.put('/', async(c) => {
  
  const body = await c.req.json()
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const {success} = updateBlogInput.safeParse(body)
if(!success){
  c.status(422);
  return c.json({ error: "Wrong Inputs" });
}else {
  try {
    const blog= await prisma.post.update({
      where : {
        id : body.id
      },
      data:{
        title:body.title,
        content:body.content,
      }
    })

    return c.json({id:blog.id , message : "Todo Updated"})
    
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while updating blog" });
  }
}


})
 
blogRouter.get('/bulk', async(c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  try {
    const blogs= await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{  
          select:{
            name:true
          }
        }
      }
    })

    return c.json({blogs})
    
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while getting a blog" });
  }
})


blogRouter.get('/:id', async(c) => {
  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

  try {
    const blog= await prisma.post.findUnique({
      where : {
        id : id
      },
      select:{
        id:true,
        title : true,
        content : true,
        author :{
          select :{
            name : true
          }
        }
      }
    })

    return c.json({blog })
    
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while getting a blog" });
  }
})

//TODO : add pagination


export default blogRouter;