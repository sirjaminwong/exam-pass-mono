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
  ClassMembersControllerAddMemberBody,
  ClassMembersControllerBulkAddBody,
  ClassMembersControllerBulkRemoveBody,
  ClassMembersControllerCreateBody,
  ClassMembersControllerFindAllParams,
  ClassMembersControllerGetClassMemberStatsParams,
  ClassMembersControllerGetRecentMembersParams,
  ClassMembersControllerUpdateBody
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType , BodyType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新的班级成员记录
 */
export const classMembersControllerCreate = (
    classMembersControllerCreateBody: BodyType<ClassMembersControllerCreateBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: classMembersControllerCreateBody, signal
    },
      options);
    }
  


export const getClassMembersControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerCreate>>, TError,{data: BodyType<ClassMembersControllerCreateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerCreate>>, TError,{data: BodyType<ClassMembersControllerCreateBody>}, TContext> => {

const mutationKey = ['classMembersControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classMembersControllerCreate>>, {data: BodyType<ClassMembersControllerCreateBody>}> = (props) => {
          const {data} = props ?? {};

          return  classMembersControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassMembersControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerCreate>>>
    export type ClassMembersControllerCreateMutationBody = BodyType<ClassMembersControllerCreateBody>
    export type ClassMembersControllerCreateMutationError = ErrorType<null>

    /**
 * @summary 创建新的班级成员记录
 */
export const useClassMembersControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerCreate>>, TError,{data: BodyType<ClassMembersControllerCreateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classMembersControllerCreate>>,
        TError,
        {data: BodyType<ClassMembersControllerCreateBody>},
        TContext
      > => {

      const mutationOptions = getClassMembersControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取班级成员记录列表
 */
export const classMembersControllerFindAll = (
    params?: ClassMembersControllerFindAllParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getClassMembersControllerFindAllQueryKey = (params?: ClassMembersControllerFindAllParams,) => {
    return [`/class-members`, ...(params ? [params]: [])] as const;
    }

    
export const getClassMembersControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError = ErrorType<unknown>>(params?: ClassMembersControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassMembersControllerFindAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classMembersControllerFindAll>>> = ({ signal }) => classMembersControllerFindAll(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassMembersControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerFindAll>>>
export type ClassMembersControllerFindAllQueryError = ErrorType<unknown>


export function useClassMembersControllerFindAll<TData = Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  ClassMembersControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindAll<TData = Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ClassMembersControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindAll<TData = Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ClassMembersControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取班级成员记录列表
 */

export function useClassMembersControllerFindAll<TData = Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ClassMembersControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassMembersControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 添加班级成员
 */
export const classMembersControllerAddMember = (
    classMembersControllerAddMemberBody: BodyType<ClassMembersControllerAddMemberBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/add`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: classMembersControllerAddMemberBody, signal
    },
      options);
    }
  


export const getClassMembersControllerAddMemberMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerAddMember>>, TError,{data: BodyType<ClassMembersControllerAddMemberBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerAddMember>>, TError,{data: BodyType<ClassMembersControllerAddMemberBody>}, TContext> => {

const mutationKey = ['classMembersControllerAddMember'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classMembersControllerAddMember>>, {data: BodyType<ClassMembersControllerAddMemberBody>}> = (props) => {
          const {data} = props ?? {};

          return  classMembersControllerAddMember(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassMembersControllerAddMemberMutationResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerAddMember>>>
    export type ClassMembersControllerAddMemberMutationBody = BodyType<ClassMembersControllerAddMemberBody>
    export type ClassMembersControllerAddMemberMutationError = ErrorType<null>

    /**
 * @summary 添加班级成员
 */
export const useClassMembersControllerAddMember = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerAddMember>>, TError,{data: BodyType<ClassMembersControllerAddMemberBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classMembersControllerAddMember>>,
        TError,
        {data: BodyType<ClassMembersControllerAddMemberBody>},
        TContext
      > => {

      const mutationOptions = getClassMembersControllerAddMemberMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 批量添加班级成员
 */
export const classMembersControllerBulkAdd = (
    classMembersControllerBulkAddBody: BodyType<ClassMembersControllerBulkAddBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/bulk-add`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: classMembersControllerBulkAddBody, signal
    },
      options);
    }
  


export const getClassMembersControllerBulkAddMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerBulkAdd>>, TError,{data: BodyType<ClassMembersControllerBulkAddBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerBulkAdd>>, TError,{data: BodyType<ClassMembersControllerBulkAddBody>}, TContext> => {

const mutationKey = ['classMembersControllerBulkAdd'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classMembersControllerBulkAdd>>, {data: BodyType<ClassMembersControllerBulkAddBody>}> = (props) => {
          const {data} = props ?? {};

          return  classMembersControllerBulkAdd(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassMembersControllerBulkAddMutationResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerBulkAdd>>>
    export type ClassMembersControllerBulkAddMutationBody = BodyType<ClassMembersControllerBulkAddBody>
    export type ClassMembersControllerBulkAddMutationError = ErrorType<null>

    /**
 * @summary 批量添加班级成员
 */
export const useClassMembersControllerBulkAdd = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerBulkAdd>>, TError,{data: BodyType<ClassMembersControllerBulkAddBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classMembersControllerBulkAdd>>,
        TError,
        {data: BodyType<ClassMembersControllerBulkAddBody>},
        TContext
      > => {

      const mutationOptions = getClassMembersControllerBulkAddMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 批量删除班级成员记录
 */
export const classMembersControllerBulkRemove = (
    classMembersControllerBulkRemoveBody: BodyType<ClassMembersControllerBulkRemoveBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/bulk-remove`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: classMembersControllerBulkRemoveBody, signal
    },
      options);
    }
  


export const getClassMembersControllerBulkRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerBulkRemove>>, TError,{data: BodyType<ClassMembersControllerBulkRemoveBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerBulkRemove>>, TError,{data: BodyType<ClassMembersControllerBulkRemoveBody>}, TContext> => {

const mutationKey = ['classMembersControllerBulkRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classMembersControllerBulkRemove>>, {data: BodyType<ClassMembersControllerBulkRemoveBody>}> = (props) => {
          const {data} = props ?? {};

          return  classMembersControllerBulkRemove(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassMembersControllerBulkRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerBulkRemove>>>
    export type ClassMembersControllerBulkRemoveMutationBody = BodyType<ClassMembersControllerBulkRemoveBody>
    export type ClassMembersControllerBulkRemoveMutationError = ErrorType<null>

    /**
 * @summary 批量删除班级成员记录
 */
export const useClassMembersControllerBulkRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerBulkRemove>>, TError,{data: BodyType<ClassMembersControllerBulkRemoveBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classMembersControllerBulkRemove>>,
        TError,
        {data: BodyType<ClassMembersControllerBulkRemoveBody>},
        TContext
      > => {

      const mutationOptions = getClassMembersControllerBulkRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取指定用户的班级成员记录
 */
export const classMembersControllerFindByUser = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/user/${userId}`, method: 'GET', signal
    },
      options);
    }
  

export const getClassMembersControllerFindByUserQueryKey = (userId?: string,) => {
    return [`/class-members/user/${userId}`] as const;
    }

    
export const getClassMembersControllerFindByUserQueryOptions = <TData = Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError = ErrorType<unknown>>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassMembersControllerFindByUserQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classMembersControllerFindByUser>>> = ({ signal }) => classMembersControllerFindByUser(userId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassMembersControllerFindByUserQueryResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerFindByUser>>>
export type ClassMembersControllerFindByUserQueryError = ErrorType<unknown>


export function useClassMembersControllerFindByUser<TData = Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindByUser>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindByUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindByUser<TData = Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindByUser>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindByUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindByUser<TData = Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户的班级成员记录
 */

export function useClassMembersControllerFindByUser<TData = Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassMembersControllerFindByUserQueryOptions(userId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定班级的成员记录
 */
export const classMembersControllerFindByClass = (
    classId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/class/${classId}`, method: 'GET', signal
    },
      options);
    }
  

export const getClassMembersControllerFindByClassQueryKey = (classId?: string,) => {
    return [`/class-members/class/${classId}`] as const;
    }

    
export const getClassMembersControllerFindByClassQueryOptions = <TData = Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError = ErrorType<unknown>>(classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassMembersControllerFindByClassQueryKey(classId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classMembersControllerFindByClass>>> = ({ signal }) => classMembersControllerFindByClass(classId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(classId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassMembersControllerFindByClassQueryResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerFindByClass>>>
export type ClassMembersControllerFindByClassQueryError = ErrorType<unknown>


export function useClassMembersControllerFindByClass<TData = Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError = ErrorType<unknown>>(
 classId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindByClass>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindByClass>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindByClass<TData = Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindByClass>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindByClass>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindByClass<TData = Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定班级的成员记录
 */

export function useClassMembersControllerFindByClass<TData = Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassMembersControllerFindByClassQueryOptions(classId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定班级的最近加入成员
 */
export const classMembersControllerGetRecentMembers = (
    classId: string,
    params?: ClassMembersControllerGetRecentMembersParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/class/${classId}/recent`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getClassMembersControllerGetRecentMembersQueryKey = (classId?: string,
    params?: ClassMembersControllerGetRecentMembersParams,) => {
    return [`/class-members/class/${classId}/recent`, ...(params ? [params]: [])] as const;
    }

    
export const getClassMembersControllerGetRecentMembersQueryOptions = <TData = Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError = ErrorType<unknown>>(classId: string,
    params?: ClassMembersControllerGetRecentMembersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassMembersControllerGetRecentMembersQueryKey(classId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>> = ({ signal }) => classMembersControllerGetRecentMembers(classId,params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(classId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassMembersControllerGetRecentMembersQueryResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>>
export type ClassMembersControllerGetRecentMembersQueryError = ErrorType<unknown>


export function useClassMembersControllerGetRecentMembers<TData = Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError = ErrorType<unknown>>(
 classId: string,
    params: undefined |  ClassMembersControllerGetRecentMembersParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerGetRecentMembers<TData = Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError = ErrorType<unknown>>(
 classId: string,
    params?: ClassMembersControllerGetRecentMembersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerGetRecentMembers<TData = Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError = ErrorType<unknown>>(
 classId: string,
    params?: ClassMembersControllerGetRecentMembersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定班级的最近加入成员
 */

export function useClassMembersControllerGetRecentMembers<TData = Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError = ErrorType<unknown>>(
 classId: string,
    params?: ClassMembersControllerGetRecentMembersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetRecentMembers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassMembersControllerGetRecentMembersQueryOptions(classId,params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定班级按角色分类的成员
 */
export const classMembersControllerGetMembersByRole = (
    classId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/class/${classId}/by-role`, method: 'GET', signal
    },
      options);
    }
  

export const getClassMembersControllerGetMembersByRoleQueryKey = (classId?: string,) => {
    return [`/class-members/class/${classId}/by-role`] as const;
    }

    
export const getClassMembersControllerGetMembersByRoleQueryOptions = <TData = Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError = ErrorType<unknown>>(classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassMembersControllerGetMembersByRoleQueryKey(classId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>> = ({ signal }) => classMembersControllerGetMembersByRole(classId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(classId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassMembersControllerGetMembersByRoleQueryResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>>
export type ClassMembersControllerGetMembersByRoleQueryError = ErrorType<unknown>


export function useClassMembersControllerGetMembersByRole<TData = Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError = ErrorType<unknown>>(
 classId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerGetMembersByRole<TData = Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerGetMembersByRole<TData = Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定班级按角色分类的成员
 */

export function useClassMembersControllerGetMembersByRole<TData = Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetMembersByRole>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassMembersControllerGetMembersByRoleQueryOptions(classId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定用户在指定班级的成员记录
 */
export const classMembersControllerFindByUserAndClass = (
    userId: string,
    classId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/user/${userId}/class/${classId}`, method: 'GET', signal
    },
      options);
    }
  

export const getClassMembersControllerFindByUserAndClassQueryKey = (userId?: string,
    classId?: string,) => {
    return [`/class-members/user/${userId}/class/${classId}`] as const;
    }

    
export const getClassMembersControllerFindByUserAndClassQueryOptions = <TData = Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError = ErrorType<null>>(userId: string,
    classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassMembersControllerFindByUserAndClassQueryKey(userId,classId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>> = ({ signal }) => classMembersControllerFindByUserAndClass(userId,classId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId && classId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassMembersControllerFindByUserAndClassQueryResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>>
export type ClassMembersControllerFindByUserAndClassQueryError = ErrorType<null>


export function useClassMembersControllerFindByUserAndClass<TData = Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError = ErrorType<null>>(
 userId: string,
    classId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindByUserAndClass<TData = Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError = ErrorType<null>>(
 userId: string,
    classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindByUserAndClass<TData = Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError = ErrorType<null>>(
 userId: string,
    classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户在指定班级的成员记录
 */

export function useClassMembersControllerFindByUserAndClass<TData = Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError = ErrorType<null>>(
 userId: string,
    classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindByUserAndClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassMembersControllerFindByUserAndClassQueryOptions(userId,classId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 删除指定用户在指定班级的成员记录
 */
export const classMembersControllerRemoveByUserAndClass = (
    userId: string,
    classId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/class-members/user/${userId}/class/${classId}`, method: 'DELETE'
    },
      options);
    }
  


export const getClassMembersControllerRemoveByUserAndClassMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerRemoveByUserAndClass>>, TError,{userId: string;classId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerRemoveByUserAndClass>>, TError,{userId: string;classId: string}, TContext> => {

const mutationKey = ['classMembersControllerRemoveByUserAndClass'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classMembersControllerRemoveByUserAndClass>>, {userId: string;classId: string}> = (props) => {
          const {userId,classId} = props ?? {};

          return  classMembersControllerRemoveByUserAndClass(userId,classId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassMembersControllerRemoveByUserAndClassMutationResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerRemoveByUserAndClass>>>
    
    export type ClassMembersControllerRemoveByUserAndClassMutationError = ErrorType<null>

    /**
 * @summary 删除指定用户在指定班级的成员记录
 */
export const useClassMembersControllerRemoveByUserAndClass = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerRemoveByUserAndClass>>, TError,{userId: string;classId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classMembersControllerRemoveByUserAndClass>>,
        TError,
        {userId: string;classId: string},
        TContext
      > => {

      const mutationOptions = getClassMembersControllerRemoveByUserAndClassMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取班级成员统计信息
 */
export const classMembersControllerGetClassMemberStats = (
    params?: ClassMembersControllerGetClassMemberStatsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/stats`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getClassMembersControllerGetClassMemberStatsQueryKey = (params?: ClassMembersControllerGetClassMemberStatsParams,) => {
    return [`/class-members/stats`, ...(params ? [params]: [])] as const;
    }

    
export const getClassMembersControllerGetClassMemberStatsQueryOptions = <TData = Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError = ErrorType<unknown>>(params?: ClassMembersControllerGetClassMemberStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassMembersControllerGetClassMemberStatsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>> = ({ signal }) => classMembersControllerGetClassMemberStats(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassMembersControllerGetClassMemberStatsQueryResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>>
export type ClassMembersControllerGetClassMemberStatsQueryError = ErrorType<unknown>


export function useClassMembersControllerGetClassMemberStats<TData = Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError = ErrorType<unknown>>(
 params: undefined |  ClassMembersControllerGetClassMemberStatsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerGetClassMemberStats<TData = Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError = ErrorType<unknown>>(
 params?: ClassMembersControllerGetClassMemberStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerGetClassMemberStats<TData = Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError = ErrorType<unknown>>(
 params?: ClassMembersControllerGetClassMemberStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取班级成员统计信息
 */

export function useClassMembersControllerGetClassMemberStats<TData = Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError = ErrorType<unknown>>(
 params?: ClassMembersControllerGetClassMemberStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerGetClassMemberStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassMembersControllerGetClassMemberStatsQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取班级成员记录详情
 */
export const classMembersControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/class-members/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getClassMembersControllerFindOneQueryKey = (id?: string,) => {
    return [`/class-members/${id}`] as const;
    }

    
export const getClassMembersControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassMembersControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classMembersControllerFindOne>>> = ({ signal }) => classMembersControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassMembersControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerFindOne>>>
export type ClassMembersControllerFindOneQueryError = ErrorType<null>


export function useClassMembersControllerFindOne<TData = Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindOne<TData = Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classMembersControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof classMembersControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassMembersControllerFindOne<TData = Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取班级成员记录详情
 */

export function useClassMembersControllerFindOne<TData = Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classMembersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassMembersControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新班级成员记录
 */
export const classMembersControllerUpdate = (
    id: string,
    classMembersControllerUpdateBody: BodyType<ClassMembersControllerUpdateBody>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/class-members/${id}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: classMembersControllerUpdateBody
    },
      options);
    }
  


export const getClassMembersControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerUpdate>>, TError,{id: string;data: BodyType<ClassMembersControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerUpdate>>, TError,{id: string;data: BodyType<ClassMembersControllerUpdateBody>}, TContext> => {

const mutationKey = ['classMembersControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classMembersControllerUpdate>>, {id: string;data: BodyType<ClassMembersControllerUpdateBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  classMembersControllerUpdate(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassMembersControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerUpdate>>>
    export type ClassMembersControllerUpdateMutationBody = BodyType<ClassMembersControllerUpdateBody>
    export type ClassMembersControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary 更新班级成员记录
 */
export const useClassMembersControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerUpdate>>, TError,{id: string;data: BodyType<ClassMembersControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classMembersControllerUpdate>>,
        TError,
        {id: string;data: BodyType<ClassMembersControllerUpdateBody>},
        TContext
      > => {

      const mutationOptions = getClassMembersControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除班级成员记录
 */
export const classMembersControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/class-members/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getClassMembersControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['classMembersControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classMembersControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  classMembersControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassMembersControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof classMembersControllerRemove>>>
    
    export type ClassMembersControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除班级成员记录
 */
export const useClassMembersControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classMembersControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classMembersControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getClassMembersControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    