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
  UsersControllerCreateBody,
  UsersControllerUpdateBody
} from '../../models';

import { customInstance } from '../../utils/orval-mutator';
import type { ErrorType , BodyType } from '../../utils/orval-mutator';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Create a new user
 */
export const usersControllerCreate = (
    usersControllerCreateBody: BodyType<UsersControllerCreateBody>,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/users`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: usersControllerCreateBody, signal
    },
      options);
    }
  


export const getUsersControllerCreateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: BodyType<UsersControllerCreateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: BodyType<UsersControllerCreateBody>}, TContext> => {

const mutationKey = ['usersControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerCreate>>, {data: BodyType<UsersControllerCreateBody>}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerCreate>>>
    export type UsersControllerCreateMutationBody = BodyType<UsersControllerCreateBody>
    export type UsersControllerCreateMutationError = ErrorType<null>

    /**
 * @summary Create a new user
 */
export const useUsersControllerCreate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: BodyType<UsersControllerCreateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerCreate>>,
        TError,
        {data: BodyType<UsersControllerCreateBody>},
        TContext
      > => {

      const mutationOptions = getUsersControllerCreateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary Get all users
 */
export const usersControllerFindAll = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/users`, method: 'GET', signal
    },
      options);
    }
  

export const getUsersControllerFindAllQueryKey = () => {
    return [`/users`] as const;
    }

    
export const getUsersControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerFindAllQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerFindAll>>> = ({ signal }) => usersControllerFindAll(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerFindAll>>>
export type UsersControllerFindAllQueryError = ErrorType<unknown>


export function useUsersControllerFindAll<TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof usersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerFindAll<TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof usersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerFindAll<TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get all users
 */

export function useUsersControllerFindAll<TData = Awaited<ReturnType<typeof usersControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Get a user by ID
 */
export const usersControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<null>(
      {url: `/users/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getUsersControllerFindOneQueryKey = (id?: string,) => {
    return [`/users/${id}`] as const;
    }

    
export const getUsersControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerFindOne>>, TError = ErrorType<null>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerFindOne>>> = ({ signal }) => usersControllerFindOne(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerFindOne>>>
export type UsersControllerFindOneQueryError = ErrorType<null>


export function useUsersControllerFindOne<TData = Awaited<ReturnType<typeof usersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof usersControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerFindOne<TData = Awaited<ReturnType<typeof usersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof usersControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerFindOne<TData = Awaited<ReturnType<typeof usersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get a user by ID
 */

export function useUsersControllerFindOne<TData = Awaited<ReturnType<typeof usersControllerFindOne>>, TError = ErrorType<null>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Update a user
 */
export const usersControllerUpdate = (
    id: string,
    usersControllerUpdateBody: BodyType<UsersControllerUpdateBody>,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/users/${id}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: usersControllerUpdateBody
    },
      options);
    }
  


export const getUsersControllerUpdateMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerUpdate>>, TError,{id: string;data: BodyType<UsersControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerUpdate>>, TError,{id: string;data: BodyType<UsersControllerUpdateBody>}, TContext> => {

const mutationKey = ['usersControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerUpdate>>, {id: string;data: BodyType<UsersControllerUpdateBody>}> = (props) => {
          const {id,data} = props ?? {};

          return  usersControllerUpdate(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerUpdate>>>
    export type UsersControllerUpdateMutationBody = BodyType<UsersControllerUpdateBody>
    export type UsersControllerUpdateMutationError = ErrorType<null>

    /**
 * @summary Update a user
 */
export const useUsersControllerUpdate = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerUpdate>>, TError,{id: string;data: BodyType<UsersControllerUpdateBody>}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerUpdate>>,
        TError,
        {id: string;data: BodyType<UsersControllerUpdateBody>},
        TContext
      > => {

      const mutationOptions = getUsersControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    /**
 * @summary Delete a user
 */
export const usersControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<null>(
      {url: `/users/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getUsersControllerRemoveMutationOptions = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['usersControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  usersControllerRemove(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerRemove>>>
    
    export type UsersControllerRemoveMutationError = ErrorType<null>

    /**
 * @summary Delete a user
 */
export const useUsersControllerRemove = <TError = ErrorType<null>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getUsersControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions , queryClient);
    }
    