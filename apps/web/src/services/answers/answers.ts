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
  AnswersControllerFindAllParams,
  AnswersControllerGetAnswerStatsParams
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新的答题记录
 */
export const answersControllerCreate = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/answers`, method: 'POST', signal
    },
      options);
    }
  


export const getAnswersControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerCreate>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof answersControllerCreate>>, TError,void, TContext> => {

const mutationKey = ['answersControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof answersControllerCreate>>, void> = () => {
          

          return  answersControllerCreate(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AnswersControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof answersControllerCreate>>>
    
    export type AnswersControllerCreateMutationError = ErrorType<null>

    /**
 * @summary 创建新的答题记录
 */
export const useAnswersControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerCreate>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof answersControllerCreate>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getAnswersControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取答题记录列表
 */
export const answersControllerFindAll = (
    params?: AnswersControllerFindAllParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/answers`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getAnswersControllerFindAllQueryKey = (params?: AnswersControllerFindAllParams,) => {
    return [`/answers`, ...(params ? [params]: [])] as const;
    }

    
export const getAnswersControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof answersControllerFindAll>>, TError = ErrorType<unknown>>(params?: AnswersControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAnswersControllerFindAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof answersControllerFindAll>>> = ({ signal }) => answersControllerFindAll(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AnswersControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof answersControllerFindAll>>>
export type AnswersControllerFindAllQueryError = ErrorType<unknown>


export function useAnswersControllerFindAll<TData = Awaited<ReturnType<typeof answersControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  AnswersControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof answersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerFindAll<TData = Awaited<ReturnType<typeof answersControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: AnswersControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof answersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerFindAll<TData = Awaited<ReturnType<typeof answersControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: AnswersControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取答题记录列表
 */

export function useAnswersControllerFindAll<TData = Awaited<ReturnType<typeof answersControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: AnswersControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAnswersControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 提交答案
 */
export const answersControllerSubmitAnswer = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/answers/submit`, method: 'POST', signal
    },
      options);
    }
  


export const getAnswersControllerSubmitAnswerMutationOptions = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerSubmitAnswer>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof answersControllerSubmitAnswer>>, TError,void, TContext> => {

const mutationKey = ['answersControllerSubmitAnswer'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof answersControllerSubmitAnswer>>, void> = () => {
          

          return  answersControllerSubmitAnswer(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AnswersControllerSubmitAnswerMutationResult = NonNullable<Awaited<ReturnType<typeof answersControllerSubmitAnswer>>>
    
    export type AnswersControllerSubmitAnswerMutationError = ErrorType<null | null>

    /**
 * @summary 提交答案
 */
export const useAnswersControllerSubmitAnswer = <TError = ErrorType<null | null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerSubmitAnswer>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof answersControllerSubmitAnswer>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getAnswersControllerSubmitAnswerMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 批量提交答案
 */
export const answersControllerBatchSubmitAnswers = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/answers/batch-submit`, method: 'POST', signal
    },
      options);
    }
  


export const getAnswersControllerBatchSubmitAnswersMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerBatchSubmitAnswers>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof answersControllerBatchSubmitAnswers>>, TError,void, TContext> => {

const mutationKey = ['answersControllerBatchSubmitAnswers'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof answersControllerBatchSubmitAnswers>>, void> = () => {
          

          return  answersControllerBatchSubmitAnswers(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AnswersControllerBatchSubmitAnswersMutationResult = NonNullable<Awaited<ReturnType<typeof answersControllerBatchSubmitAnswers>>>
    
    export type AnswersControllerBatchSubmitAnswersMutationError = ErrorType<null>

    /**
 * @summary 批量提交答案
 */
export const useAnswersControllerBatchSubmitAnswers = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerBatchSubmitAnswers>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof answersControllerBatchSubmitAnswers>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getAnswersControllerBatchSubmitAnswersMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取指定考试记录的所有答案
 */
export const answersControllerFindByAttempt = (
    attemptId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/answers/attempt/${attemptId}`, method: 'GET', signal
    },
      options);
    }
  

export const getAnswersControllerFindByAttemptQueryKey = (attemptId?: string,) => {
    return [`/answers/attempt/${attemptId}`] as const;
    }

    
export const getAnswersControllerFindByAttemptQueryOptions = <TData = Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError = ErrorType<unknown>>(attemptId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAnswersControllerFindByAttemptQueryKey(attemptId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof answersControllerFindByAttempt>>> = ({ signal }) => answersControllerFindByAttempt(attemptId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(attemptId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AnswersControllerFindByAttemptQueryResult = NonNullable<Awaited<ReturnType<typeof answersControllerFindByAttempt>>>
export type AnswersControllerFindByAttemptQueryError = ErrorType<unknown>


export function useAnswersControllerFindByAttempt<TData = Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError = ErrorType<unknown>>(
 attemptId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerFindByAttempt>>,
          TError,
          Awaited<ReturnType<typeof answersControllerFindByAttempt>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerFindByAttempt<TData = Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError = ErrorType<unknown>>(
 attemptId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerFindByAttempt>>,
          TError,
          Awaited<ReturnType<typeof answersControllerFindByAttempt>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerFindByAttempt<TData = Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError = ErrorType<unknown>>(
 attemptId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定考试记录的所有答案
 */

export function useAnswersControllerFindByAttempt<TData = Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError = ErrorType<unknown>>(
 attemptId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByAttempt>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAnswersControllerFindByAttemptQueryOptions(attemptId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定题目的所有答案
 */
export const answersControllerFindByQuestion = (
    questionId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/answers/question/${questionId}`, method: 'GET', signal
    },
      options);
    }
  

export const getAnswersControllerFindByQuestionQueryKey = (questionId?: string,) => {
    return [`/answers/question/${questionId}`] as const;
    }

    
export const getAnswersControllerFindByQuestionQueryOptions = <TData = Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError = ErrorType<unknown>>(questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAnswersControllerFindByQuestionQueryKey(questionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof answersControllerFindByQuestion>>> = ({ signal }) => answersControllerFindByQuestion(questionId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(questionId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AnswersControllerFindByQuestionQueryResult = NonNullable<Awaited<ReturnType<typeof answersControllerFindByQuestion>>>
export type AnswersControllerFindByQuestionQueryError = ErrorType<unknown>


export function useAnswersControllerFindByQuestion<TData = Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerFindByQuestion>>,
          TError,
          Awaited<ReturnType<typeof answersControllerFindByQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerFindByQuestion<TData = Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerFindByQuestion>>,
          TError,
          Awaited<ReturnType<typeof answersControllerFindByQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerFindByQuestion<TData = Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定题目的所有答案
 */

export function useAnswersControllerFindByQuestion<TData = Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAnswersControllerFindByQuestionQueryOptions(questionId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取答题统计信息
 */
export const answersControllerGetAnswerStats = (
    params?: AnswersControllerGetAnswerStatsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/answers/stats`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getAnswersControllerGetAnswerStatsQueryKey = (params?: AnswersControllerGetAnswerStatsParams,) => {
    return [`/answers/stats`, ...(params ? [params]: [])] as const;
    }

    
export const getAnswersControllerGetAnswerStatsQueryOptions = <TData = Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError = ErrorType<unknown>>(params?: AnswersControllerGetAnswerStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAnswersControllerGetAnswerStatsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof answersControllerGetAnswerStats>>> = ({ signal }) => answersControllerGetAnswerStats(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AnswersControllerGetAnswerStatsQueryResult = NonNullable<Awaited<ReturnType<typeof answersControllerGetAnswerStats>>>
export type AnswersControllerGetAnswerStatsQueryError = ErrorType<unknown>


export function useAnswersControllerGetAnswerStats<TData = Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError = ErrorType<unknown>>(
 params: undefined |  AnswersControllerGetAnswerStatsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerGetAnswerStats>>,
          TError,
          Awaited<ReturnType<typeof answersControllerGetAnswerStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerGetAnswerStats<TData = Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError = ErrorType<unknown>>(
 params?: AnswersControllerGetAnswerStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerGetAnswerStats>>,
          TError,
          Awaited<ReturnType<typeof answersControllerGetAnswerStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerGetAnswerStats<TData = Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError = ErrorType<unknown>>(
 params?: AnswersControllerGetAnswerStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取答题统计信息
 */

export function useAnswersControllerGetAnswerStats<TData = Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError = ErrorType<unknown>>(
 params?: AnswersControllerGetAnswerStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerGetAnswerStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAnswersControllerGetAnswerStatsQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取答题记录详情
 */
export const answersControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/answers/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getAnswersControllerFindOneQueryKey = (id?: string,) => {
    return [`/answers/${id}`] as const;
    }

    
export const getAnswersControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof answersControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAnswersControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof answersControllerFindOne>>> = ({ signal }) => answersControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AnswersControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof answersControllerFindOne>>>
export type AnswersControllerFindOneQueryError = ErrorType<null>


export function useAnswersControllerFindOne<TData = Awaited<ReturnType<typeof answersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof answersControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerFindOne<TData = Awaited<ReturnType<typeof answersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof answersControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof answersControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAnswersControllerFindOne<TData = Awaited<ReturnType<typeof answersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取答题记录详情
 */

export function useAnswersControllerFindOne<TData = Awaited<ReturnType<typeof answersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof answersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAnswersControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新答题记录
 */
export const answersControllerUpdate = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/answers/${id}`, method: 'PATCH'
    },
      options);
    }
  


export const getAnswersControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerUpdate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof answersControllerUpdate>>, TError,{id: string}, TContext> => {

const mutationKey = ['answersControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof answersControllerUpdate>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  answersControllerUpdate(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AnswersControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof answersControllerUpdate>>>
    
    export type AnswersControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary 更新答题记录
 */
export const useAnswersControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerUpdate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof answersControllerUpdate>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getAnswersControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除答题记录
 */
export const answersControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/answers/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getAnswersControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof answersControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['answersControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof answersControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  answersControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AnswersControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof answersControllerRemove>>>
    
    export type AnswersControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除答题记录
 */
export const useAnswersControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof answersControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof answersControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getAnswersControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    