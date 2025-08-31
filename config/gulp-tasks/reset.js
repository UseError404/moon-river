import { deleteAsync as del } from 'del'; // Алиас для совместимости
export const reset = () => {
	return del(app.path.clean);
}