'use client';

import { useState } from 'react';
import { 
  useGetUsers, 
  useGetUser, 
  useCreateUser, 
  useUpdateUser, 
  useDeleteUser,
  handleApiError 
} from '@/lib/services';

export default function UsersPage() {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUserData, setNewUserData] = useState({ name: '', email: '' });

  // 获取用户列表
  const { 
    data: usersResponse, 
    isLoading: usersLoading, 
    error: usersError,
    refetch: refetchUsers
  } = useGetUsers();

  // 获取选中用户详情
  const { 
    data: userResponse, 
    isLoading: userLoading, 
    error: userError 
  } = useGetUser(selectedUserId, {
    enabled: !!selectedUserId
  });

  // 创建用户
  const createUserMutation = useCreateUser({
    onSuccess: () => {
      setShowCreateForm(false);
      setNewUserData({ name: '', email: '' });
      alert('用户创建成功！');
    },
    onError: (error) => {
      alert(`创建失败: ${handleApiError(error)}`);
    }
  });

  // 删除用户
  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      setSelectedUserId('');
      alert('用户删除成功！');
    },
    onError: (error) => {
      alert(`删除失败: ${handleApiError(error)}`);
    }
  });

  const handleCreateUser = () => {
    if (!newUserData.name || !newUserData.email) {
      alert('请填写完整信息');
      return;
    }
    createUserMutation.mutate(newUserData);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('确定要删除这个用户吗？')) {
      deleteUserMutation.mutate(id);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">用户管理</h1>
      
      {/* 创建用户按钮 */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showCreateForm ? '取消创建' : '创建用户'}
        </button>
      </div>

      {/* 创建用户表单 */}
      {showCreateForm && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-4">创建新用户</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="用户名"
              value={newUserData.name}
              onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="邮箱"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleCreateUser}
            disabled={createUserMutation.isPending}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {createUserMutation.isPending ? '创建中...' : '确认创建'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 用户列表 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">用户列表</h2>
          
          {usersLoading && <p>加载中...</p>}
          
          {usersError && (
            <div className="text-red-500 mb-4">
              <p>加载失败: {handleApiError(usersError)}</p>
              <button 
                onClick={() => refetchUsers()}
                className="mt-2 bg-gray-500 text-white px-3 py-1 rounded text-sm"
              >
                重试
              </button>
            </div>
          )}
          
          {usersResponse?.data && (
            <div className="space-y-2">
              {Array.isArray(usersResponse.data) && usersResponse.data.length > 0 ? (
                usersResponse.data.map((user: any, index: number) => (
                  <div 
                    key={user.id || index}
                    className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                      selectedUserId === (user.id || index.toString()) ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => setSelectedUserId(user.id || index.toString())}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user.name || `用户 ${index + 1}`}</p>
                        <p className="text-sm text-gray-600">{user.email || '无邮箱'}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.id || index.toString());
                        }}
                        disabled={deleteUserMutation.isPending}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">暂无用户数据</p>
              )}
            </div>
          )}
        </div>

        {/* 用户详情 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">用户详情</h2>
          
          {!selectedUserId && (
            <p className="text-gray-500">请选择一个用户查看详情</p>
          )}
          
          {selectedUserId && userLoading && <p>加载详情中...</p>}
          
          {selectedUserId && userError && (
            <div className="text-red-500">
              <p>加载详情失败: {handleApiError(userError)}</p>
            </div>
          )}
          
          {selectedUserId && userResponse?.data && (
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">用户信息</h3>
              <div className="space-y-2">
                <p><span className="font-medium">ID:</span> {selectedUserId}</p>
                <p><span className="font-medium">姓名:</span> {userResponse.data.name || '未设置'}</p>
                <p><span className="font-medium">邮箱:</span> {userResponse.data.email || '未设置'}</p>
                <p><span className="font-medium">状态:</span> {userResponse.data.status || '正常'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}