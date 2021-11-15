import styles from '../styles/QuantityForm.module.css';
import { useCart } from '../hooks/useCart';

const QuantityForm = ({ id, quantity }) => {
    const { updateItem } = useCart();

    const handleSubmit = e => {
        e.preventDefault();

        const { currentTarget } = e;
        const inputs = Array.from(currentTarget.elements);
        const quantity = inputs.find(input => input.name === 'quantity')?.value;

        if (quantity) {
            updateItem({ id, quantity: parseInt(quantity) });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.quantityForm}>
            <input
                type="number"
                name="quantity"
                min={0}
                defaultValue={quantity}
            />
            <button>Update</button>
        </form>
    );
};

export default QuantityForm;
