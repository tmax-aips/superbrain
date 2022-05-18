import { useLocation } from 'react-router-dom';
import qs from 'qs';

//url query 파싱
export const UseLocationQuery = () => {
	const { search } = useLocation();
	return qs.parse(search.split('?')[1]);
};
