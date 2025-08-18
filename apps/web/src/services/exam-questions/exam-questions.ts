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
  ExamQuestionsControllerFindAllParams,
  ExamQuestionsControllerGetExamQuestionStatsParams
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新的试卷题目关联记录
 */
export const examQuestionsControllerCreate = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions`, method: 'POST', signal
    },
      options);
    }
  


export const getExamQuestionsControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerCreate>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerCreate>>, TError,void, TContext> => {

const mutationKey = ['examQuestionsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examQuestionsControllerCreate>>, void> = () => {
          

          return  examQuestionsControllerCreate(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamQuestionsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerCreate>>>
    
    export type ExamQuestionsControllerCreateMutationError = ErrorType<null>

    /**
 * @summary 创建新的试卷题目关联记录
 */
export const useExamQuestionsControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerCreate>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examQuestionsControllerCreate>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getExamQuestionsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取试卷题目关联记录列表
 */
export const examQuestionsControllerFindAll = (
    params?: ExamQuestionsControllerFindAllParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getExamQuestionsControllerFindAllQueryKey = (params?: ExamQuestionsControllerFindAllParams,) => {
    return [`/exam-questions`, ...(params ? [params]: [])] as const;
    }

    
export const getExamQuestionsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(params?: ExamQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamQuestionsControllerFindAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examQuestionsControllerFindAll>>> = ({ signal }) => examQuestionsControllerFindAll(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamQuestionsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerFindAll>>>
export type ExamQuestionsControllerFindAllQueryError = ErrorType<unknown>


export function useExamQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  ExamQuestionsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取试卷题目关联记录列表
 */

export function useExamQuestionsControllerFindAll<TData = Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamQuestionsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamQuestionsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 添加题目到试卷
 */
export const examQuestionsControllerAddQuestionToExam = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/add`, method: 'POST', signal
    },
      options);
    }
  


