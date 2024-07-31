import { categoryCardType } from "../../common/types"
import classes from './CategoryCard.module.scss'

const CategoryCard = ({categoryName, products}:categoryCardType) => {
    
    return <div className={classes.card}>
        <h3>{categoryName}</h3>
        {products.map((p)=>(
            <p>
                {p.name} {p.amount>1 && (
                    <>
                    <span>{'('}</span><span>{p.amount}</span><span>{')'}</span>
                    </> 
                )}
            </p>))}
    </div>
}
export default CategoryCard;