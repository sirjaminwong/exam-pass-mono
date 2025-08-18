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
  FavoriteQuestionsControllerFindAllParams,
  FavoriteQuestionsControllerGetFavoriteQuestionStatsParams,
  FavoriteQuestionsControllerGetRecentFavoritesParams,
  FavoriteQuestionsControllerSearchFavoriteQuestionsParams
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新的收藏题目记录
 */
export const favoriteQuestionsControllerCreate = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions`, method: 'POST', signal
    },
      options);
    }
  


export const getFavoriteQuestionsControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerCreate>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerCreate>>, TError,void, TContext> => {

const mutationKey = ['favoriteQuestionsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerCreate>>, void> = () => {
          

          return  favoriteQuestionsControllerCreate(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type FavoriteQuestionsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerCreate>>>
    
    export type FavoriteQuestionsControllerCreateMutationError = ErrorType<null>

    /**
 * @summary 创建新的收藏题目记录
 */
export const useFavoriteQuestionsControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerCreate>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof favoriteQuestionsControllerCreate>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getFavoriteQuestionsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取收藏题目记录列表
 */
export const favoriteQuestionsControllerFindAll = (
    params?: FavoriteQuestionsControllerFindAllParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getFavoriteQuestionsControllerFindAllQueryKey = (params?: FavoriteQuestionsControllerFindAllParams,) => {
    return [`/favorite-questions`, ...(params ? [params]: [])] as const;
    }

    
export const getFavoriteQuestionsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(params?: FavoriteQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFavoriteQuestionsControllerFindAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>> = ({ signal }) => favoriteQuestionsControllerFindAll(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FavoriteQuestionsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>>
export type FavoriteQuestionsControllerFindAllQueryError = ErrorType<unknown>


export function useFavoriteQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  FavoriteQuestionsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: FavoriteQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: FavoriteQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取收藏题目记录列表
 */

export function useFavoriteQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: FavoriteQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFavoriteQuestionsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 添加收藏题目
 */
export const favoriteQuestionsControllerAddFavoriteQuestion = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/add`, method: 'POST', signal
    },
      options);
    }
  