export const getExamQuestionsControllerAddQuestionToExamMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerAddQuestionToExam>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerAddQuestionToExam>>, TError,void, TContext> => {

const mutationKey = ['examQuestionsControllerAddQuestionToExam'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examQuestionsControllerAddQuestionToExam>>, void> = () => {
          

          return  examQuestionsControllerAddQuestionToExam(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamQuestionsControllerAddQuestionToExamMutationResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerAddQuestionToExam>>>
    
    export type ExamQuestionsControllerAddQuestionToExamMutationError = ErrorType<null>

    /**
 * @summary 添加题目到试卷
 */
export const useExamQuestionsControllerAddQuestionToExam = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerAddQuestionToExam>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examQuestionsControllerAddQuestionToExam>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getExamQuestionsControllerAddQuestionToExamMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 批量添加题目到试卷
 */
export const examQuestionsControllerBulkAddQuestions = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/bulk-add`, method: 'POST', signal
    },
      options);
    }
  


export const getExamQuestionsControllerBulkAddQuestionsMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerBulkAddQuestions>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerBulkAddQuestions>>, TError,void, TContext> => {

const mutationKey = ['examQuestionsControllerBulkAddQuestions'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examQuestionsControllerBulkAddQuestions>>, void> = () => {
          

          return  examQuestionsControllerBulkAddQuestions(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamQuestionsControllerBulkAddQuestionsMutationResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerBulkAddQuestions>>>
    
    export type ExamQuestionsControllerBulkAddQuestionsMutationError = ErrorType<null>

    /**
 * @summary 批量添加题目到试卷
 */
export const useExamQuestionsControllerBulkAddQuestions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerBulkAddQuestions>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examQuestionsControllerBulkAddQuestions>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getExamQuestionsControllerBulkAddQuestionsMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 批量删除试卷题目关联记录
 */
export const examQuestionsControllerBulkRemove = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/bulk-remove`, method: 'POST', signal
    },
      options);
    }
  


export const getExamQuestionsControllerBulkRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerBulkRemove>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerBulkRemove>>, TError,void, TContext> => {

const mutationKey = ['examQuestionsControllerBulkRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examQuestionsControllerBulkRemove>>, void> = () => {
          

          return  examQuestionsControllerBulkRemove(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamQuestionsControllerBulkRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerBulkRemove>>>
    
    export type ExamQuestionsControllerBulkRemoveMutationError = ErrorType<null>

    /**
 * @summary 批量删除试卷题目关联记录
 */
export const useExamQuestionsControllerBulkRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerBulkRemove>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examQuestionsControllerBulkRemove>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getExamQuestionsControllerBulkRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取指定试卷的题目列表
 */
export const examQuestionsControllerFindByExam = (
    examId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/exam/${examId}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamQuestionsControllerFindByExamQueryKey = (examId?: string,) => {
    return [`/exam-questions/exam/${examId}`] as const;
    }

    
export const getExamQuestionsControllerFindByExamQueryOptions = <TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError = ErrorType<unknown>>(examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamQuestionsControllerFindByExamQueryKey(examId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>> = ({ signal }) => examQuestionsControllerFindByExam(examId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(examId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamQuestionsControllerFindByExamQueryResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>>
export type ExamQuestionsControllerFindByExamQueryError = ErrorType<unknown>


export function useExamQuestionsControllerFindByExam<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError = ErrorType<unknown>>(
 examId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindByExam<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindByExam<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定试卷的题目列表
 */

export function useExamQuestionsControllerFindByExam<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamQuestionsControllerFindByExamQueryOptions(examId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定题目关联的试卷列表
 */
export const examQuestionsControllerFindByQuestion = (
    questionId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/question/${questionId}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamQuestionsControllerFindByQuestionQueryKey = (questionId?: string,) => {
    return [`/exam-questions/question/${questionId}`] as const;
    }

    
export const getExamQuestionsControllerFindByQuestionQueryOptions = <TData = Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamQuestionsControllerFindByQuestionQueryKey(questionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>> = ({ signal }) => examQuestionsControllerFindByQuestion(questionId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(questionId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamQuestionsControllerFindByQuestionQueryResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>>
export type ExamQuestionsControllerFindByQuestionQueryError = ErrorType<unknown>


export function useExamQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定题目关联的试卷列表
 */

export function useExamQuestionsControllerFindByQuestion<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError = ErrorType<unknown>>(
 questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamQuestionsControllerFindByQuestionQueryOptions(questionId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定试卷按题型分类的题目
 */
export const examQuestionsControllerGetQuestionsByType = (
    examId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/exam/${examId}/by-type`, method: 'GET', signal
    },
      options);
    }
  

export const getExamQuestionsControllerGetQuestionsByTypeQueryKey = (examId?: string,) => {
    return [`/exam-questions/exam/${examId}/by-type`] as const;
    }

    
export const getExamQuestionsControllerGetQuestionsByTypeQueryOptions = <TData = Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError = ErrorType<unknown>>(examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamQuestionsControllerGetQuestionsByTypeQueryKey(examId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>> = ({ signal }) => examQuestionsControllerGetQuestionsByType(examId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(examId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamQuestionsControllerGetQuestionsByTypeQueryResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>>
export type ExamQuestionsControllerGetQuestionsByTypeQueryError = ErrorType<unknown>


export function useExamQuestionsControllerGetQuestionsByType<TData = Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError = ErrorType<unknown>>(
 examId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerGetQuestionsByType<TData = Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerGetQuestionsByType<TData = Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定试卷按题型分类的题目
 */

export function useExamQuestionsControllerGetQuestionsByType<TData = Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetQuestionsByType>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamQuestionsControllerGetQuestionsByTypeQueryOptions(examId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定试卷的总分
 */
export const examQuestionsControllerGetExamTotalScore = (
    examId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/exam/${examId}/total-score`, method: 'GET', signal
    },
      options);
    }
  

export const getExamQuestionsControllerGetExamTotalScoreQueryKey = (examId?: string,) => {
    return [`/exam-questions/exam/${examId}/total-score`] as const;
    }

    
export const getExamQuestionsControllerGetExamTotalScoreQueryOptions = <TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError = ErrorType<unknown>>(examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamQuestionsControllerGetExamTotalScoreQueryKey(examId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>> = ({ signal }) => examQuestionsControllerGetExamTotalScore(examId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(examId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamQuestionsControllerGetExamTotalScoreQueryResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>>
export type ExamQuestionsControllerGetExamTotalScoreQueryError = ErrorType<unknown>


export function useExamQuestionsControllerGetExamTotalScore<TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError = ErrorType<unknown>>(
 examId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerGetExamTotalScore<TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerGetExamTotalScore<TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定试卷的总分
 */

export function useExamQuestionsControllerGetExamTotalScore<TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError = ErrorType<unknown>>(
 examId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamTotalScore>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamQuestionsControllerGetExamTotalScoreQueryOptions(examId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定试卷中的指定题目关联记录
 */
export const examQuestionsControllerFindByExamAndQuestion = (
    examId: string,
    questionId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/exam/${examId}/question/${questionId}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamQuestionsControllerFindByExamAndQuestionQueryKey = (examId?: string,
    questionId?: string,) => {
    return [`/exam-questions/exam/${examId}/question/${questionId}`] as const;
    }

    
export const getExamQuestionsControllerFindByExamAndQuestionQueryOptions = <TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError = ErrorType<null>>(examId: string,
    questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamQuestionsControllerFindByExamAndQuestionQueryKey(examId,questionId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>> = ({ signal }) => examQuestionsControllerFindByExamAndQuestion(examId,questionId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(examId && questionId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamQuestionsControllerFindByExamAndQuestionQueryResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>>
export type ExamQuestionsControllerFindByExamAndQuestionQueryError = ErrorType<null>


export function useExamQuestionsControllerFindByExamAndQuestion<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError = ErrorType<null>>(
 examId: string,
    questionId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindByExamAndQuestion<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError = ErrorType<null>>(
 examId: string,
    questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindByExamAndQuestion<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError = ErrorType<null>>(
 examId: string,
    questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定试卷中的指定题目关联记录
 */

export function useExamQuestionsControllerFindByExamAndQuestion<TData = Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError = ErrorType<null>>(
 examId: string,
    questionId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindByExamAndQuestion>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamQuestionsControllerFindByExamAndQuestionQueryOptions(examId,questionId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 删除指定试卷中的指定题目关联记录
 */
export const examQuestionsControllerRemoveByExamAndQuestion = (
    examId: string,
    questionId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/exam/${examId}/question/${questionId}`, method: 'DELETE'
    },
      options);
    }
  


export const getExamQuestionsControllerRemoveByExamAndQuestionMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerRemoveByExamAndQuestion>>, TError,{examId: string;questionId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerRemoveByExamAndQuestion>>, TError,{examId: string;questionId: string}, TContext> => {

const mutationKey = ['examQuestionsControllerRemoveByExamAndQuestion'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examQuestionsControllerRemoveByExamAndQuestion>>, {examId: string;questionId: string}> = (props) => {
          const {examId,questionId} = props ?? {};

          return  examQuestionsControllerRemoveByExamAndQuestion(examId,questionId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamQuestionsControllerRemoveByExamAndQuestionMutationResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerRemoveByExamAndQuestion>>>
    
    export type ExamQuestionsControllerRemoveByExamAndQuestionMutationError = ErrorType<null>

    /**
 * @summary 删除指定试卷中的指定题目关联记录
 */
export const useExamQuestionsControllerRemoveByExamAndQuestion = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerRemoveByExamAndQuestion>>, TError,{examId: string;questionId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examQuestionsControllerRemoveByExamAndQuestion>>,
        TError,
        {examId: string;questionId: string},
        TContext
      > => {

      const mutationOptions = getExamQuestionsControllerRemoveByExamAndQuestionMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取试卷题目关联统计信息
 */
export const examQuestionsControllerGetExamQuestionStats = (
    params?: ExamQuestionsControllerGetExamQuestionStatsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/stats`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getExamQuestionsControllerGetExamQuestionStatsQueryKey = (params?: ExamQuestionsControllerGetExamQuestionStatsParams,) => {
    return [`/exam-questions/stats`, ...(params ? [params]: [])] as const;
    }

    
export const getExamQuestionsControllerGetExamQuestionStatsQueryOptions = <TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError = ErrorType<unknown>>(params?: ExamQuestionsControllerGetExamQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamQuestionsControllerGetExamQuestionStatsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>> = ({ signal }) => examQuestionsControllerGetExamQuestionStats(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamQuestionsControllerGetExamQuestionStatsQueryResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>>
export type ExamQuestionsControllerGetExamQuestionStatsQueryError = ErrorType<unknown>


export function useExamQuestionsControllerGetExamQuestionStats<TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError = ErrorType<unknown>>(
 params: undefined |  ExamQuestionsControllerGetExamQuestionStatsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerGetExamQuestionStats<TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError = ErrorType<unknown>>(
 params?: ExamQuestionsControllerGetExamQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerGetExamQuestionStats<TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError = ErrorType<unknown>>(
 params?: ExamQuestionsControllerGetExamQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取试卷题目关联统计信息
 */

export function useExamQuestionsControllerGetExamQuestionStats<TData = Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError = ErrorType<unknown>>(
 params?: ExamQuestionsControllerGetExamQuestionStatsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerGetExamQuestionStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamQuestionsControllerGetExamQuestionStatsQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取试卷题目关联记录详情
 */
export const examQuestionsControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamQuestionsControllerFindOneQueryKey = (id?: string,) => {
    return [`/exam-questions/${id}`] as const;
    }

    
export const getExamQuestionsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamQuestionsControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examQuestionsControllerFindOne>>> = ({ signal }) => examQuestionsControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamQuestionsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerFindOne>>>
export type ExamQuestionsControllerFindOneQueryError = ErrorType<null>


export function useExamQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examQuestionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof examQuestionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取试卷题目关联记录详情
 */

export function useExamQuestionsControllerFindOne<TData = Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examQuestionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamQuestionsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新试卷题目关联记录
 */
export const examQuestionsControllerUpdate = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/${id}`, method: 'PATCH'
    },
      options);
    }
  


export const getExamQuestionsControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerUpdate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerUpdate>>, TError,{id: string}, TContext> => {

const mutationKey = ['examQuestionsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examQuestionsControllerUpdate>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  examQuestionsControllerUpdate(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamQuestionsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerUpdate>>>
    
    export type ExamQuestionsControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary 更新试卷题目关联记录
 */
export const useExamQuestionsControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerUpdate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examQuestionsControllerUpdate>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getExamQuestionsControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除试卷题目关联记录
 */
export const examQuestionsControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exam-questions/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getExamQuestionsControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['examQuestionsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examQuestionsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  examQuestionsControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamQuestionsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof examQuestionsControllerRemove>>>
    
    export type ExamQuestionsControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除试卷题目关联记录
 */
export const useExamQuestionsControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examQuestionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examQuestionsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getExamQuestionsControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    