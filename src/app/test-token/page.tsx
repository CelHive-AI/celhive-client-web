'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/Auth';

export default function TestTokenPage() {
  const { token, isAuthenticated } = useAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testTokenPassing = async () => {
    if (!token) {
      setTestResult('❌ 没有找到 token');
      return;
    }

    setIsLoading(true);
    setTestResult('🔄 正在测试 token 传递...');

    try {
      // 测试一个简单的 API 调用
      const response = await fetch('/api/assistants', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const data = await response.text();
        setTestResult(`✅ Token 传递成功！状态码: ${response.status}`);
        console.log('Response data:', data);
      } else {
        const errorText = await response.text();
        setTestResult(`❌ Token 传递失败！状态码: ${response.status}, 错误: ${errorText}`);
        console.error('Error response:', errorText);
      }
    } catch (error) {
      setTestResult(`❌ 请求失败: ${error instanceof Error ? error.message : '未知错误'}`);
      console.error('Request error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Token 传递测试</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="font-semibold mb-2">认证状态</h2>
            <p>已认证: {isAuthenticated ? '✅ 是' : '❌ 否'}</p>
            <p>Token: {token ? `✅ ${token.substring(0, 20)}...` : '❌ 无'}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="font-semibold mb-2">测试结果</h2>
            <p className="whitespace-pre-wrap">{testResult || '尚未测试'}</p>
          </div>

          <button
            onClick={testTokenPassing}
            disabled={!isAuthenticated || !token || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '测试中...' : '测试 Token 传递'}
          </button>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold mb-2">说明</h3>
            <p className="text-sm text-gray-700">
              这个测试会向 <code>/api/assistants</code> 发送一个 GET 请求，并检查：
            </p>
            <ul className="text-sm text-gray-700 mt-2 list-disc list-inside">
              <li>Authorization 头是否正确传递</li>
              <li>API 是否返回 200 状态码（而不是 403）</li>
              <li>服务器是否正确处理了认证</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
