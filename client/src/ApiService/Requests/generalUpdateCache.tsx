import { QueryClient } from "react-query";

function compareObjects(oldQueryData: unknown, newQueryData: unknown) {
	if (oldQueryData === newQueryData) {
		const errorMsg =
			'The object you supplies to the create/update/delete React Query cache are the same objects!\nYou probably changed a data object manually instead of updating react query cache';
		// eslint-disable-next-line no-console
		console.error(errorMsg);
		throw Error(errorMsg);
	}
}
export const updateRQCacheAfterUpdate = (
	UpdatedData: any,
	queryClient: QueryClient,
	queryKey: string | string[]
) => {
	queryClient.setQueryData([queryKey], (oldData: any) => {
		compareObjects(oldData, UpdatedData);

		return Array.isArray(oldData)
			? oldData?.map((data: any) =>
					data.id === UpdatedData.id ? UpdatedData : data
			  )
			: UpdatedData;
	});
};

export const updateRQCacheAfterCreate = <T,>(
	createdData: T,
	queryClient: QueryClient,
	queryKey: string
) => {
	queryClient.setQueryData<T[] | T>([queryKey], (oldData) => {
		compareObjects(oldData, createdData);
		if (!Array.isArray(oldData)) return createdData;
		if (Array.isArray(oldData)) return [...oldData, createdData];

		return [];
	});
};
