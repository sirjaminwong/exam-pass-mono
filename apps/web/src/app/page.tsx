'use client';

import Image from "next/image";
import Link from "next/link";
import { useGetHello } from "../lib/services";

function HelloComponent() {
  const { data, isLoading, error } = useGetHello();
  
  if (isLoading) return <p className="text-sm text-gray-600">连接API中...</p>;
  if (error) return <p className="text-sm text-red-600">API连接失败</p>;
  
  return <p className="text-sm text-green-600">API连接成功 ✓</p>;
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">Exam Pass</h1>
          <p className="text-xl text-gray-600 mb-2">考试通过系统</p>
          <HelloComponent />
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">系统功能</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• 基于 Next.js 15 + React 19 的现代化前端</li>
            <li>• 集成 @tanstack/react-query 进行数据管理</li>
            <li>• 使用 Axios 进行 HTTP 请求</li>
            <li>• 基于 Swagger 文档的类型安全 API 调用</li>
            <li>• 完整的错误处理和加载状态管理</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/login"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              用户登录
            </h2>
            <p className="text-gray-600">
              登录到考试系统
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              用户主页
            </h2>
            <p className="text-gray-600">
              查看考试记录和统计信息
            </p>
          </Link>

          <Link
            href="/users"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              用户管理
            </h2>
            <p className="text-gray-600">
              查看和管理系统用户
            </p>
          </Link>

          <a
            href="http://localhost:3001/api"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              API 文档
            </h2>
            <p className="text-gray-600">
              查看 Swagger API 文档
            </p>
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
