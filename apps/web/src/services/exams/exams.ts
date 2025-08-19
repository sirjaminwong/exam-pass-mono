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
  ExamsControllerAddQuestionBody,
  ExamsControllerCreateBody,
  ExamsControllerFindAllParams,
  ExamsControllerUpdateBody,
  ExamsControllerUpdateQuestionOrderBody
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType , BodyType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新试卷
 */
export const examsControllerCreate = (
    examsControllerCreateBody: BodyType<ExamsControllerCreateBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exams`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: examsControllerCreateBody, signal
    },
      options);
    }
  


export const getExamsControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerCreate>>, TError,{data: BodyType<ExamsControllerCreateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examsControllerCreate>>, TError,{data: BodyType<ExamsControllerCreateBody>}, TContext> => {

const mutationKey = ['examsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examsControllerCreate>>, {data: BodyType<ExamsControllerCreateBody>}> = (props) => {
          const {data} = props ?? {};

          return  examsControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof examsControllerCreate>>>
    export type ExamsControllerCreateMutationBody = BodyType<ExamsControllerCreateBody>
    export type ExamsControllerCreateMutationError = ErrorType<null>

    /**
 * @summary 创建新试卷
 */
export const useExamsControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerCreate>>, TError,{data: BodyType<ExamsControllerCreateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examsControllerCreate>>,
        TError,
        {data: BodyType<ExamsControllerCreateBody>},
        TContext
      > => {

      const mutationOptions = getExamsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取试卷列表
 */
export const examsControllerFindAll = (
    params?: ExamsControllerFindAllParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exams`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getExamsControllerFindAllQueryKey = (params?: ExamsControllerFindAllParams,) => {
    return [`/exams`, ...(params ? [params]: [])] as const;
    }

    
export const getExamsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof examsControllerFindAll>>, TError = ErrorType<unknown>>(params?: ExamsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamsControllerFindAllQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examsControllerFindAll>>> = ({ signal }) => examsControllerFindAll(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof examsControllerFindAll>>>
export type ExamsControllerFindAllQueryError = ErrorType<unknown>


export function useExamsControllerFindAll<TData = Awaited<ReturnType<typeof examsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  ExamsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof examsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamsControllerFindAll<TData = Awaited<ReturnType<typeof examsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof examsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamsControllerFindAll<TData = Awaited<ReturnType<typeof examsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取试卷列表
 */

export function useExamsControllerFindAll<TData = Awaited<ReturnType<typeof examsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: ExamsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 获取指定班级的试卷列表
 */
export const examsControllerFindByClass = (
    classId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exams/class/${classId}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamsControllerFindByClassQueryKey = (classId?: string,) => {
    return [`/exams/class/${classId}`] as const;
    }

    
export const getExamsControllerFindByClassQueryOptions = <TData = Awaited<ReturnType<typeof examsControllerFindByClass>>, TError = ErrorType<unknown>>(classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindByClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamsControllerFindByClassQueryKey(classId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examsControllerFindByClass>>> = ({ signal }) => examsControllerFindByClass(classId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(classId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindByClass>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamsControllerFindByClassQueryResult = NonNullable<Awaited<ReturnType<typeof examsControllerFindByClass>>>
export type ExamsControllerFindByClassQueryError = ErrorType<unknown>


export function useExamsControllerFindByClass<TData = Awaited<ReturnType<typeof examsControllerFindByClass>>, TError = ErrorType<unknown>>(
 classId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindByClass>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examsControllerFindByClass>>,
          TError,
          Awaited<ReturnType<typeof examsControllerFindByClass>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamsControllerFindByClass<TData = Awaited<ReturnType<typeof examsControllerFindByClass>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindByClass>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examsControllerFindByClass>>,
          TError,
          Awaited<ReturnType<typeof examsControllerFindByClass>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamsControllerFindByClass<TData = Awaited<ReturnType<typeof examsControllerFindByClass>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindByClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取指定班级的试卷列表
 */

export function useExamsControllerFindByClass<TData = Awaited<ReturnType<typeof examsControllerFindByClass>>, TError = ErrorType<unknown>>(
 classId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindByClass>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamsControllerFindByClassQueryOptions(classId,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取试卷详情
 */
export const examsControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exams/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getExamsControllerFindOneQueryKey = (id?: string,) => {
    return [`/exams/${id}`] as const;
    }

    
export const getExamsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof examsControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamsControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examsControllerFindOne>>> = ({ signal }) => examsControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof examsControllerFindOne>>>
export type ExamsControllerFindOneQueryError = ErrorType<null>


export function useExamsControllerFindOne<TData = Awaited<ReturnType<typeof examsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof examsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamsControllerFindOne<TData = Awaited<ReturnType<typeof examsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof examsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamsControllerFindOne<TData = Awaited<ReturnType<typeof examsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取试卷详情
 */

export function useExamsControllerFindOne<TData = Awaited<ReturnType<typeof examsControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新试卷信息
 */
export const examsControllerUpdate = (
    id: string,
    examsControllerUpdateBody: BodyType<ExamsControllerUpdateBody>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exams/${id}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: examsControllerUpdateBody
    },
      options);
    }
  


export const getExamsControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerUpdate>>, TError,{id: string;data: BodyType<ExamsControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examsControllerUpdate>>, TError,{id: string;data: BodyType<ExamsControllerUpdateBody>}, TContext> => {

const mutationKey = ['examsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examsControllerUpdate>>, {id: string;data: BodyType<ExamsControllerUpdateBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  examsControllerUpdate(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof examsControllerUpdate>>>
    export type ExamsControllerUpdateMutationBody = BodyType<ExamsControllerUpdateBody>
    export type ExamsControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary 更新试卷信息
 */
export const useExamsControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerUpdate>>, TError,{id: string;data: BodyType<ExamsControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examsControllerUpdate>>,
        TError,
        {id: string;data: BodyType<ExamsControllerUpdateBody>},
        TContext
      > => {

      const mutationOptions = getExamsControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除试卷
 */
export const examsControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exams/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getExamsControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['examsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  examsControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof examsControllerRemove>>>
    
    export type ExamsControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除试卷
 */
export const useExamsControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getExamsControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取试卷统计信息
 */
export const examsControllerGetStats = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exams/${id}/stats`, method: 'GET', signal
    },
      options);
    }
  

export const getExamsControllerGetStatsQueryKey = (id?: string,) => {
    return [`/exams/${id}/stats`] as const;
    }

    
export const getExamsControllerGetStatsQueryOptions = <TData = Awaited<ReturnType<typeof examsControllerGetStats>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerGetStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getExamsControllerGetStatsQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof examsControllerGetStats>>> = ({ signal }) => examsControllerGetStats(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof examsControllerGetStats>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ExamsControllerGetStatsQueryResult = NonNullable<Awaited<ReturnType<typeof examsControllerGetStats>>>
export type ExamsControllerGetStatsQueryError = ErrorType<unknown>


export function useExamsControllerGetStats<TData = Awaited<ReturnType<typeof examsControllerGetStats>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerGetStats>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof examsControllerGetStats>>,
          TError,
          Awaited<ReturnType<typeof examsControllerGetStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamsControllerGetStats<TData = Awaited<ReturnType<typeof examsControllerGetStats>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerGetStats>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof examsControllerGetStats>>,
          TError,
          Awaited<ReturnType<typeof examsControllerGetStats>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useExamsControllerGetStats<TData = Awaited<ReturnType<typeof examsControllerGetStats>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerGetStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取试卷统计信息
 */

export function useExamsControllerGetStats<TData = Awaited<ReturnType<typeof examsControllerGetStats>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof examsControllerGetStats>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getExamsControllerGetStatsQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 切换试卷激活状态
 */
export const examsControllerToggleActive = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exams/${id}/toggle-active`, method: 'PATCH'
    },
      options);
    }
  


export const getExamsControllerToggleActiveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerToggleActive>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examsControllerToggleActive>>, TError,{id: string}, TContext> => {

const mutationKey = ['examsControllerToggleActive'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examsControllerToggleActive>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  examsControllerToggleActive(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamsControllerToggleActiveMutationResult = NonNullable<Awaited<ReturnType<typeof examsControllerToggleActive>>>
    
    export type ExamsControllerToggleActiveMutationError = ErrorType<unknown>

    /**
 * @summary 切换试卷激活状态
 */
export const useExamsControllerToggleActive = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerToggleActive>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examsControllerToggleActive>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getExamsControllerToggleActiveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 为试卷添加题目
 */
export const examsControllerAddQuestion = (
    id: string,
    examsControllerAddQuestionBody: BodyType<ExamsControllerAddQuestionBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/exams/${id}/questions`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: examsControllerAddQuestionBody, signal
    },
      options);
    }
  


export const getExamsControllerAddQuestionMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerAddQuestion>>, TError,{id: string;data: BodyType<ExamsControllerAddQuestionBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examsControllerAddQuestion>>, TError,{id: string;data: BodyType<ExamsControllerAddQuestionBody>}, TContext> => {

const mutationKey = ['examsControllerAddQuestion'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examsControllerAddQuestion>>, {id: string;data: BodyType<ExamsControllerAddQuestionBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  examsControllerAddQuestion(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamsControllerAddQuestionMutationResult = NonNullable<Awaited<ReturnType<typeof examsControllerAddQuestion>>>
    export type ExamsControllerAddQuestionMutationBody = BodyType<ExamsControllerAddQuestionBody>
    export type ExamsControllerAddQuestionMutationError = ErrorType<unknown>

    /**
 * @summary 为试卷添加题目
 */
export const useExamsControllerAddQuestion = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerAddQuestion>>, TError,{id: string;data: BodyType<ExamsControllerAddQuestionBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examsControllerAddQuestion>>,
        TError,
        {id: string;data: BodyType<ExamsControllerAddQuestionBody>},
        TContext
      > => {

      const mutationOptions = getExamsControllerAddQuestionMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 从试卷中移除题目
 */
export const examsControllerRemoveQuestion = (
    id: string,
    questionId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exams/${id}/questions/${questionId}`, method: 'DELETE'
    },
      options);
    }
  


export const getExamsControllerRemoveQuestionMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerRemoveQuestion>>, TError,{id: string;questionId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examsControllerRemoveQuestion>>, TError,{id: string;questionId: string}, TContext> => {

const mutationKey = ['examsControllerRemoveQuestion'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examsControllerRemoveQuestion>>, {id: string;questionId: string}> = (props) => {
          const {id,questionId} = props ?? {};

          return  examsControllerRemoveQuestion(id,questionId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamsControllerRemoveQuestionMutationResult = NonNullable<Awaited<ReturnType<typeof examsControllerRemoveQuestion>>>
    
    export type ExamsControllerRemoveQuestionMutationError = ErrorType<unknown>

    /**
 * @summary 从试卷中移除题目
 */
export const useExamsControllerRemoveQuestion = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerRemoveQuestion>>, TError,{id: string;questionId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examsControllerRemoveQuestion>>,
        TError,
        {id: string;questionId: string},
        TContext
      > => {

      const mutationOptions = getExamsControllerRemoveQuestionMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 更新试卷中题目的顺序
 */
export const examsControllerUpdateQuestionOrder = (
    id: string,
    questionId: string,
    examsControllerUpdateQuestionOrderBody: BodyType<ExamsControllerUpdateQuestionOrderBody>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/exams/${id}/questions/${questionId}/order`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: examsControllerUpdateQuestionOrderBody
    },
      options);
    }
  


export const getExamsControllerUpdateQuestionOrderMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerUpdateQuestionOrder>>, TError,{id: string;questionId: string;data: BodyType<ExamsControllerUpdateQuestionOrderBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof examsControllerUpdateQuestionOrder>>, TError,{id: string;questionId: string;data: BodyType<ExamsControllerUpdateQuestionOrderBody>}, TContext> => {

const mutationKey = ['examsControllerUpdateQuestionOrder'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof examsControllerUpdateQuestionOrder>>, {id: string;questionId: string;data: BodyType<ExamsControllerUpdateQuestionOrderBody>}> = (props) => {
          const {id,questionId,data} = props ?? {};

          return  examsControllerUpdateQuestionOrder(id,questionId,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ExamsControllerUpdateQuestionOrderMutationResult = NonNullable<Awaited<ReturnType<typeof examsControllerUpdateQuestionOrder>>>
    export type ExamsControllerUpdateQuestionOrderMutationBody = BodyType<ExamsControllerUpdateQuestionOrderBody>
    export type ExamsControllerUpdateQuestionOrderMutationError = ErrorType<unknown>

    /**
 * @summary 更新试卷中题目的顺序
 */
export const useExamsControllerUpdateQuestionOrder = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof examsControllerUpdateQuestionOrder>>, TError,{id: string;questionId: string;data: BodyType<ExamsControllerUpdateQuestionOrderBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof examsControllerUpdateQuestionOrder>>,
        TError,
        {id: string;questionId: string;data: BodyType<ExamsControllerUpdateQuestionOrderBody>},
        TContext
      > => {

      const mutationOptions = getExamsControllerUpdateQuestionOrderMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    