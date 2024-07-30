import { AxiosRequestConfig } from 'axios';
import { IProduct } from '../Interfaces/IProduct';
import { PRODUCT_QUERY_KEY } from './QueryKeys';
import apiClient from '../http-common';
import {
	QueryOptions,
	useMutation,
	UseMutationOptions,
	useQuery,
} from 'react-query';
import { queryClient } from '../../Utils/ReactQueryConfig';
import { updateRQCacheAfterCreate, updateRQCacheAfterUpdate } from './generalUpdateCache';

export const useProduct = () => {
	const { mutate: UpdateProduct, ...updateMutateInfo } = useMutation<
		IProduct,
		unknown,
		IMutation<IProduct>
	>({});
	const { mutate: CreateProduct, ...createMutateInfo } = useMutation<
		IProduct,
		unknown,
		IMutation<IProduct>
	>({});

	const { mutate: DeleteProduct, ...deleteMutateInfo } = useMutation<
		IProduct,
		unknown,
		IMutation<IProduct>
	>({});

	const createProduct = (
		data: IProduct,
		options?: UseMutationOptions<IProduct, unknown, IMutation<IProduct>>
	) => {
		CreateProduct(
			{ method: 'Post', path: PRODUCT_QUERY_KEY, headers: {}, data },
			{
				onSuccess: (createdProduct: IProduct) => {
					updateRQCacheAfterCreate(
						createdProduct,
						queryClient,
						PRODUCT_QUERY_KEY
					);
				},
				...options,
			}
		);
	};

	const updateProduct = (
		data: IProduct,
		options?: UseMutationOptions<IProduct, unknown, IMutation<IProduct>>
	) => {
		UpdateProduct(
			{
				method: 'Put',
				path: `${PRODUCT_QUERY_KEY}?id=${data.id}`,
				headers: {},
				data,
			},
			{
				onSuccess: (updatedProduct) => {
					updateRQCacheAfterUpdate(
						updatedProduct,
						queryClient,
						`${PRODUCT_QUERY_KEY}`
					);
				},
				...options,
			}
		);
	};

	const deleteProduct = (
		id: string,
		options?: UseMutationOptions<unknown, unknown, IMutation<Partial<IProduct>>>
	) => {
		DeleteProduct(
			{
				method: 'Delete',
				path: `${PRODUCT_QUERY_KEY}?id=${id}`,
				headers: {},
				data: {
                    id: 0,
                    name: '',
                    description: '',
                    price: 0,
                    image: '',
                    categoryId: 0
                },
			},
			{
				onSuccess: () => {
					console.log(`Product in id: ${id} was deleted`);

					queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEY] });
				},
				...options,
			}
		);
	};
	return {
		updateProduct,
		updateMutateInfo,
		createProduct,
		createMutateInfo,
		deleteProduct,
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
export const useGetAllProducts = (options?: QueryOptions<IProduct[]>) => {
	const { data: products, ...queryInfo } = useQuery<IProduct[]>({
		queryKey: [PRODUCT_QUERY_KEY],
		queryFn: async ({ queryKey: [PRODUCT_QUERY_KEY] }) => {
			const { data } = await apiClient.get<IProduct[]>(`${PRODUCT_QUERY_KEY}`);
			return data;
		},
		...options,
	});
	return { products, ...queryInfo };
};