export const getFavoriteQuestionsControllerAddFavoriteQuestionMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerAddFavoriteQuestion>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerAddFavoriteQuestion>>, TError,void, TContext> => {

const mutationKey = ['favoriteQuestionsControllerAddFavoriteQuestion'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerAddFavoriteQuestion>>, void> = () => {
          

          return  favoriteQuestionsControllerAddFavoriteQuestion(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type FavoriteQuestionsControllerAddFavoriteQuestionMutationResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerAddFavoriteQuestion>>>
    
    export type FavoriteQuestionsControllerAddFavoriteQuestionMutationError = ErrorType<null>

    /**
 * @summary 添加收藏题目
 */
export const useFavoriteQuestionsControllerAddFavoriteQuestion = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerAddFavoriteQuestion>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof favoriteQuestionsControllerAddFavoriteQuestion>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getFavoriteQuestionsControllerAddFavoriteQuestionMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 批量删除收藏题目记录
 */
export const favoriteQuestionsControllerBulkRemove = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/bulk-remove`, method: 'POST', signal
    },
      options);
    }
  


export const getFavoriteQuestionsControllerBulkRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerBulkRemove>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerBulkRemove>>, TError,void, TContext> => {

const mutationKey = ['favoriteQuestionsControllerBulkRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerBulkRemove>>, void> = () => {
          

          return  favoriteQuestionsControllerBulkRemove(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type FavoriteQuestionsControllerBulkRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerBulkRemove>>>
    
    export type FavoriteQuestionsControllerBulkRemoveMutationError = ErrorType<null>

    /**
 * @summary 批量删除收藏题目记录
 */
export const useFavoriteQuestionsControllerBulkRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerBulkRemove>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof favoriteQuestionsControllerBulkRemove>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getFavoriteQuestionsControllerBulkRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取指定用户的收藏题目记录
 */
export const favoriteQuestionsControllerFindByUser = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/user/${userId}`, method: 'GET', signal
    },
      options);
    }
  

export const getFavoriteQuestionsControllerFindByUserQueryKey = (userId?: string,) => {
    return [`/favorite-questions/user/${userId}`] as const;
    }

    
export const getFavoriteQuestionsControllerFindByUserQueryOptions = <TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError = ErrorType<unknown>>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFavoriteQuestionsControllerFindByUserQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>> = ({ signal }) => favoriteQuestionsControllerFindByUser(userId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FavoriteQuestionsControllerFindByUserQueryResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>>
export type FavoriteQuestionsControllerFindByUserQueryError = ErrorType<unknown>


export function useFavoriteQuestionsControllerFindByUser<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerFindByUser<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerFindByUser<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户的收藏题目记录
 */

export function useFavoriteQuestionsControllerFindByUser<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFavoriteQuestionsControllerFindByUserQueryOptions(userId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定题目的收藏记录
 */
export const favoriteQuestionsControllerFindByQuestion = (
    questionId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/question/${questionId}`, method: 'GET', signal
    },
      options);
    }
  

export const getFavoriteQuestionsControllerFindByQuestionQueryKey = (questionId?: string,) => {
    return [`/favorite-questions/question/${questionId}`] as const;
    }

    
export const getFavoriteQuestionsControllerFindByQuestionQueryOptions = <TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFavoriteQuestionsControllerFindByQuestionQueryKey(questionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>> = ({ signal }) => favoriteQuestionsControllerFindByQuestion(questionId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(questionId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FavoriteQuestionsControllerFindByQuestionQueryResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>>
export type FavoriteQuestionsControllerFindByQuestionQueryError = ErrorType<unknown>


export function useFavoriteQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定题目的收藏记录
 */

export function useFavoriteQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFavoriteQuestionsControllerFindByQuestionQueryOptions(questionId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定用户的最近收藏题目
 */
export const favoriteQuestionsControllerGetRecentFavorites = (
    userId: string,
    params?: FavoriteQuestionsControllerGetRecentFavoritesParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/user/${userId}/recent`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getFavoriteQuestionsControllerGetRecentFavoritesQueryKey = (userId?: string,
    params?: FavoriteQuestionsControllerGetRecentFavoritesParams,) => {
    return [`/favorite-questions/user/${userId}/recent`, ...(params ? [params]: [])] as const;
    }

    
export const getFavoriteQuestionsControllerGetRecentFavoritesQueryOptions = <TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError = ErrorType<unknown>>(userId: string,
    params?: FavoriteQuestionsControllerGetRecentFavoritesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFavoriteQuestionsControllerGetRecentFavoritesQueryKey(userId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>> = ({ signal }) => favoriteQuestionsControllerGetRecentFavorites(userId,params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FavoriteQuestionsControllerGetRecentFavoritesQueryResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>>
export type FavoriteQuestionsControllerGetRecentFavoritesQueryError = ErrorType<unknown>


export function useFavoriteQuestionsControllerGetRecentFavorites<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError = ErrorType<unknown>>(
 userId: string,
    params: undefined |  FavoriteQuestionsControllerGetRecentFavoritesParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerGetRecentFavorites<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError = ErrorType<unknown>>(
 userId: string,
    params?: FavoriteQuestionsControllerGetRecentFavoritesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerGetRecentFavorites<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError = ErrorType<unknown>>(
 userId: string,
    params?: FavoriteQuestionsControllerGetRecentFavoritesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户的最近收藏题目
 */

export function useFavoriteQuestionsControllerGetRecentFavorites<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError = ErrorType<unknown>>(
 userId: string,
    params?: FavoriteQuestionsControllerGetRecentFavoritesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetRecentFavorites>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFavoriteQuestionsControllerGetRecentFavoritesQueryOptions(userId,params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 搜索指定用户的收藏题目
 */
export const favoriteQuestionsControllerSearchFavoriteQuestions = (
    userId: string,
    params: FavoriteQuestionsControllerSearchFavoriteQuestionsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/user/${userId}/search`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getFavoriteQuestionsControllerSearchFavoriteQuestionsQueryKey = (userId?: string,
    params?: FavoriteQuestionsControllerSearchFavoriteQuestionsParams,) => {
    return [`/favorite-questions/user/${userId}/search`, ...(params ? [params]: [])] as const;
    }

    
export const getFavoriteQuestionsControllerSearchFavoriteQuestionsQueryOptions = <TData = Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError = ErrorType<unknown>>(userId: string,
    params: FavoriteQuestionsControllerSearchFavoriteQuestionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFavoriteQuestionsControllerSearchFavoriteQuestionsQueryKey(userId,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>> = ({ signal }) => favoriteQuestionsControllerSearchFavoriteQuestions(userId,params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FavoriteQuestionsControllerSearchFavoriteQuestionsQueryResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>>
export type FavoriteQuestionsControllerSearchFavoriteQuestionsQueryError = ErrorType<unknown>


export function useFavoriteQuestionsControllerSearchFavoriteQuestions<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError = ErrorType<unknown>>(
 userId: string,
    params: FavoriteQuestionsControllerSearchFavoriteQuestionsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerSearchFavoriteQuestions<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError = ErrorType<unknown>>(
 userId: string,
    params: FavoriteQuestionsControllerSearchFavoriteQuestionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerSearchFavoriteQuestions<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError = ErrorType<unknown>>(
 userId: string,
    params: FavoriteQuestionsControllerSearchFavoriteQuestionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 搜索指定用户的收藏题目
 */

export function useFavoriteQuestionsControllerSearchFavoriteQuestions<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError = ErrorType<unknown>>(
 userId: string,
    params: FavoriteQuestionsControllerSearchFavoriteQuestionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerSearchFavoriteQuestions>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFavoriteQuestionsControllerSearchFavoriteQuestionsQueryOptions(userId,params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取收藏题目统计信息
 */
export const favoriteQuestionsControllerGetFavoriteQuestionStats = (
    params?: FavoriteQuestionsControllerGetFavoriteQuestionStatsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/stats`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getFavoriteQuestionsControllerGetFavoriteQuestionStatsQueryKey = (params?: FavoriteQuestionsControllerGetFavoriteQuestionStatsParams,) => {
    return [`/favorite-questions/stats`, ...(params ? [params]: [])] as const;
    }

    
export const getFavoriteQuestionsControllerGetFavoriteQuestionStatsQueryOptions = <TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError = ErrorType<unknown>>(params?: FavoriteQuestionsControllerGetFavoriteQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFavoriteQuestionsControllerGetFavoriteQuestionStatsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>> = ({ signal }) => favoriteQuestionsControllerGetFavoriteQuestionStats(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FavoriteQuestionsControllerGetFavoriteQuestionStatsQueryResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>>
export type FavoriteQuestionsControllerGetFavoriteQuestionStatsQueryError = ErrorType<unknown>


export function useFavoriteQuestionsControllerGetFavoriteQuestionStats<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError = ErrorType<unknown>>(
 params: undefined |  FavoriteQuestionsControllerGetFavoriteQuestionStatsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerGetFavoriteQuestionStats<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError = ErrorType<unknown>>(
 params?: FavoriteQuestionsControllerGetFavoriteQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerGetFavoriteQuestionStats<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError = ErrorType<unknown>>(
 params?: FavoriteQuestionsControllerGetFavoriteQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取收藏题目统计信息
 */

export function useFavoriteQuestionsControllerGetFavoriteQuestionStats<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError = ErrorType<unknown>>(
 params?: FavoriteQuestionsControllerGetFavoriteQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFavoriteQuestionsControllerGetFavoriteQuestionStatsQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定用户按题型分类的收藏题目统计
 */
export const favoriteQuestionsControllerGetFavoriteQuestionsByType = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/user/${userId}/stats-by-type`, method: 'GET', signal
    },
      options);
    }
  

export const getFavoriteQuestionsControllerGetFavoriteQuestionsByTypeQueryKey = (userId?: string,) => {
    return [`/favorite-questions/user/${userId}/stats-by-type`] as const;
    }

    
export const getFavoriteQuestionsControllerGetFavoriteQuestionsByTypeQueryOptions = <TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError = ErrorType<unknown>>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFavoriteQuestionsControllerGetFavoriteQuestionsByTypeQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>> = ({ signal }) => favoriteQuestionsControllerGetFavoriteQuestionsByType(userId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FavoriteQuestionsControllerGetFavoriteQuestionsByTypeQueryResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>>
export type FavoriteQuestionsControllerGetFavoriteQuestionsByTypeQueryError = ErrorType<unknown>


export function useFavoriteQuestionsControllerGetFavoriteQuestionsByType<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError = ErrorType<unknown>>(
 userId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerGetFavoriteQuestionsByType<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerGetFavoriteQuestionsByType<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户按题型分类的收藏题目统计
 */

export function useFavoriteQuestionsControllerGetFavoriteQuestionsByType<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError = ErrorType<unknown>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerGetFavoriteQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFavoriteQuestionsControllerGetFavoriteQuestionsByTypeQueryOptions(userId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取收藏题目记录详情
 */
export const favoriteQuestionsControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getFavoriteQuestionsControllerFindOneQueryKey = (id?: string,) => {
    return [`/favorite-questions/${id}`] as const;
    }

    
export const getFavoriteQuestionsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFavoriteQuestionsControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>> = ({ signal }) => favoriteQuestionsControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FavoriteQuestionsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>>
export type FavoriteQuestionsControllerFindOneQueryError = ErrorType<null>


export function useFavoriteQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFavoriteQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取收藏题目记录详情
 */

export function useFavoriteQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFavoriteQuestionsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新收藏题目记录
 */
export const favoriteQuestionsControllerUpdate = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/${id}`, method: 'PATCH'
    },
      options);
    }
  


export const getFavoriteQuestionsControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdate>>, TError,{id: string}, TContext> => {

const mutationKey = ['favoriteQuestionsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdate>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  favoriteQuestionsControllerUpdate(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type FavoriteQuestionsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdate>>>
    
    export type FavoriteQuestionsControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary 更新收藏题目记录
 */
export const useFavoriteQuestionsControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof favoriteQuestionsControllerUpdate>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getFavoriteQuestionsControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除收藏题目记录
 */
export const favoriteQuestionsControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getFavoriteQuestionsControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['favoriteQuestionsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  favoriteQuestionsControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type FavoriteQuestionsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerRemove>>>
    
    export type FavoriteQuestionsControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除收藏题目记录
 */
export const useFavoriteQuestionsControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof favoriteQuestionsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getFavoriteQuestionsControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 更新收藏题目备注
 */
export const favoriteQuestionsControllerUpdateNote = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/${id}/note`, method: 'PATCH'
    },
      options);
    }
  


export const getFavoriteQuestionsControllerUpdateNoteMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdateNote>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdateNote>>, TError,{id: string}, TContext> => {

const mutationKey = ['favoriteQuestionsControllerUpdateNote'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdateNote>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  favoriteQuestionsControllerUpdateNote(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type FavoriteQuestionsControllerUpdateNoteMutationResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdateNote>>>
    
    export type FavoriteQuestionsControllerUpdateNoteMutationError = ErrorType<null>

    /**
 * @summary 更新收藏题目备注
 */
export const useFavoriteQuestionsControllerUpdateNote = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerUpdateNote>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof favoriteQuestionsControllerUpdateNote>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getFavoriteQuestionsControllerUpdateNoteMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除指定用户的指定题目收藏记录
 */
export const favoriteQuestionsControllerRemoveByUserAndQuestion = (
    userId: string,
    questionId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/favorite-questions/user/${userId}/question/${questionId}`, method: 'DELETE'
    },
      options);
    }
  


export const getFavoriteQuestionsControllerRemoveByUserAndQuestionMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerRemoveByUserAndQuestion>>, TError,{userId: string;questionId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerRemoveByUserAndQuestion>>, TError,{userId: string;questionId: string}, TContext> => {

const mutationKey = ['favoriteQuestionsControllerRemoveByUserAndQuestion'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof favoriteQuestionsControllerRemoveByUserAndQuestion>>, {userId: string;questionId: string}> = (props) => {
          const {userId,questionId} = props ?? {};

          return  favoriteQuestionsControllerRemoveByUserAndQuestion(userId,questionId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type FavoriteQuestionsControllerRemoveByUserAndQuestionMutationResult = NonNullable<Awaited<ReturnType<typeof favoriteQuestionsControllerRemoveByUserAndQuestion>>>
    
    export type FavoriteQuestionsControllerRemoveByUserAndQuestionMutationError = ErrorType<null>

    /**
 * @summary 删除指定用户的指定题目收藏记录
 */
export const useFavoriteQuestionsControllerRemoveByUserAndQuestion = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof favoriteQuestionsControllerRemoveByUserAndQuestion>>, TError,{userId: string;questionId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof favoriteQuestionsControllerRemoveByUserAndQuestion>>,
        TError,
        {userId: string;questionId: string},
        TContext
      > => {

      const mutationOptions = getFavoriteQuestionsControllerRemoveByUserAndQuestionMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    