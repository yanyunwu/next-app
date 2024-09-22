"use server"

import { prisma } from "@/utils/prisma"
import { useRequest } from "ahooks"

export const create = async (value: string, html: string) => {
  return prisma.post.create({
    data: {
      title: '暂无名称',
      content: value ? JSON.stringify(value) : '',
      html
    }
  })
}


// export function useCreatePost() {
//   return useRequest(create, { manual: true })
// }