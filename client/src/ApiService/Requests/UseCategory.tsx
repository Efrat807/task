import { AxiosRequestConfig } from 'axios';
import { ICategory } from '../Interfaces/ICategory';
import { CATEGORY_QUERY_KEY } from './QueryKeys';
import apiClient from '../http-common';
import {
	QueryOptions,
	useMutation,
	UseMutationOptions,
	useQuery,
} from 'react-query';
import { queryClient } from '../../Utils/ReactQueryConfig';
import {
	updateRQCacheAfterCreate,
	updateRQCacheAfterUpdate,
} from './generalUpdateCache';

export const useCategory = () => {
	const { mutate: UpdateCategory, ...updateMutateInfo } = useMutation<
		ICategory,
		unknown,
		IMutation<ICategory>
	>({});
	const { mutate: CreateCategory, ...createMutateInfo } = useMutation<
		ICategory,
		unknown,
		IMutation<ICategory>
	>({});

	const { mutate: DeleteCategory, ...deleteMutateInfo } = useMutation<
		ICategory,
		unknown,
		IMutation<ICategory>
	>({});

	const createCategory = (
		data: ICategory,
		options?: UseMutationOptions<ICategory, unknown, IMutation<ICategory>>
	) => {
		CreateCategory(
			{ method: 'Post', path: CATEGORY_QUERY_KEY, headers: {}, data },
			{
				onSuccess: (createdCategory: ICategory) => {
					updateRQCacheAfterCreate(
						createdCategory,
						queryClient,
						CATEGORY_QUERY_KEY
					);
				},
				...options,
			}
		);
	};

	const updateCategory = (
		data: ICategory,
		options?: UseMutationOptions<ICategory, unknown, IMutation<ICategory>>
	) => {
		UpdateCategory(
			{
				method: 'Put',
				path: `${CATEGORY_QUERY_KEY}?id=${data.id}`,
				headers: {},
				data,
			},
			{
				onSuccess: (updatedCategory) => {
					updateRQCacheAfterUpdate(
						updatedCategory,
						queryClient,
						`${CATEGORY_QUERY_KEY}`
					);
				},
				...options,
			}
		);
	};

	const deleteCategory = (
		id: string,
		options?: UseMutationOptions<unknown, unknown, IMutation<Partial<ICategory>>>
	) => {
		DeleteCategory(
			{
				method: 'Delete',
				path: `${CATEGORY_QUERY_KEY}?id=${id}`,
				headers: {},
				data: {
					id: 0,
					name: '',
					
				},
			},
			{
				onSuccess: () => {
					console.log(`Category in id: ${id} was deleted`);

					queryClient.invalidateQueries({ queryKey: [CATEGORY_QUERY_KEY] });
				},
				...options,
			}
		);
	};
	return {
		updateCategory,
		updateMutateInfo,
		createCategory,
		createMutateInfo,
		deleteCategory,
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
export const useGetAllCategories = (options?: QueryOptions<ICategory[]>) => {
	const { data: Categories, ...queryInfo } = useQuery<ICategory[]>({
		queryKey: [CATEGORY_QUERY_KEY],
		queryFn: async ({ queryKey: [CATEGORY_QUERY_KEY] }) => {
			const { data } = await apiClient.get<ICategory[]>(`${CATEGORY_QUERY_KEY}`);
			return data;
		},
		...options,
	});
	return { Categories, ...queryInfo };
};
