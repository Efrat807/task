import { Button, FormControl, Input, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import classes from './ShoppingList.module.scss';
import { useGetAllCategories } from '../../ApiService/Requests/UseCategory';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { IProduct } from '../../ApiService/Interfaces/IProduct';
import { ChangeEvent, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { TotalItemsAtom } from '../../Atoms';
import { useShoppingList } from '../../ApiService/Requests/UseShoppingList';
import CategoryCard from '../CategoryCard/CategoryCard';
import { ToastSuccess } from '../Toastify/Toasts';

export const ShoppingList = () => {
	const [totalItems, setTotalItems] =useRecoilState(TotalItemsAtom);
	const [shoppingList, setShoppingList] = useState<IProduct[]>([]);
	
	const onSubmit = (values: IProduct, formik: FormikHelpers<IProduct>)=>{
		setTotalItems(prev=>prev+1);

		setShoppingList(prev => {
			const index = prev.findIndex(p => p.name === values.name);
			return index !== -1
				? [...prev.slice(0, index), { ...prev[index], amount: prev[index].amount + 1 }, ...prev.slice(index + 1)]
				: [...prev, values];
		});
		// formik.setValues(initialShoppingList);
		// formik.setFieldValue(initialShoppingList);
		// formik.resetForm();
	}

	const initialShoppingList: IProduct = {
		name: '', amount: 1, categoryId: 1

	}
	const {createShoppingList}=useShoppingList();
	
	const categories = useGetAllCategories().Categories;
	
	const groupedProducts = useMemo(() => {
        return shoppingList.reduce((acc, product) => {
            const category = categories?.find(c => c.id === product.categoryId)?.name || 'Uncategorized';
            (acc[category] = acc[category] || []).push(product);
            return acc;
        }, {} as Record<string, IProduct[]>);
    }, [shoppingList, categories]);

	const endOrder =()=>{
		createShoppingList({products: shoppingList}, { onSuccess: ()=>{
			setTotalItems(0); 
			setShoppingList([]);
			ToastSuccess('ההזמנה בוצעה בהצלחה')
		}})
	}
	
	// const addCategoriesCards = ()=> {
	// 	categories?.forEach((category)=>{
	// 		const filterList = shoppingList.find(sList=> category.id==sList.categoryId)
	// 		<CategoryCard categoryName= filterList./>
	// 	})
	// }

	return (
		<div className={classes.shoppingList}>
			<h1 className={classes.title}>רשימת קניות</h1>
			<div className={classes.totalItems}>סך הכל:{totalItems} מוצרים</div>
			<div className={classes.addProduct}>
				<Formik
				initialValues={initialShoppingList}
				onSubmit={onSubmit}
				>
				{(formik)=>(
					<Form style={{display: 'flex', justifyContent: 'space-around'}}>
					<Input required
						name='name'
						placeholder="שם מוצר" 
						style={{marginLeft: '30px'}}
						onChange={(event: ChangeEvent<HTMLInputElement>) =>
									formik.setFieldValue('name', event.target.value)}/>
					<FormControl variant='standard'style={{marginLeft: '20px', width: '130px'}}>
						<div>קטגוריה</div>
						<Select required name='categoryId' onChange={(event: SelectChangeEvent<string>) =>
									formik.setFieldValue('categoryId', event.target.value)}>
					{categories?.map((category, index) => (
						<MenuItem key={index} value={category.id}>
							{category.name}
						</MenuItem>
					))}
				</Select>
				</FormControl>
				<Button type='submit' style={{border: '1px solid black'}}>הוסף מוצר</Button>
				</Form>)}
				</Formik>
			</div>
			<hr />
			<div className={classes.shoppingListCards}>
				{Object.entries(groupedProducts).map(([category, products], index)=>(
				<CategoryCard key={index} categoryName={category} products={products} />
			))}
			</div>
			
			<footer className={classes.footer}>

			<Button onClick={endOrder}>סיים הזמנה</Button>
			</footer>
		</div>
	);
};
