import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  ChangePasswordDto,
  LoginDto,
  LoginResponseDto,
  RefreshTokenDto,
  RegisterDto,
  TokenResponseDto,
  UserProfileDto
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType , BodyType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 用户登录
 */
export const authControllerLogin = (
    loginDto: BodyType<LoginDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<LoginResponseDto>(
      {url: `/auth/login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: loginDto, signal
    },
      options);
    }
  


export const getAuthControllerLoginMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,{data: BodyType<LoginDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,{data: BodyType<LoginDto>}, TContext> => {

const mutationKey = ['authControllerLogin'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerLogin>>, {data: BodyType<LoginDto>}> = (props) => {
          const {data} = props ?? {};

          return  authControllerLogin(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerLoginMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerLogin>>>
    export type AuthControllerLoginMutationBody = BodyType<LoginDto>
    export type AuthControllerLoginMutationError = ErrorType<null>

    /**
 * @summary 用户登录
 */
export const useAuthControllerLogin = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,{data: BodyType<LoginDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof authControllerLogin>>,
        TError,
        {data: BodyType<LoginDto>},
        TContext
      > => {

      const mutationOptions = getAuthControllerLoginMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 用户注册
 */
export const authControllerRegister = (
    registerDto: BodyType<RegisterDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<LoginResponseDto>(
      {url: `/auth/register`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: registerDto, signal
    },
      options);
    }
  


export const getAuthControllerRegisterMutationOptions = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerRegister>>, TError,{data: BodyType<RegisterDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerRegister>>, TError,{data: BodyType<RegisterDto>}, TContext> => {

const mutationKey = ['authControllerRegister'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerRegister>>, {data: BodyType<RegisterDto>}> = (props) => {
          const {data} = props ?? {};

          return  authControllerRegister(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerRegisterMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerRegister>>>
    export type AuthControllerRegisterMutationBody = BodyType<RegisterDto>
    export type AuthControllerRegisterMutationError = ErrorType<null | null>

    /**
 * @summary 用户注册
 */
export const useAuthControllerRegister = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerRegister>>, TError,{data: BodyType<RegisterDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof authControllerRegister>>,
        TError,
        {data: BodyType<RegisterDto>},
        TContext
      > => {

      const mutationOptions = getAuthControllerRegisterMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 刷新访问令牌
 */
export const authControllerRefreshToken = (
    refreshTokenDto: BodyType<RefreshTokenDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<TokenResponseDto>(
      {url: `/auth/refresh`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: refreshTokenDto, signal
    },
      options);
    }
  


export const getAuthControllerRefreshTokenMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerRefreshToken>>, TError,{data: BodyType<RefreshTokenDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerRefreshToken>>, TError,{data: BodyType<RefreshTokenDto>}, TContext> => {

const mutationKey = ['authControllerRefreshToken'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerRefreshToken>>, {data: BodyType<RefreshTokenDto>}> = (props) => {
          const {data} = props ?? {};

          return  authControllerRefreshToken(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerRefreshTokenMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerRefreshToken>>>
    export type AuthControllerRefreshTokenMutationBody = BodyType<RefreshTokenDto>
    export type AuthControllerRefreshTokenMutationError = ErrorType<null>

    /**
 * @summary 刷新访问令牌
 */
export const useAuthControllerRefreshToken = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerRefreshToken>>, TError,{data: BodyType<RefreshTokenDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof authControllerRefreshToken>>,
        TError,
        {data: BodyType<RefreshTokenDto>},
        TContext
      > => {

      const mutationOptions = getAuthControllerRefreshTokenMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取当前用户信息
 */
export const authControllerGetProfile = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<UserProfileDto>(
      {url: `/auth/profile`, method: 'GET', signal
    },
      options);
    }
  

export const getAuthControllerGetProfileQueryKey = () => {
    return [`/auth/profile`] as const;
    }

    
export const getAuthControllerGetProfileQueryOptions = <TData = Awaited<ReturnType<typeof authControllerGetProfile>>, TError = ErrorType<null>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetProfile>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAuthControllerGetProfileQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof authControllerGetProfile>>> = ({ signal }) => authControllerGetProfile(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof authControllerGetProfile>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AuthControllerGetProfileQueryResult = NonNullable<Awaited<ReturnType<typeof authControllerGetProfile>>>
export type AuthControllerGetProfileQueryError = ErrorType<null>


export function useAuthControllerGetProfile<TData = Awaited<ReturnType<typeof authControllerGetProfile>>, TError = ErrorType<null>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetProfile>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof authControllerGetProfile>>,
          TError,
          Awaited<ReturnType<typeof authControllerGetProfile>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAuthControllerGetProfile<TData = Awaited<ReturnType<typeof authControllerGetProfile>>, TError = ErrorType<null>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetProfile>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof authControllerGetProfile>>,
          TError,
          Awaited<ReturnType<typeof authControllerGetProfile>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAuthControllerGetProfile<TData = Awaited<ReturnType<typeof authControllerGetProfile>>, TError = ErrorType<null>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetProfile>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取当前用户信息
 */

export function useAuthControllerGetProfile<TData = Awaited<ReturnType<typeof authControllerGetProfile>>, TError = ErrorType<null>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetProfile>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAuthControllerGetProfileQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 修改密码
 */
export const authControllerChangePassword = (
    changePasswordDto: BodyType<ChangePasswordDto>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/auth/change-password`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: changePasswordDto
    },
      options);
    }
  


export const getAuthControllerChangePasswordMutationOptions = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerChangePassword>>, TError,{data: BodyType<ChangePasswordDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerChangePassword>>, TError,{data: BodyType<ChangePasswordDto>}, TContext> => {

const mutationKey = ['authControllerChangePassword'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerChangePassword>>, {data: BodyType<ChangePasswordDto>}> = (props) => {
          const {data} = props ?? {};

          return  authControllerChangePassword(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerChangePasswordMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerChangePassword>>>
    export type AuthControllerChangePasswordMutationBody = BodyType<ChangePasswordDto>
    export type AuthControllerChangePasswordMutationError = ErrorType<null | null>

    /**
 * @summary 修改密码
 */
export const useAuthControllerChangePassword = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerChangePassword>>, TError,{data: BodyType<ChangePasswordDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof authControllerChangePassword>>,
        TError,
        {data: BodyType<ChangePasswordDto>},
        TContext
      > => {

      const mutationOptions = getAuthControllerChangePasswordMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 用户登出
 */
export const authControllerLogout = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/auth/logout`, method: 'POST', signal
    },
      options);
    }
  


export const getAuthControllerLogoutMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerLogout>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerLogout>>, TError,void, TContext> => {

const mutationKey = ['authControllerLogout'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerLogout>>, void> = () => {
          

          return  authControllerLogout(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerLogout>>>
    
    export type AuthControllerLogoutMutationError = ErrorType<null>

    /**
 * @summary 用户登出
 */
export const useAuthControllerLogout = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerLogout>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof authControllerLogout>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getAuthControllerLogoutMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    