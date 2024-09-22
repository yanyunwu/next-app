
import Editor from "../components/Editor";
import dynamic from 'next/dynamic';

const MyComponent = dynamic(() => import('../components/Editor'), {
  ssr: false, // 禁用服务器端渲染
});

export default function Page() {
  return <div>
    <MyComponent />
  </div>
}