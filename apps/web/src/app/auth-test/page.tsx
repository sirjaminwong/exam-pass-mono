'use client';

import { useAuth } from '@/contexts/auth-context';
import { TokenManager } from '@/utils/token-manager';
import { useEffect, useState } from 'react';

export default function AuthTestPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [clientTokenCheck, setClientTokenCheck] = useState<boolean | null>(null);
  const [tokenData, setTokenData] = useState<any>(null);

  useEffect(() => {
    // 客户端token检查
    const checkTokens = () => {
      const hasToken = TokenManager.isAuthenticatedClient();
      const authData = TokenManager.getAuthData();
      
      setClientTokenCheck(hasToken);
      setTokenData({
        accessToken: !!authData.accessToken,
        refreshToken: !!authData.refreshToken,
        accessTokenValue: authData.accessToken?.substring(0, 20) + '...',
      });
    };

    checkTokens();
    
    // 每秒检查一次
    const interval = setInterval(checkTokens, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">认证状态测试页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Auth Context 状态</h2>
          <div className="space-y-2">
            <p><strong>isAuthenticated:</strong> {isAuthenticated ? '✅ true' : '❌ false'}</p>
            <p><strong>isLoading:</strong> {isLoading ? '⏳ true' : '✅ false'}</p>
            <p><strong>user:</strong> {user ? `✅ ${user.email}` : '❌ null'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Token Manager 状态</h2>
          <div className="space-y-2">
            <p><strong>isAuthenticatedClient:</strong> {clientTokenCheck ? '✅ true' : '❌ false'}</p>
            <p><strong>hasAccessToken:</strong> {tokenData?.accessToken ? '✅ true' : '❌ false'}</p>
            <p><strong>hasRefreshToken:</strong> {tokenData?.refreshToken ? '✅ true' : '❌ false'}</p>
            <p><strong>hasUserData:</strong> {tokenData?.userData ? '✅ true' : '❌ false'}</p>
            {tokenData?.accessTokenValue && (
              <p><strong>accessToken:</strong> {tokenData.accessTokenValue}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">测试说明：</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>登录后访问此页面，所有状态应该显示为 true</li>
          <li>刷新页面后，状态应该保持不变</li>
          <li>如果刷新后状态变为 false，说明认证状态丢失</li>
        </ul>
      </div>

      <div className="mt-6 space-x-4">
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          刷新页面测试
        </button>
        <button 
          onClick={() => {
            TokenManager.clearAll();
            window.location.reload();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          清除所有认证数据
        </button>
        <a 
          href="/login"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
        >
          去登录页面
        </a>
        <a 
          href="/dashboard"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 inline-block"
        >
          去仪表板
        </a>
      </div>
    </div>
  );
}