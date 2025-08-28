'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthControllerRegister } from '@/services/auth/auth';
import { useAuth } from '@/contexts/auth-context';
import { useGuestGuard } from '@/hooks/useAuthGuard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import type { RegisterDto } from '@/models';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const { shouldShowContent } = useGuestGuard();

  // 如果不应该显示内容（已认证或正在重定向），显示加载状态
  if (!shouldShowContent) {
    return <LoadingSpinner />;
  }
  
  // 使用注册API
  const registerMutation = useAuthControllerRegister({
    mutation: {
      onSuccess: (response) => {
        // 使用auth context的login方法
        login(
          {
            accessToken: response.tokens.accessToken,
            refreshToken: response.tokens.refreshToken
          },
          response.user
        );
        
        // 跳转到dashboard
        router.push('/dashboard');
      },
      onError: (error: any) => {
        console.error('Register error:', error);
        setError(error?.response?.data?.message || '注册失败，请检查输入信息');
      }
    }
  });

  // 验证单个字段
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!value) return '邮箱地址不能为空';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '请输入有效的邮箱地址';
        return '';
      case 'name':
        if (!value) return '姓名不能为空';
        if (value.length < 1) return '姓名不能为空';
        if (value.length > 50) return '姓名长度不能超过50个字符';
        if (!/^[\u4e00-\u9fa5a-zA-Z\s]+$/.test(value)) return '姓名只能包含中文、英文字母和空格';
        return '';
      case 'password':
        if (!value) return '密码不能为空';
        if (value.length < 6) return '密码长度至少为6个字符';
        if (value.length > 128) return '密码长度不能超过128个字符';
        if (!/(?=.*[a-zA-Z])/.test(value)) return '密码必须包含至少一个字母';
        return '';
      case 'confirmPassword':
        if (!value) return '请确认密码';
        if (value !== formData.password) return '两次输入的密码不一致';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 实时验证
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
    
    // 如果是确认密码字段，同时验证密码字段
    if (name === 'password' && touched.confirmPassword && formData.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
    
    // 清除全局错误信息
    if (error) setError('');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 标记所有字段为已触摸
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as {[key: string]: boolean});
    setTouched(allTouched);

    // 验证所有字段
    const newErrors: {[key: string]: string} = {};
    Object.keys(formData).forEach(key => {
      const fieldError = validateField(key, formData[key as keyof typeof formData]);
      if (fieldError) {
        newErrors[key] = fieldError;
      }
    });
    setErrors(newErrors);

    // 如果有验证错误，不提交表单
    if (Object.keys(newErrors).length > 0) {
      setError('请修正表单中的错误');
      return;
    }

    // 调用注册API
    const registerData: RegisterDto = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      role: 'STUDENT' // 默认角色为学生
    };

    registerMutation.mutate({ data: registerData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              创建账户
            </h2>
            <p className="text-gray-600">
              加入考试通过系统
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                   id="email"
                   name="email"
                   type="email"
                   autoComplete="email"
                   required
                   className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                     errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                   }`}
                   placeholder="请输入您的邮箱"
                   value={formData.email}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                 />
              </div>
               {errors.email && (
                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
               )}
             </div>

             <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                姓名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                   id="name"
                   name="name"
                   type="text"
                   autoComplete="name"
                   required
                   className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                     errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                   }`}
                   placeholder="请输入您的姓名"
                   value={formData.name}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                 />
              </div>
               {errors.name && (
                 <p className="mt-1 text-sm text-red-600">{errors.name}</p>
               )}
             </div>

             <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                   id="password"
                   name="password"
                   type="password"
                   autoComplete="new-password"
                   required
                   className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                     errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                   }`}
                   placeholder="请输入密码（至少6位）"
                   value={formData.password}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                 />
              </div>
               {errors.password && (
                 <p className="mt-1 text-sm text-red-600">{errors.password}</p>
               )}
             </div>

             <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                确认密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                   id="confirmPassword"
                   name="confirmPassword"
                   type="password"
                   autoComplete="new-password"
                   required
                   className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                     errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                   }`}
                   placeholder="请再次输入密码"
                   value={formData.confirmPassword}
                   onChange={handleInputChange}
                   onBlur={handleBlur}
                 />
              </div>
               {errors.confirmPassword && (
                 <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
               )}
             </div>

             {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {registerMutation.isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  注册中...
                </>
              ) : (
                '创建账户'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                已有账户？
                <Link href="/login" className="font-medium text-green-600 hover:text-green-500 ml-1 transition-colors duration-200">
                  立即登录
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}