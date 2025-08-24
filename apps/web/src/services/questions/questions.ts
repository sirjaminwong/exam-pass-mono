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
  CreateQuestionDto,
  CreateQuestionsDto,
  QuestionDto,
  QuestionsControllerFindAllParams,
  QuestionsControllerSearchParams,
  UpdateQuestionDto
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType , BodyType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新题目
 */
export const questionsControllerCreate = (
    createQuestionDto: BodyType<CreateQuestionDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<QuestionDto>(
      {url: `/questions`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createQuestionDto, signal
    },
      options);
    }
  


export const getQuestionsControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof questionsControllerCreate>>, TError,{data: BodyType<CreateQuestionDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof questionsControllerCreate>>, TError,{data: BodyType<CreateQuestionDto>}, TContext> => {

const mutationKey = ['questionsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof questionsControllerCreate>>, {data: BodyType<CreateQuestionDto>}> = (props) => {
          const {data} = props ?? {};

          return  questionsControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type QuestionsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof questionsControllerCreate>>>
    export type QuestionsControllerCreateMutationBody = BodyType<CreateQuestionDto>
    export type QuestionsControllerCreateMutationError = ErrorType<null>

    /**
 * @summary 创建新题目
 */
export const useQuestionsControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof questionsControllerCreate>>, TError,{data: BodyType<CreateQuestionDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof questionsControllerCreate>>,
        TError,
        {data: BodyType<CreateQuestionDto>},
        TContext
      > => {

      const mutationOptions = getQuestionsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取题目列表
 */
export const questionsControllerFindAll = (
    params?: QuestionsControllerFindAllParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<QuestionDto[]>(
      {url: `/questions`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getQuestionsControllerFindAllQueryKey = (params?: QuestionsControllerFindAllParams,) => {
    return [`/questions`, ...(params ? [params]: [])] as const;
    }

    
export const getQuestionsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof questionsControllerFindAll>>, TError = ErrorType<unknown>>(params?: QuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getQuestionsControllerFindAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof questionsControllerFindAll>>> = ({ signal }) => questionsControllerFindAll(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type QuestionsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof questionsControllerFindAll>>>
export type QuestionsControllerFindAllQueryError = ErrorType<unknown>


export function useQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof questionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  QuestionsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof questionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: QuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof questionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: QuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取题目列表
 */

export function useQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof questionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: QuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getQuestionsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 批量创建题目
 */
export const questionsControllerCreateQuestions = (
    createQuestionsDto: BodyType<CreateQuestionsDto>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<QuestionDto[]>(
      {url: `/questions/bulk`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createQuestionsDto, signal
    },
      options);
    }
  


export const getQuestionsControllerCreateQuestionsMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof questionsControllerCreateQuestions>>, TError,{data: BodyType<CreateQuestionsDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof questionsControllerCreateQuestions>>, TError,{data: BodyType<CreateQuestionsDto>}, TContext> => {

const mutationKey = ['questionsControllerCreateQuestions'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof questionsControllerCreateQuestions>>, {data: BodyType<CreateQuestionsDto>}> = (props) => {
          const {data} = props ?? {};

          return  questionsControllerCreateQuestions(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type QuestionsControllerCreateQuestionsMutationResult = NonNullable<Awaited<ReturnType<typeof questionsControllerCreateQuestions>>>
    export type QuestionsControllerCreateQuestionsMutationBody = BodyType<CreateQuestionsDto>
    export type QuestionsControllerCreateQuestionsMutationError = ErrorType<null>

    /**
 * @summary 批量创建题目
 */
export const useQuestionsControllerCreateQuestions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof questionsControllerCreateQuestions>>, TError,{data: BodyType<CreateQuestionsDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof questionsControllerCreateQuestions>>,
        TError,
        {data: BodyType<CreateQuestionsDto>},
        TContext
      > => {

      const mutationOptions = getQuestionsControllerCreateQuestionsMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 搜索题目
 */
export const questionsControllerSearch = (
    params: QuestionsControllerSearchParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<QuestionDto[]>(
      {url: `/questions/search`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getQuestionsControllerSearchQueryKey = (params?: QuestionsControllerSearchParams,) => {
    return [`/questions/search`, ...(params ? [params]: [])] as const;
    }

    
export const getQuestionsControllerSearchQueryOptions = <TData = Awaited<ReturnType<typeof questionsControllerSearch>>, TError = ErrorType<unknown>>(params: QuestionsControllerSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getQuestionsControllerSearchQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof questionsControllerSearch>>> = ({ signal }) => questionsControllerSearch(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof questionsControllerSearch>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type QuestionsControllerSearchQueryResult = NonNullable<Awaited<ReturnType<typeof questionsControllerSearch>>>
export type QuestionsControllerSearchQueryError = ErrorType<unknown>


export function useQuestionsControllerSearch<TData = Awaited<ReturnType<typeof questionsControllerSearch>>, TError = ErrorType<unknown>>(
 params: QuestionsControllerSearchParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerSearch>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerSearch>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerSearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerSearch<TData = Awaited<ReturnType<typeof questionsControllerSearch>>, TError = ErrorType<unknown>>(
 params: QuestionsControllerSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerSearch>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerSearch>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerSearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerSearch<TData = Awaited<ReturnType<typeof questionsControllerSearch>>, TError = ErrorType<unknown>>(
 params: QuestionsControllerSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 搜索题目
 */

export function useQuestionsControllerSearch<TData = Awaited<ReturnType<typeof questionsControllerSearch>>, TError = ErrorType<unknown>>(
 params: QuestionsControllerSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getQuestionsControllerSearchQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取题目统计信息
 */
export const questionsControllerGetStats = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/questions/stats`, method: 'GET', signal
    },
      options);
    }
  

export const getQuestionsControllerGetStatsQueryKey = () => {
    return [`/questions/stats`] as const;
    }

    
export const getQuestionsControllerGetStatsQueryOptions = <TData = Awaited<ReturnType<typeof questionsControllerGetStats>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerGetStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getQuestionsControllerGetStatsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof questionsControllerGetStats>>> = ({ signal }) => questionsControllerGetStats(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof questionsControllerGetStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type QuestionsControllerGetStatsQueryResult = NonNullable<Awaited<ReturnType<typeof questionsControllerGetStats>>>
export type QuestionsControllerGetStatsQueryError = ErrorType<unknown>


export function useQuestionsControllerGetStats<TData = Awaited<ReturnType<typeof questionsControllerGetStats>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerGetStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerGetStats>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerGetStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerGetStats<TData = Awaited<ReturnType<typeof questionsControllerGetStats>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerGetStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerGetStats>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerGetStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerGetStats<TData = Awaited<ReturnType<typeof questionsControllerGetStats>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerGetStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取题目统计信息
 */

export function useQuestionsControllerGetStats<TData = Awaited<ReturnType<typeof questionsControllerGetStats>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerGetStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getQuestionsControllerGetStatsQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 按类型获取题目
 */
export const questionsControllerFindByType = (
    type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'INDEFINITE_CHOICE',
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<QuestionDto[]>(
      {url: `/questions/type/${type}`, method: 'GET', signal
    },
      options);
    }
  

export const getQuestionsControllerFindByTypeQueryKey = (type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'INDEFINITE_CHOICE',) => {
    return [`/questions/type/${type}`] as const;
    }

    
export const getQuestionsControllerFindByTypeQueryOptions = <TData = Awaited<ReturnType<typeof questionsControllerFindByType>>, TError = ErrorType<unknown>>(type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'INDEFINITE_CHOICE', options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getQuestionsControllerFindByTypeQueryKey(type);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof questionsControllerFindByType>>> = ({ signal }) => questionsControllerFindByType(type, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(type), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindByType>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type QuestionsControllerFindByTypeQueryResult = NonNullable<Awaited<ReturnType<typeof questionsControllerFindByType>>>
export type QuestionsControllerFindByTypeQueryError = ErrorType<unknown>


export function useQuestionsControllerFindByType<TData = Awaited<ReturnType<typeof questionsControllerFindByType>>, TError = ErrorType<unknown>>(
 type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'INDEFINITE_CHOICE', options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindByType>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerFindByType>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerFindByType>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerFindByType<TData = Awaited<ReturnType<typeof questionsControllerFindByType>>, TError = ErrorType<unknown>>(
 type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'INDEFINITE_CHOICE', options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindByType>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerFindByType>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerFindByType>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerFindByType<TData = Awaited<ReturnType<typeof questionsControllerFindByType>>, TError = ErrorType<unknown>>(
 type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'INDEFINITE_CHOICE', options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 按类型获取题目
 */

export function useQuestionsControllerFindByType<TData = Awaited<ReturnType<typeof questionsControllerFindByType>>, TError = ErrorType<unknown>>(
 type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'INDEFINITE_CHOICE', options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getQuestionsControllerFindByTypeQueryOptions(type,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取题目详情
 */
export const questionsControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<QuestionDto>(
      {url: `/questions/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getQuestionsControllerFindOneQueryKey = (id?: string,) => {
    return [`/questions/${id}`] as const;
    }

    
export const getQuestionsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof questionsControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getQuestionsControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof questionsControllerFindOne>>> = ({ signal }) => questionsControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type QuestionsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof questionsControllerFindOne>>>
export type QuestionsControllerFindOneQueryError = ErrorType<null>


export function useQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof questionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof questionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof questionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof questionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof questionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取题目详情
 */

export function useQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof questionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof questionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getQuestionsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新题目信息
 */
export const questionsControllerUpdate = (
    id: string,
    updateQuestionDto: BodyType<UpdateQuestionDto>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<QuestionDto>(
      {url: `/questions/${id}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateQuestionDto
    },
      options);
    }
  


export const getQuestionsControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof questionsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateQuestionDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof questionsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateQuestionDto>}, TContext> => {

const mutationKey = ['questionsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof questionsControllerUpdate>>, {id: string;data: BodyType<UpdateQuestionDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  questionsControllerUpdate(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type QuestionsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof questionsControllerUpdate>>>
    export type QuestionsControllerUpdateMutationBody = BodyType<UpdateQuestionDto>
    export type QuestionsControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary 更新题目信息
 */
export const useQuestionsControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof questionsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateQuestionDto>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof questionsControllerUpdate>>,
        TError,
        {id: string;data: BodyType<UpdateQuestionDto>},
        TContext
      > => {

      const mutationOptions = getQuestionsControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除题目
 */
export const questionsControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<QuestionDto>(
      {url: `/questions/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getQuestionsControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof questionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof questionsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['questionsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof questionsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  questionsControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type QuestionsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof questionsControllerRemove>>>
    
    export type QuestionsControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除题目
 */
export const useQuestionsControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof questionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof questionsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getQuestionsControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    