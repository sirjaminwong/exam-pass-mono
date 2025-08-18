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
  ExamAttemptsControllerFindAllParams
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新的考试记录
 */
export const examAttemptsControllerCreate = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts`, method: 'POST', signal
    },
      options);
    }
  


export const getExamAttemptsControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerCreate>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerCreate>>, TError,void, TContext> => {

const mutationKey = ['examAttemptsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examAttemptsControllerCreate>>, void> = () => {
          

          return  examAttemptsControllerCreate(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamAttemptsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerCreate>>>
    
    export type ExamAttemptsControllerCreateMutationError = ErrorType<null>

    /**
 * @summary 创建新的考试记录
 */
export const useExamAttemptsControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerCreate>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examAttemptsControllerCreate>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getExamAttemptsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取考试记录列表
 */
export const examAttemptsControllerFindAll = (
    params?: ExamAttemptsControllerFindAllParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getExamAttemptsControllerFindAllQueryKey = (params?: ExamAttemptsControllerFindAllParams,) => {
    return [`/exam-attempts`, ...(params ? [params]: [])] as const;
    }

    
export const getExamAttemptsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError = ErrorType<unknown>>(params?: ExamAttemptsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamAttemptsControllerFindAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examAttemptsControllerFindAll>>> = ({ signal }) => examAttemptsControllerFindAll(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamAttemptsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerFindAll>>>
export type ExamAttemptsControllerFindAllQueryError = ErrorType<unknown>


export function useExamAttemptsControllerFindAll<TData = Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  ExamAttemptsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerFindAll<TData = Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamAttemptsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerFindAll<TData = Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamAttemptsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取考试记录列表
 */

export function useExamAttemptsControllerFindAll<TData = Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamAttemptsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamAttemptsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 开始考试
 */
export const examAttemptsControllerStartExam = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/start`, method: 'POST', signal
    },
      options);
    }
  


export const getExamAttemptsControllerStartExamMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerStartExam>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerStartExam>>, TError,void, TContext> => {

const mutationKey = ['examAttemptsControllerStartExam'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examAttemptsControllerStartExam>>, void> = () => {
          

          return  examAttemptsControllerStartExam(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamAttemptsControllerStartExamMutationResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerStartExam>>>
    
    export type ExamAttemptsControllerStartExamMutationError = ErrorType<null>

    /**
 * @summary 开始考试
 */
export const useExamAttemptsControllerStartExam = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerStartExam>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examAttemptsControllerStartExam>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getExamAttemptsControllerStartExamMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取指定用户的考试记录
 */
export const examAttemptsControllerFindByUser = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/user/${userId}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamAttemptsControllerFindByUserQueryKey = (userId?: string,) => {
    return [`/exam-attempts/user/${userId}`] as const;
    }

    
export const getExamAttemptsControllerFindByUserQueryOptions = <TData = Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError = ErrorType<unknown>>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamAttemptsControllerFindByUserQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>> = ({ signal }) => examAttemptsControllerFindByUser(userId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamAttemptsControllerFindByUserQueryResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>>
export type ExamAttemptsControllerFindByUserQueryError = ErrorType<unknown>


export function useExamAttemptsControllerFindByUser<TData = Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerFindByUser<TData = Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerFindByUser<TData = Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户的考试记录
 */

export function useExamAttemptsControllerFindByUser<TData = Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamAttemptsControllerFindByUserQueryOptions(userId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定试卷的考试记录
 */
export const examAttemptsControllerFindByExam = (
    examId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/exam/${examId}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamAttemptsControllerFindByExamQueryKey = (examId?: string,) => {
    return [`/exam-attempts/exam/${examId}`] as const;
    }

    
export const getExamAttemptsControllerFindByExamQueryOptions = <TData = Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError = ErrorType<unknown>>(examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamAttemptsControllerFindByExamQueryKey(examId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>> = ({ signal }) => examAttemptsControllerFindByExam(examId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(examId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamAttemptsControllerFindByExamQueryResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>>
export type ExamAttemptsControllerFindByExamQueryError = ErrorType<unknown>


export function useExamAttemptsControllerFindByExam<TData = Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError = ErrorType<unknown>>(
 examId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerFindByExam<TData = Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerFindByExam<TData = Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定试卷的考试记录
 */

export function useExamAttemptsControllerFindByExam<TData = Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindByExam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamAttemptsControllerFindByExamQueryOptions(examId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取用户考试统计信息
 */
export const examAttemptsControllerGetUserStats = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/user/${userId}/stats`, method: 'GET', signal
    },
      options);
    }
  

export const getExamAttemptsControllerGetUserStatsQueryKey = (userId?: string,) => {
    return [`/exam-attempts/user/${userId}/stats`] as const;
    }

    
export const getExamAttemptsControllerGetUserStatsQueryOptions = <TData = Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError = ErrorType<unknown>>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamAttemptsControllerGetUserStatsQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>> = ({ signal }) => examAttemptsControllerGetUserStats(userId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamAttemptsControllerGetUserStatsQueryResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>>
export type ExamAttemptsControllerGetUserStatsQueryError = ErrorType<unknown>


export function useExamAttemptsControllerGetUserStats<TData = Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError = ErrorType<unknown>>(
 userId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerGetUserStats<TData = Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerGetUserStats<TData = Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取用户考试统计信息
 */

export function useExamAttemptsControllerGetUserStats<TData = Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetUserStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamAttemptsControllerGetUserStatsQueryOptions(userId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取考试记录详情
 */
export const examAttemptsControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamAttemptsControllerFindOneQueryKey = (id?: string,) => {
    return [`/exam-attempts/${id}`] as const;
    }

    
export const getExamAttemptsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamAttemptsControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examAttemptsControllerFindOne>>> = ({ signal }) => examAttemptsControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamAttemptsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerFindOne>>>
export type ExamAttemptsControllerFindOneQueryError = ErrorType<null>


export function useExamAttemptsControllerFindOne<TData = Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerFindOne<TData = Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerFindOne<TData = Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取考试记录详情
 */

export function useExamAttemptsControllerFindOne<TData = Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamAttemptsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新考试记录
 */
export const examAttemptsControllerUpdate = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/${id}`, method: 'PATCH'
    },
      options);
    }
  


export const getExamAttemptsControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerUpdate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerUpdate>>, TError,{id: string}, TContext> => {

const mutationKey = ['examAttemptsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examAttemptsControllerUpdate>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  examAttemptsControllerUpdate(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamAttemptsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerUpdate>>>
    
    export type ExamAttemptsControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary 更新考试记录
 */
export const useExamAttemptsControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerUpdate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examAttemptsControllerUpdate>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getExamAttemptsControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除考试记录
 */
export const examAttemptsControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getExamAttemptsControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['examAttemptsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examAttemptsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  examAttemptsControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamAttemptsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerRemove>>>
    
    export type ExamAttemptsControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除考试记录
 */
export const useExamAttemptsControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examAttemptsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getExamAttemptsControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取考试记录统计信息
 */
export const examAttemptsControllerGetAttemptStats = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/${id}/stats`, method: 'GET', signal
    },
      options);
    }
  

export const getExamAttemptsControllerGetAttemptStatsQueryKey = (id?: string,) => {
    return [`/exam-attempts/${id}/stats`] as const;
    }

    
export const getExamAttemptsControllerGetAttemptStatsQueryOptions = <TData = Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamAttemptsControllerGetAttemptStatsQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>> = ({ signal }) => examAttemptsControllerGetAttemptStats(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamAttemptsControllerGetAttemptStatsQueryResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>>
export type ExamAttemptsControllerGetAttemptStatsQueryError = ErrorType<null>


export function useExamAttemptsControllerGetAttemptStats<TData = Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerGetAttemptStats<TData = Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>,
          TError,
          Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamAttemptsControllerGetAttemptStats<TData = Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取考试记录统计信息
 */

export function useExamAttemptsControllerGetAttemptStats<TData = Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examAttemptsControllerGetAttemptStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamAttemptsControllerGetAttemptStatsQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 完成考试
 */
export const examAttemptsControllerCompleteAttempt = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exam-attempts/${id}/complete`, method: 'PATCH'
    },
      options);
    }
  


export const getExamAttemptsControllerCompleteAttemptMutationOptions = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerCompleteAttempt>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerCompleteAttempt>>, TError,{id: string}, TContext> => {

const mutationKey = ['examAttemptsControllerCompleteAttempt'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examAttemptsControllerCompleteAttempt>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  examAttemptsControllerCompleteAttempt(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamAttemptsControllerCompleteAttemptMutationResult = NonNullable<Awaited<ReturnType<typeof examAttemptsControllerCompleteAttempt>>>
    
    export type ExamAttemptsControllerCompleteAttemptMutationError = ErrorType<null | null>

    /**
 * @summary 完成考试
 */
export const useExamAttemptsControllerCompleteAttempt = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examAttemptsControllerCompleteAttempt>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examAttemptsControllerCompleteAttempt>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getExamAttemptsControllerCompleteAttemptMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    