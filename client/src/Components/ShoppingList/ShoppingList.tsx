import { Button, Input, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import classes from './ShoppingList.module.scss';
import { useGetAllCategories } from '../../ApiService/Requests/UseCategory';
import { Form, Formik } from 'formik';
import { IShoppingList } from '../../ApiService/Interfaces/IShoppingList';
import { IProduct } from '../../ApiService/Interfaces/IProduct';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { TotalItemsAtom } from '../../Atoms';
import { useShoppingList } from '../../ApiService/Requests/UseShoppingList';
import CategoryCard from '../CategoryCard/CategoryCard';

export const ShoppingList = () => {
	const [totalItems, setTotalItems] =useRecoilState(TotalItemsAtom);
	const [shoppingList, setShoppingList] = useState<IProduct[]>([]);
	
	const onSubmit = (values: IProduct)=>{
		console.log(values, 'values');
		setTotalItems(prev=>prev+1);

		setShoppingList(prev => {
			const index = prev.findIndex(p => p.name === values.name);
			return index !== -1
				? [...prev.slice(0, index), { ...prev[index], amount: prev[index].amount + 1 }, ...prev.slice(index + 1)]
				: [...prev, values];
		});		// setShoppingList((prev)=> [...prev || [], values]);
	}

	useEffect(()=>{
		console.log(shoppingList);
		
	},[shoppingList])

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
	
	// const addCategoriesCards = ()=> {
	// 	categories?.forEach((category)=>{
	// 		const filterList = shoppingList.find(sList=> category.id==sList.categoryId)
	// 		<CategoryCard categoryName= filterList./>
	// 	})
	// }

	return (
		<div className={classes.shoppingList}>
			<h1>רשימת קניות</h1>
			<div>סך הכל:{totalItems} מוצרים</div>
			<div className={classes.addProduct}>
				<Formik
				initialValues={initialShoppingList}
				onSubmit={onSubmit}
				>
				{(formik)=>(
					<Form>
					<Input name='name' placeholder="שם מוצר" onChange={(event: ChangeEvent<HTMLInputElement>) =>
									formik.setFieldValue('name', event.target.value)}/>
                {/* <Input name='amount' type='number' placeholder='כמות' onChange={(event: ChangeEvent<HTMLInputElement>) =>
									formik.setFieldValue('amount', event.target.value)} /> */}
				<Select name='categoryId' onChange={(event: SelectChangeEvent<string>) =>
									formik.setFieldValue('categoryId', event.target.value)}>
					{categories?.map((category, index) => (
						<MenuItem key={index} value={category.id}>
							{category.name}
						</MenuItem>
					))}
				</Select>
				<Button type='submit'>הוסף מוצר</Button>
				</Form>)}
				</Formik>
			</div>
			<hr />
			<div className={classes.shoppingListCards}>
				{Object.entries(groupedProducts).map(([category, products])=>(
				<CategoryCard categoryName={category} productsName={products} />
			))}
			</div>
			
			
			<Button onClick={()=>createShoppingList({products: shoppingList})}>סיים הזמנה</Button>
		</div>
	);
};
