import { Button } from "@/components/ui/button"
import "@/styles/globals.css"
import Link from "next/link"

export const metadata = {
  title: '极简博客',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/lxgw-wenkai-screen-webfont/1.7.0/lxgwwenkaiscreenr.css" />
        {/* <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('dark')" }}></script> */}
      </head>
      <body style={{ fontFamily: '"LXGW WenKai Screen R"' }}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}


function Layout({ children }: {
  children: React.ReactNode
}) {
  const headerConfig = {
    buttons: [
      {
        title: '首页',
        href: '/'
      },
      {
        title: '文章',
        href: '/blogs'
      },
      {
        title: '写作',
        href: '/edit'
      },
      {
        title: '关于',
        href: '/about'
      },
    ]
  }

  return (
    <div className='max-w-6xl m-auto'>
      <header>
        <div className='flex h-16 justify-between items-center'>
          <span className="text-lg">博客</span>
          <ul className='flex gap-4'>
            {
              headerConfig.buttons.map((item, i) => {
                return <li key={i}>
                  <Button asChild variant="ghost">
                    <Link href={item.href}>
                      {item.title}
                    </Link>
                  </Button>
                </li>
              })
            }
          </ul>
        </div>
      </header>
      <section>
        {children}
      </section>
    </div>
  )
}
