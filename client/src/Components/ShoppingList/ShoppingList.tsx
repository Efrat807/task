import { Button, Input, MenuItem, Select } from '@mui/material';
import classes from './ShoppingList.module.scss';
import { useGetAllCategories } from '../../ApiService/Requests/UseCategory';

export const ShoppingList = () => {
	// const categories = [
	// 	'ירקות ופירות',
	// 	'מוצרי נקיון',
	// 	'מאפים',
	// 	'בשר ודגים',
	// 	'גבינות',
	// ];
	const categories = useGetAllCategories().Categories;
	return (
		<div className={classes.shoppingList}>
			<h1>רשימת קניות</h1>
			<div className={classes.addProduct}>
				<Input placeholder="הוסף מוצר" />
                <Input type='number' placeholder='כמות' />
				<Select>
					{categories?.map((category, index) => (
						<MenuItem key={index} value={index}>
							{category.name}
						</MenuItem>
					))}
				</Select>
				<Button>הוסף מוצר</Button>
			</div>
			<hr />
		</div>
	);
};
