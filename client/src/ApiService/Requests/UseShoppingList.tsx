import { AxiosRequestConfig } from 'axios';
import { IShoppingList } from '../Interfaces/IShoppingList';
import { SHOPPING_LIST_QUERY_KEY } from './QueryKeys';
import apiClient from '../http-common';
import {
	QueryOptions,
	useMutation,
	UseMutationOptions,
	useQuery,
} from 'react-query';
import { queryClient } from '../../Utils/ReactQueryConfig';
import { updateRQCacheAfterCreate, updateRQCacheAfterUpdate } from './generalUpdateCache';

 export const useShoppingList = () => {
	const { mutate: UpdateShoppingList, ...updateMutateInfo } = useMutation<
		IShoppingList,
		unknown,
		IMutation<IShoppingList>
	>({});
	const { mutate: CreateShoppingList, ...createMutateInfo } = useMutation<
		IShoppingList,
		unknown,
		IMutation<IShoppingList>
	>({});

	const { mutate: DeleteShoppingList, ...deleteMutateInfo } = useMutation<
		IShoppingList,
		unknown,
		IMutation<IShoppingList>
	>({});

	const createShoppingList = (
		data: IShoppingList,
		options?: UseMutationOptions<IShoppingList, unknown, IMutation<IShoppingList>>
	) => {
		CreateShoppingList(
			{ method: 'Post', path: SHOPPING_LIST_QUERY_KEY, headers: {}, data },
			{
				onSuccess: (createdShoppingList: IShoppingList) => {
					updateRQCacheAfterCreate(
						createdShoppingList,
						queryClient,
						SHOPPING_LIST_QUERY_KEY
					);
				},
				...options,
			}
		);
	};

	const updateShoppingList = (
		data: IShoppingList,
		options?: UseMutationOptions<IShoppingList, unknown, IMutation<IShoppingList>>
	) => {
		UpdateShoppingList(
			{
				method: 'Put',
				path: `${SHOPPING_LIST_QUERY_KEY}?id=${data.id}`,
				headers: {},
				data,
			},
			{
				onSuccess: (updatedShoppingList) => {
					updateRQCacheAfterUpdate(
						updatedShoppingList,
						queryClient,
						`${SHOPPING_LIST_QUERY_KEY}`
					);
				},
				...options,
			}
		);
	};

	const deleteShoppingList = (
		id: string,
		options?: UseMutationOptions<unknown, unknown, IMutation<Partial<IShoppingList>>>
	) => {
		DeleteShoppingList(
			{
				method: 'Delete',
				path: `${SHOPPING_LIST_QUERY_KEY}?id=${id}`,
				headers: {},
				data: {
                    id: 0,
                    products:[]
                },
			},
			{
				onSuccess: () => {
					console.log(`ShoppingList in id: ${id} was deleted`);

					queryClient.invalidateQueries({ queryKey: [SHOPPING_LIST_QUERY_KEY] });
				},
				...options,
			}
		);
	};
	return {
		updateShoppingList,
		updateMutateInfo,
		createShoppingList,
		createMutateInfo,
		deleteShoppingList,
		deleteMutateInfo,
	};
};
export type FetchMethod = 'Post' | 'Patch' | 'Put' | 'Delete';

interface IMutation<TData> {
	path: string;
	method: FetchMethod;
	data: TData;
	headers?: AxiosRequestConfig['headers'];
}
export const useGetAllShoppingLists = (options?: QueryOptions<IShoppingList[]>) => {
	const { data: products, ...queryInfo } = useQuery<IShoppingList[]>({
		queryKey: [SHOPPING_LIST_QUERY_KEY],
		queryFn: async ({ queryKey: [SHOPPING_LIST_QUERY_KEY] }) => {
			const { data } = await apiClient.get<IShoppingList[]>(`${SHOPPING_LIST_QUERY_KEY}`);
			return data;
		},
		...options,
	});
	return { products, ...queryInfo };
};
