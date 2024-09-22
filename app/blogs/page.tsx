import BlogPreviewCard from "@/components/BlogPreviewCard"
import { prisma } from "@/utils/prisma"



export default async function Page() {
  const posts = await prisma.post.findMany()


  return (
    <div className="py-4">
      <div className="flex flex-wrap gap-[9px] gap-y-10">
        {
          posts.map(post => {
            return (
              <div key={post.id} className="basis-[calc(33.333333%-6px)] p-2 hover:shadow-lg rounded-md ">
                <BlogPreviewCard post={post} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}