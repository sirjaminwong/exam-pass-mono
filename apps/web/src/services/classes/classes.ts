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
  ClassesControllerAddMemberBody,
  ClassesControllerCreateBody,
  ClassesControllerUpdateBody
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType , BodyType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary 创建新班级
 */
export const classesControllerCreate = (
    classesControllerCreateBody: BodyType<ClassesControllerCreateBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/classes`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: classesControllerCreateBody, signal
    },
      options);
    }
  


export const getClassesControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerCreate>>, TError,{data: BodyType<ClassesControllerCreateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classesControllerCreate>>, TError,{data: BodyType<ClassesControllerCreateBody>}, TContext> => {

const mutationKey = ['classesControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classesControllerCreate>>, {data: BodyType<ClassesControllerCreateBody>}> = (props) => {
          const {data} = props ?? {};

          return  classesControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassesControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof classesControllerCreate>>>
    export type ClassesControllerCreateMutationBody = BodyType<ClassesControllerCreateBody>
    export type ClassesControllerCreateMutationError = ErrorType<null>

    /**
 * @summary 创建新班级
 */
export const useClassesControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerCreate>>, TError,{data: BodyType<ClassesControllerCreateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classesControllerCreate>>,
        TError,
        {data: BodyType<ClassesControllerCreateBody>},
        TContext
      > => {

      const mutationOptions = getClassesControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取所有班级列表
 */
export const classesControllerFindAll = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/classes`, method: 'GET', signal
    },
      options);
    }
  

export const getClassesControllerFindAllQueryKey = () => {
    return [`/classes`] as const;
    }

    
export const getClassesControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassesControllerFindAllQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classesControllerFindAll>>> = ({ signal }) => classesControllerFindAll(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassesControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof classesControllerFindAll>>>
export type ClassesControllerFindAllQueryError = ErrorType<unknown>


export function useClassesControllerFindAll<TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindAll<TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindAll<TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取所有班级列表
 */

export function useClassesControllerFindAll<TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassesControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过班级代码获取班级信息
 */
export const classesControllerFindByCode = (
    code: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/classes/by-code/${code}`, method: 'GET', signal
    },
      options);
    }
  

export const getClassesControllerFindByCodeQueryKey = (code?: string,) => {
    return [`/classes/by-code/${code}`] as const;
    }

    
export const getClassesControllerFindByCodeQueryOptions = <TData = Awaited<ReturnType<typeof classesControllerFindByCode>>, TError = ErrorType<null>>(code: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindByCode>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassesControllerFindByCodeQueryKey(code);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classesControllerFindByCode>>> = ({ signal }) => classesControllerFindByCode(code, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(code), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindByCode>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassesControllerFindByCodeQueryResult = NonNullable<Awaited<ReturnType<typeof classesControllerFindByCode>>>
export type ClassesControllerFindByCodeQueryError = ErrorType<null>


export function useClassesControllerFindByCode<TData = Awaited<ReturnType<typeof classesControllerFindByCode>>, TError = ErrorType<null>>(
 code: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindByCode>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindByCode>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindByCode>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindByCode<TData = Awaited<ReturnType<typeof classesControllerFindByCode>>, TError = ErrorType<null>>(
 code: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindByCode>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindByCode>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindByCode>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindByCode<TData = Awaited<ReturnType<typeof classesControllerFindByCode>>, TError = ErrorType<null>>(
 code: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindByCode>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过班级代码获取班级信息
 */

export function useClassesControllerFindByCode<TData = Awaited<ReturnType<typeof classesControllerFindByCode>>, TError = ErrorType<null>>(
 code: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindByCode>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassesControllerFindByCodeQueryOptions(code,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 通过ID获取班级信息
 */
export const classesControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/classes/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getClassesControllerFindOneQueryKey = (id?: string,) => {
    return [`/classes/${id}`] as const;
    }

    
export const getClassesControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassesControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classesControllerFindOne>>> = ({ signal }) => classesControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassesControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof classesControllerFindOne>>>
export type ClassesControllerFindOneQueryError = ErrorType<null>


export function useClassesControllerFindOne<TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindOne<TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindOne<TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 通过ID获取班级信息
 */

export function useClassesControllerFindOne<TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassesControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 更新班级信息
 */
export const classesControllerUpdate = (
    id: string,
    classesControllerUpdateBody: BodyType<ClassesControllerUpdateBody>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/classes/${id}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: classesControllerUpdateBody
    },
      options);
    }
  


export const getClassesControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerUpdate>>, TError,{id: string;data: BodyType<ClassesControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classesControllerUpdate>>, TError,{id: string;data: BodyType<ClassesControllerUpdateBody>}, TContext> => {

const mutationKey = ['classesControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classesControllerUpdate>>, {id: string;data: BodyType<ClassesControllerUpdateBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  classesControllerUpdate(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassesControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof classesControllerUpdate>>>
    export type ClassesControllerUpdateMutationBody = BodyType<ClassesControllerUpdateBody>
    export type ClassesControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary 更新班级信息
 */
export const useClassesControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerUpdate>>, TError,{id: string;data: BodyType<ClassesControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classesControllerUpdate>>,
        TError,
        {id: string;data: BodyType<ClassesControllerUpdateBody>},
        TContext
      > => {

      const mutationOptions = getClassesControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 删除班级
 */
export const classesControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/classes/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getClassesControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['classesControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classesControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  classesControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassesControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof classesControllerRemove>>>
    
    export type ClassesControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary 删除班级
 */
export const useClassesControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classesControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getClassesControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 添加班级成员
 */
export const classesControllerAddMember = (
    id: string,
    classesControllerAddMemberBody: BodyType<ClassesControllerAddMemberBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/classes/${id}/members`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: classesControllerAddMemberBody, signal
    },
      options);
    }
  


export const getClassesControllerAddMemberMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerAddMember>>, TError,{id: string;data: BodyType<ClassesControllerAddMemberBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classesControllerAddMember>>, TError,{id: string;data: BodyType<ClassesControllerAddMemberBody>}, TContext> => {

const mutationKey = ['classesControllerAddMember'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classesControllerAddMember>>, {id: string;data: BodyType<ClassesControllerAddMemberBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  classesControllerAddMember(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassesControllerAddMemberMutationResult = NonNullable<Awaited<ReturnType<typeof classesControllerAddMember>>>
    export type ClassesControllerAddMemberMutationBody = BodyType<ClassesControllerAddMemberBody>
    export type ClassesControllerAddMemberMutationError = ErrorType<null>

    /**
 * @summary 添加班级成员
 */
export const useClassesControllerAddMember = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerAddMember>>, TError,{id: string;data: BodyType<ClassesControllerAddMemberBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classesControllerAddMember>>,
        TError,
        {id: string;data: BodyType<ClassesControllerAddMemberBody>},
        TContext
      > => {

      const mutationOptions = getClassesControllerAddMemberMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary 获取班级成员列表
 */
export const classesControllerGetMembers = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/classes/${id}/members`, method: 'GET', signal
    },
      options);
    }
  

export const getClassesControllerGetMembersQueryKey = (id?: string,) => {
    return [`/classes/${id}/members`] as const;
    }

    
export const getClassesControllerGetMembersQueryOptions = <TData = Awaited<ReturnType<typeof classesControllerGetMembers>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerGetMembers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassesControllerGetMembersQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof classesControllerGetMembers>>> = ({ signal }) => classesControllerGetMembers(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classesControllerGetMembers>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassesControllerGetMembersQueryResult = NonNullable<Awaited<ReturnType<typeof classesControllerGetMembers>>>
export type ClassesControllerGetMembersQueryError = ErrorType<unknown>


export function useClassesControllerGetMembers<TData = Awaited<ReturnType<typeof classesControllerGetMembers>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerGetMembers>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerGetMembers>>,
          TError,
          Awaited<ReturnType<typeof classesControllerGetMembers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerGetMembers<TData = Awaited<ReturnType<typeof classesControllerGetMembers>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerGetMembers>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerGetMembers>>,
          TError,
          Awaited<ReturnType<typeof classesControllerGetMembers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerGetMembers<TData = Awaited<ReturnType<typeof classesControllerGetMembers>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerGetMembers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary 获取班级成员列表
 */

export function useClassesControllerGetMembers<TData = Awaited<ReturnType<typeof classesControllerGetMembers>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerGetMembers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassesControllerGetMembersQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 移除班级成员
 */
export const classesControllerRemoveMember = (
    id: string,
    userId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/classes/${id}/members/${userId}`, method: 'DELETE'
    },
      options);
    }
  


export const getClassesControllerRemoveMemberMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemoveMember>>, TError,{id: string;userId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemoveMember>>, TError,{id: string;userId: string}, TContext> => {

const mutationKey = ['classesControllerRemoveMember'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classesControllerRemoveMember>>, {id: string;userId: string}> = (props) => {
          const {id,userId} = props ?? {};

          return  classesControllerRemoveMember(id,userId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ClassesControllerRemoveMemberMutationResult = NonNullable<Awaited<ReturnType<typeof classesControllerRemoveMember>>>
    
    export type ClassesControllerRemoveMemberMutationError = ErrorType<null>

    /**
 * @summary 移除班级成员
 */
export const useClassesControllerRemoveMember = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemoveMember>>, TError,{id: string;userId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classesControllerRemoveMember>>,
        TError,
        {id: string;userId: string},
        TContext
      > => {

      const mutationOptions = getClassesControllerRemoveMemberMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    