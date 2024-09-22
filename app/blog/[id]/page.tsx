import { prisma } from "@/utils/prisma"
import HtmlRender from "@/components/HtmlRender";



export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id)

  const post = await prisma.post.findFirst({
    where: {
      id: id
    }
  })

  if (!post) {
    return '没有该文章！'
  }

  return <div>
    <div>{post?.title}</div>
    {post.html && <HtmlRender html={post.html} />}
  </div>
}