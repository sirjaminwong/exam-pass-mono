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
  AddWrongQuestionDto,
  BulkMarkAsResolvedDto,
  BulkRemoveWrongQuestionsDto,
  CreateWrongQuestionDto,
  WrongQuestionDto,
  WrongQuestionsControllerBulkMarkAsResolved200,
  WrongQuestionsControllerBulkRemove200,
  WrongQuestionsControllerFindAllParams,
  WrongQuestionsControllerGetWrongQuestionStats200,
  WrongQuestionsControllerGetWrongQuestionStatsParams,
  WrongQuestionsControllerGetWrongQuestionsByType200,
  WrongQuestionsControllerUpdateBody
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType , BodyType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新的错题记录
 */
export const wrongQuestionsControllerCreate = (
    createWrongQuestionDto: BodyType<CreateWrongQuestionDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionDto>(
      {url: `/wrong-questions`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createWrongQuestionDto, signal
    },
      options);
    }
  


export const getWrongQuestionsControllerCreateMutationOptions = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerCreate>>, TError,{data: BodyType<CreateWrongQuestionDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerCreate>>, TError,{data: BodyType<CreateWrongQuestionDto>}, TContext> => {

const mutationKey = ['wrongQuestionsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerCreate>>, {data: BodyType<CreateWrongQuestionDto>}> = (props) => {
          const {data} = props ?? {};

          return  wrongQuestionsControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerCreate>>>
    export type WrongQuestionsControllerCreateMutationBody = BodyType<CreateWrongQuestionDto>
    export type WrongQuestionsControllerCreateMutationError = ErrorType<null | null>

    /**
 * @summary 创建新的错题记录
 */
export const useWrongQuestionsControllerCreate = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerCreate>>, TError,{data: BodyType<CreateWrongQuestionDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerCreate>>,
        TError,
        {data: BodyType<CreateWrongQuestionDto>},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取错题记录列表
 */
export const wrongQuestionsControllerFindAll = (
    params?: WrongQuestionsControllerFindAllParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionDto[]>(
      {url: `/wrong-questions`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getWrongQuestionsControllerFindAllQueryKey = (params?: WrongQuestionsControllerFindAllParams,) => {
    return [`/wrong-questions`, ...(params ? [params]: [])] as const;
    }

    
export const getWrongQuestionsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError = ErrorType<null>>(params?: WrongQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getWrongQuestionsControllerFindAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>> = ({ signal }) => wrongQuestionsControllerFindAll(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type WrongQuestionsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>>
export type WrongQuestionsControllerFindAllQueryError = ErrorType<null>


export function useWrongQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError = ErrorType<null>>(
 params: undefined |  WrongQuestionsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError = ErrorType<null>>(
 params?: WrongQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError = ErrorType<null>>(
 params?: WrongQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取错题记录列表
 */

export function useWrongQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError = ErrorType<null>>(
 params?: WrongQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getWrongQuestionsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 添加错题
 */
export const wrongQuestionsControllerAddWrongQuestion = (
    addWrongQuestionDto: BodyType<AddWrongQuestionDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionDto>(
      {url: `/wrong-questions/add`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: addWrongQuestionDto, signal
    },
      options);
    }
  


export const getWrongQuestionsControllerAddWrongQuestionMutationOptions = <TError = ErrorType<null | null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerAddWrongQuestion>>, TError,{data: BodyType<AddWrongQuestionDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerAddWrongQuestion>>, TError,{data: BodyType<AddWrongQuestionDto>}, TContext> => {

const mutationKey = ['wrongQuestionsControllerAddWrongQuestion'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerAddWrongQuestion>>, {data: BodyType<AddWrongQuestionDto>}> = (props) => {
          const {data} = props ?? {};

          return  wrongQuestionsControllerAddWrongQuestion(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerAddWrongQuestionMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerAddWrongQuestion>>>
    export type WrongQuestionsControllerAddWrongQuestionMutationBody = BodyType<AddWrongQuestionDto>
    export type WrongQuestionsControllerAddWrongQuestionMutationError = ErrorType<null | null | null>

    /**
 * @summary 添加错题
 */
export const useWrongQuestionsControllerAddWrongQuestion = <TError = ErrorType<null | null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerAddWrongQuestion>>, TError,{data: BodyType<AddWrongQuestionDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerAddWrongQuestion>>,
        TError,
        {data: BodyType<AddWrongQuestionDto>},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerAddWrongQuestionMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 批量标记为已解决
 */
export const wrongQuestionsControllerBulkMarkAsResolved = (
    bulkMarkAsResolvedDto: BodyType<BulkMarkAsResolvedDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionsControllerBulkMarkAsResolved200>(
      {url: `/wrong-questions/bulk-resolve`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: bulkMarkAsResolvedDto, signal
    },
      options);
    }
  


export const getWrongQuestionsControllerBulkMarkAsResolvedMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerBulkMarkAsResolved>>, TError,{data: BodyType<BulkMarkAsResolvedDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerBulkMarkAsResolved>>, TError,{data: BodyType<BulkMarkAsResolvedDto>}, TContext> => {

const mutationKey = ['wrongQuestionsControllerBulkMarkAsResolved'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerBulkMarkAsResolved>>, {data: BodyType<BulkMarkAsResolvedDto>}> = (props) => {
          const {data} = props ?? {};

          return  wrongQuestionsControllerBulkMarkAsResolved(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerBulkMarkAsResolvedMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerBulkMarkAsResolved>>>
    export type WrongQuestionsControllerBulkMarkAsResolvedMutationBody = BodyType<BulkMarkAsResolvedDto>
    export type WrongQuestionsControllerBulkMarkAsResolvedMutationError = ErrorType<null>

    /**
 * @summary 批量标记为已解决
 */
export const useWrongQuestionsControllerBulkMarkAsResolved = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerBulkMarkAsResolved>>, TError,{data: BodyType<BulkMarkAsResolvedDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerBulkMarkAsResolved>>,
        TError,
        {data: BodyType<BulkMarkAsResolvedDto>},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerBulkMarkAsResolvedMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 批量删除错题记录
 */
export const wrongQuestionsControllerBulkRemove = (
    bulkRemoveWrongQuestionsDto: BodyType<BulkRemoveWrongQuestionsDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionsControllerBulkRemove200>(
      {url: `/wrong-questions/bulk-remove`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: bulkRemoveWrongQuestionsDto, signal
    },
      options);
    }
  


export const getWrongQuestionsControllerBulkRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerBulkRemove>>, TError,{data: BodyType<BulkRemoveWrongQuestionsDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerBulkRemove>>, TError,{data: BodyType<BulkRemoveWrongQuestionsDto>}, TContext> => {

const mutationKey = ['wrongQuestionsControllerBulkRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerBulkRemove>>, {data: BodyType<BulkRemoveWrongQuestionsDto>}> = (props) => {
          const {data} = props ?? {};

          return  wrongQuestionsControllerBulkRemove(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerBulkRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerBulkRemove>>>
    export type WrongQuestionsControllerBulkRemoveMutationBody = BodyType<BulkRemoveWrongQuestionsDto>
    export type WrongQuestionsControllerBulkRemoveMutationError = ErrorType<null>

    /**
 * @summary 批量删除错题记录
 */
export const useWrongQuestionsControllerBulkRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerBulkRemove>>, TError,{data: BodyType<BulkRemoveWrongQuestionsDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerBulkRemove>>,
        TError,
        {data: BodyType<BulkRemoveWrongQuestionsDto>},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerBulkRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取指定用户的错题记录
 */
export const wrongQuestionsControllerFindByUser = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionDto[]>(
      {url: `/wrong-questions/user/${userId}`, method: 'GET', signal
    },
      options);
    }
  

export const getWrongQuestionsControllerFindByUserQueryKey = (userId?: string,) => {
    return [`/wrong-questions/user/${userId}`] as const;
    }

    
export const getWrongQuestionsControllerFindByUserQueryOptions = <TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError = ErrorType<null>>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getWrongQuestionsControllerFindByUserQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>> = ({ signal }) => wrongQuestionsControllerFindByUser(userId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type WrongQuestionsControllerFindByUserQueryResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>>
export type WrongQuestionsControllerFindByUserQueryError = ErrorType<null>


export function useWrongQuestionsControllerFindByUser<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError = ErrorType<null>>(
 userId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindByUser<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindByUser<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户的错题记录
 */

export function useWrongQuestionsControllerFindByUser<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getWrongQuestionsControllerFindByUserQueryOptions(userId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定题目的错题记录
 */
export const wrongQuestionsControllerFindByQuestion = (
    questionId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionDto[]>(
      {url: `/wrong-questions/question/${questionId}`, method: 'GET', signal
    },
      options);
    }
  

export const getWrongQuestionsControllerFindByQuestionQueryKey = (questionId?: string,) => {
    return [`/wrong-questions/question/${questionId}`] as const;
    }

    
export const getWrongQuestionsControllerFindByQuestionQueryOptions = <TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError = ErrorType<null>>(questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getWrongQuestionsControllerFindByQuestionQueryKey(questionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>> = ({ signal }) => wrongQuestionsControllerFindByQuestion(questionId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(questionId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type WrongQuestionsControllerFindByQuestionQueryResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>>
export type WrongQuestionsControllerFindByQuestionQueryError = ErrorType<null>


export function useWrongQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError = ErrorType<null>>(
 questionId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError = ErrorType<null>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError = ErrorType<null>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定题目的错题记录
 */

export function useWrongQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError = ErrorType<null>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getWrongQuestionsControllerFindByQuestionQueryOptions(questionId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定用户的未解决错题
 */
export const wrongQuestionsControllerFindUnresolved = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionDto[]>(
      {url: `/wrong-questions/user/${userId}/unresolved`, method: 'GET', signal
    },
      options);
    }
  

export const getWrongQuestionsControllerFindUnresolvedQueryKey = (userId?: string,) => {
    return [`/wrong-questions/user/${userId}/unresolved`] as const;
    }

    
export const getWrongQuestionsControllerFindUnresolvedQueryOptions = <TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError = ErrorType<null>>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getWrongQuestionsControllerFindUnresolvedQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>> = ({ signal }) => wrongQuestionsControllerFindUnresolved(userId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type WrongQuestionsControllerFindUnresolvedQueryResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>>
export type WrongQuestionsControllerFindUnresolvedQueryError = ErrorType<null>


export function useWrongQuestionsControllerFindUnresolved<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError = ErrorType<null>>(
 userId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindUnresolved<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindUnresolved<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户的未解决错题
 */

export function useWrongQuestionsControllerFindUnresolved<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindUnresolved>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getWrongQuestionsControllerFindUnresolvedQueryOptions(userId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取错题统计信息
 */
export const wrongQuestionsControllerGetWrongQuestionStats = (
    params?: WrongQuestionsControllerGetWrongQuestionStatsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionsControllerGetWrongQuestionStats200>(
      {url: `/wrong-questions/stats`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getWrongQuestionsControllerGetWrongQuestionStatsQueryKey = (params?: WrongQuestionsControllerGetWrongQuestionStatsParams,) => {
    return [`/wrong-questions/stats`, ...(params ? [params]: [])] as const;
    }

    
export const getWrongQuestionsControllerGetWrongQuestionStatsQueryOptions = <TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError = ErrorType<null>>(params?: WrongQuestionsControllerGetWrongQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getWrongQuestionsControllerGetWrongQuestionStatsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>> = ({ signal }) => wrongQuestionsControllerGetWrongQuestionStats(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type WrongQuestionsControllerGetWrongQuestionStatsQueryResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>>
export type WrongQuestionsControllerGetWrongQuestionStatsQueryError = ErrorType<null>


export function useWrongQuestionsControllerGetWrongQuestionStats<TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError = ErrorType<null>>(
 params: undefined |  WrongQuestionsControllerGetWrongQuestionStatsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerGetWrongQuestionStats<TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError = ErrorType<null>>(
 params?: WrongQuestionsControllerGetWrongQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerGetWrongQuestionStats<TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError = ErrorType<null>>(
 params?: WrongQuestionsControllerGetWrongQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取错题统计信息
 */

export function useWrongQuestionsControllerGetWrongQuestionStats<TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError = ErrorType<null>>(
 params?: WrongQuestionsControllerGetWrongQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getWrongQuestionsControllerGetWrongQuestionStatsQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定用户按题型分类的错题统计
 */
export const wrongQuestionsControllerGetWrongQuestionsByType = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionsControllerGetWrongQuestionsByType200>(
      {url: `/wrong-questions/user/${userId}/stats-by-type`, method: 'GET', signal
    },
      options);
    }
  

export const getWrongQuestionsControllerGetWrongQuestionsByTypeQueryKey = (userId?: string,) => {
    return [`/wrong-questions/user/${userId}/stats-by-type`] as const;
    }

    
export const getWrongQuestionsControllerGetWrongQuestionsByTypeQueryOptions = <TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError = ErrorType<null>>(userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getWrongQuestionsControllerGetWrongQuestionsByTypeQueryKey(userId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>> = ({ signal }) => wrongQuestionsControllerGetWrongQuestionsByType(userId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(userId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type WrongQuestionsControllerGetWrongQuestionsByTypeQueryResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>>
export type WrongQuestionsControllerGetWrongQuestionsByTypeQueryError = ErrorType<null>


export function useWrongQuestionsControllerGetWrongQuestionsByType<TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError = ErrorType<null>>(
 userId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerGetWrongQuestionsByType<TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerGetWrongQuestionsByType<TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定用户按题型分类的错题统计
 */

export function useWrongQuestionsControllerGetWrongQuestionsByType<TData = Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError = ErrorType<null>>(
 userId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerGetWrongQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getWrongQuestionsControllerGetWrongQuestionsByTypeQueryOptions(userId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取错题记录详情
 */
export const wrongQuestionsControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<WrongQuestionDto>(
      {url: `/wrong-questions/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getWrongQuestionsControllerFindOneQueryKey = (id?: string,) => {
    return [`/wrong-questions/${id}`] as const;
    }

    
export const getWrongQuestionsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getWrongQuestionsControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>> = ({ signal }) => wrongQuestionsControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type WrongQuestionsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>>
export type WrongQuestionsControllerFindOneQueryError = ErrorType<null>


export function useWrongQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useWrongQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取错题记录详情
 */

export function useWrongQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof wrongQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getWrongQuestionsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新错题记录
 */
export const wrongQuestionsControllerUpdate = (
    id: string,
    wrongQuestionsControllerUpdateBody: BodyType<WrongQuestionsControllerUpdateBody>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<WrongQuestionDto>(
      {url: `/wrong-questions/${id}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: wrongQuestionsControllerUpdateBody
    },
      options);
    }
  


export const getWrongQuestionsControllerUpdateMutationOptions = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerUpdate>>, TError,{id: string;data: BodyType<WrongQuestionsControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerUpdate>>, TError,{id: string;data: BodyType<WrongQuestionsControllerUpdateBody>}, TContext> => {

const mutationKey = ['wrongQuestionsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerUpdate>>, {id: string;data: BodyType<WrongQuestionsControllerUpdateBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  wrongQuestionsControllerUpdate(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerUpdate>>>
    export type WrongQuestionsControllerUpdateMutationBody = BodyType<WrongQuestionsControllerUpdateBody>
    export type WrongQuestionsControllerUpdateMutationError = ErrorType<null | null>

    /**
 * @summary 更新错题记录
 */
export const useWrongQuestionsControllerUpdate = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerUpdate>>, TError,{id: string;data: BodyType<WrongQuestionsControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerUpdate>>,
        TError,
        {id: string;data: BodyType<WrongQuestionsControllerUpdateBody>},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除错题记录
 */
export const wrongQuestionsControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<WrongQuestionDto>(
      {url: `/wrong-questions/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getWrongQuestionsControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['wrongQuestionsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  wrongQuestionsControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerRemove>>>
    
    export type WrongQuestionsControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除错题记录
 */
export const useWrongQuestionsControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 标记错题为已解决
 */
export const wrongQuestionsControllerMarkAsResolved = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<WrongQuestionDto>(
      {url: `/wrong-questions/${id}/resolve`, method: 'PATCH'
    },
      options);
    }
  


export const getWrongQuestionsControllerMarkAsResolvedMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsResolved>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsResolved>>, TError,{id: string}, TContext> => {

const mutationKey = ['wrongQuestionsControllerMarkAsResolved'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsResolved>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  wrongQuestionsControllerMarkAsResolved(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerMarkAsResolvedMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsResolved>>>
    
    export type WrongQuestionsControllerMarkAsResolvedMutationError = ErrorType<null>

    /**
 * @summary 标记错题为已解决
 */
export const useWrongQuestionsControllerMarkAsResolved = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsResolved>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsResolved>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerMarkAsResolvedMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 标记错题为未解决
 */
export const wrongQuestionsControllerMarkAsUnresolved = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<WrongQuestionDto>(
      {url: `/wrong-questions/${id}/unresolve`, method: 'PATCH'
    },
      options);
    }
  


export const getWrongQuestionsControllerMarkAsUnresolvedMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsUnresolved>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsUnresolved>>, TError,{id: string}, TContext> => {

const mutationKey = ['wrongQuestionsControllerMarkAsUnresolved'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsUnresolved>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  wrongQuestionsControllerMarkAsUnresolved(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerMarkAsUnresolvedMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsUnresolved>>>
    
    export type WrongQuestionsControllerMarkAsUnresolvedMutationError = ErrorType<null>

    /**
 * @summary 标记错题为未解决
 */
export const useWrongQuestionsControllerMarkAsUnresolved = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsUnresolved>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerMarkAsUnresolved>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerMarkAsUnresolvedMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除指定用户的指定题目错题记录
 */
export const wrongQuestionsControllerRemoveByUserAndQuestion = (
    userId: string,
    questionId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<WrongQuestionDto>(
      {url: `/wrong-questions/user/${userId}/question/${questionId}`, method: 'DELETE'
    },
      options);
    }
  


export const getWrongQuestionsControllerRemoveByUserAndQuestionMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerRemoveByUserAndQuestion>>, TError,{userId: string;questionId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerRemoveByUserAndQuestion>>, TError,{userId: string;questionId: string}, TContext> => {

const mutationKey = ['wrongQuestionsControllerRemoveByUserAndQuestion'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof wrongQuestionsControllerRemoveByUserAndQuestion>>, {userId: string;questionId: string}> = (props) => {
          const {userId,questionId} = props ?? {};

          return  wrongQuestionsControllerRemoveByUserAndQuestion(userId,questionId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type WrongQuestionsControllerRemoveByUserAndQuestionMutationResult = NonNullable<Awaited<ReturnType<typeof wrongQuestionsControllerRemoveByUserAndQuestion>>>
    
    export type WrongQuestionsControllerRemoveByUserAndQuestionMutationError = ErrorType<null>

    /**
 * @summary 删除指定用户的指定题目错题记录
 */
export const useWrongQuestionsControllerRemoveByUserAndQuestion = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof wrongQuestionsControllerRemoveByUserAndQuestion>>, TError,{userId: string;questionId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof wrongQuestionsControllerRemoveByUserAndQuestion>>,
        TError,
        {userId: string;questionId: string},
        TContext
      > => {

      const mutationOptions = getWrongQuestionsControllerRemoveByUserAndQuestionMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    